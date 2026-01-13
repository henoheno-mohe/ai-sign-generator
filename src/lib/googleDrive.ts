// Google Drive API連携ライブラリ
import { config } from './config';

export interface PhotoFolder {
  id: string;
  name: string;
  date: Date;
}

export interface Photo {
  id: string;
  name: string;
  thumbnailLink?: string;
  webContentLink?: string;
  mimeType: string;
  createdTime: string;
  folderId: string;
}

class GoogleDriveService {
  private gapi: any = null;
  private accessToken: string | null = null;

  /**
   * Google API クライアントライブラリをロード
   */
  async loadGapi(): Promise<void> {
    if (typeof window === 'undefined') return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        (window as any).gapi.load('client:auth2', async () => {
          try {
            await (window as any).gapi.client.init({
              apiKey: config.googleDrive.apiKey,
              clientId: config.googleDrive.clientId,
              discoveryDocs: config.googleDrive.discoveryDocs,
              scope: config.googleDrive.scopes,
            });
            this.gapi = (window as any).gapi;
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  /**
   * Google アカウントでサインイン
   */
  async signIn(): Promise<void> {
    if (!this.gapi) {
      await this.loadGapi();
    }
    const auth = this.gapi.auth2.getAuthInstance();
    const user = await auth.signIn();
    this.accessToken = user.getAuthResponse().access_token;
  }

  /**
   * サインアウト
   */
  async signOut(): Promise<void> {
    if (!this.gapi) return;
    const auth = this.gapi.auth2.getAuthInstance();
    await auth.signOut();
    this.accessToken = null;
  }

  /**
   * サインイン状態を確認
   */
  isSignedIn(): boolean {
    if (!this.gapi) return false;
    const auth = this.gapi.auth2.getAuthInstance();
    return auth.isSignedIn.get();
  }

  /**
   * 指定フォルダ内の日付フォルダ一覧を取得
   * @param parentFolderId 親フォルダID（省略時はルート）
   */
  async getDateFolders(parentFolderId?: string): Promise<PhotoFolder[]> {
    if (!this.gapi) {
      throw new Error('Google API not loaded');
    }

    const query = parentFolderId
      ? `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`
      : `mimeType='application/vnd.google-apps.folder' and trashed=false`;

    const response = await this.gapi.client.drive.files.list({
      q: query,
      fields: 'files(id, name, createdTime)',
      orderBy: 'name desc',
      pageSize: 1000,
    });

    const folders: PhotoFolder[] = [];
    
    for (const file of response.result.files || []) {
      // 日付フォルダのパターンをチェック（例: 2024-01-15, 20240115など）
      const dateMatch = file.name.match(/(\d{4})[-_]?(\d{2})[-_]?(\d{2})/);
      if (dateMatch) {
        folders.push({
          id: file.id,
          name: file.name,
          date: new Date(`${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`),
        });
      }
    }

    return folders.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  /**
   * 指定フォルダ内の写真一覧を取得
   * @param folderId フォルダID
   */
  async getPhotosInFolder(folderId: string): Promise<Photo[]> {
    if (!this.gapi) {
      throw new Error('Google API not loaded');
    }

    const query = `'${folderId}' in parents and (mimeType contains 'image/') and trashed=false`;

    const response = await this.gapi.client.drive.files.list({
      q: query,
      fields: 'files(id, name, thumbnailLink, webContentLink, mimeType, createdTime)',
      orderBy: 'createdTime',
      pageSize: 1000,
    });

    return (response.result.files || []).map((file: any) => ({
      id: file.id,
      name: file.name,
      thumbnailLink: file.thumbnailLink,
      webContentLink: file.webContentLink,
      mimeType: file.mimeType,
      createdTime: file.createdTime,
      folderId: folderId,
    }));
  }

  /**
   * すべての日付フォルダから写真を取得
   * @param parentFolderId PhotoFrameフォルダのID
   */
  async getAllPhotos(parentFolderId?: string): Promise<Photo[]> {
    const folders = await this.getDateFolders(parentFolderId);
    const allPhotos: Photo[] = [];

    for (const folder of folders) {
      const photos = await this.getPhotosInFolder(folder.id);
      allPhotos.push(...photos);
    }

    return allPhotos;
  }

  /**
   * 写真のダウンロードURLを取得
   * @param photoId 写真のID
   */
  getPhotoUrl(photoId: string): string {
    if (!this.accessToken) {
      throw new Error('Not signed in');
    }
    return `https://www.googleapis.com/drive/v3/files/${photoId}?alt=media&access_token=${this.accessToken}`;
  }

  /**
   * フォルダを検索（名前で）
   * @param folderName フォルダ名
   */
  async findFolderByName(folderName: string): Promise<string | null> {
    if (!this.gapi) {
      throw new Error('Google API not loaded');
    }

    const query = `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;

    const response = await this.gapi.client.drive.files.list({
      q: query,
      fields: 'files(id, name)',
      pageSize: 1,
    });

    const files = response.result.files || [];
    return files.length > 0 ? files[0].id : null;
  }
}

export const googleDriveService = new GoogleDriveService();

