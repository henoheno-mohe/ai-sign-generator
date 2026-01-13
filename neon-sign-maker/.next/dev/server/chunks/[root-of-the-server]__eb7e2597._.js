module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/neon-sign-maker/src/lib/neonProtocol.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NEON_PROTOCOL_V1",
    ()=>NEON_PROTOCOL_V1,
    "buildNeonPrompt",
    ()=>buildNeonPrompt
]);
const NEON_PROTOCOL_V1 = {
    productName: "屋内ネオンサイン（アクリルパネル挟み込み）",
    tubeDiameters: [
        5,
        7,
        9
    ],
    defaultTubeDiameter: 7,
    maxColors: 3,
    paletteSize: 14
};
function buildNeonPrompt({ userText, colors, background, widthMm, tubeDiameter }) {
    const text = userText.trim();
    const colorList = colors.slice(0, 5).map((c, i)=>`- Color ${i + 1}: ${c.name} (${c.hex})`).join("\n");
    const targetWidth = Math.max(200, Math.min(2000, Math.round(widthMm)));
    // 画像生成モデル向けに、英語で「商品写真っぽさ」を強く指示（日本語だけより安定しやすい）
    return `CRITICAL TASK:
Generate a photorealistic product photo of an indoor neon sign installation (NOT a mockup illustration).

SCENE (DEFAULT):
- Night-time indoor scene.
- Warm ambient lighting (approx 2700K–3000K). Cozy warm tone.
- The neon sign should be the main highlight light source, with soft warm room fill.

PRODUCT MUST MATCH:
- LED neon flex / neon tube sign, single-stroke look, uniform tube thickness.
- Tube diameter / glow width: approximately φ${tubeDiameter}mm.
- Mounted using clear acrylic panels (front + back acrylic sandwich).
- Visible standoff hardware: 4 round standoff caps / screws at the corners.
- The acrylic panel is slightly offset from the wall, with subtle realistic shadows.
- Real-world scale: the overall sign width should be approximately ${targetWidth}mm.
- Height should be auto-determined by the design (logo/text) while keeping natural proportions.
- Acrylic panel size should fit the design with reasonable margins (do not crop the design).

LIGHTING:
- Realistic neon glow + soft halo on the wall.
- NO excessive lens flare, NO fake bokeh, keep it like a clean product photo.
- Keep colors accurate and vivid, but not oversaturated.
- Keep the wall and room lighting warm (night warm ambience), matching the scene requirements.
- The neon tube MUST look emissive: bright luminous core + diffused outer glow.
- IMPORTANT: Do NOT look like printed/painted lines on acrylic. It must be a real glowing tube.

COLOR RULES (use ONLY these 3 colors; distribution is up to you):
COLOR RULES (use ONLY these colors; do not introduce any additional colors):
${colorList}

BACKGROUND:
- Use this wall style: ${background.name} (${background.description})
- Warm indoor wall lighting, realistic texture, subtle noise/grain like a real camera photo.

DO NOT:
- Do not change the content/shape provided by the input (no redesign).
- Do not turn it into channel letters or box letters.
- Do not add extra objects (bulbs, random decorations, unrelated logos).

OUTPUT:
- One realistic installed neon sign photo on the wall.
${text ? `\nTEXT (optional input, keep exact):\n${text}\n` : ""}`.trim();
}
}),
"[project]/neon-sign-maker/src/lib/backgrounds.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BACKGROUND_TEMPLATES",
    ()=>BACKGROUND_TEMPLATES,
    "DEFAULT_BACKGROUND_ID",
    ()=>DEFAULT_BACKGROUND_ID,
    "getDefaultBackground",
    ()=>getDefaultBackground
]);
const BACKGROUND_TEMPLATES = [
    {
        id: "brick",
        name: "レンガ",
        description: "バー/ゲーム部屋っぽい",
        className: "bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),repeating-linear-gradient(0deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_2px,transparent_2px,transparent_24px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_2px,transparent_2px,transparent_48px)] bg-[#2a1b13]"
    },
    {
        id: "whitewall",
        name: "白壁",
        description: "部屋/ギフトに合わせやすい",
        className: "bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.04),transparent_45%),linear-gradient(180deg,#f7f7f7,#eaeaea)]"
    },
    {
        id: "concrete",
        name: "コンクリ",
        description: "クール/都会っぽい",
        className: "bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.10),transparent_55%),repeating-linear-gradient(45deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_2px,transparent_2px,transparent_18px)] bg-[#35393f]"
    }
];
const DEFAULT_BACKGROUND_ID = "whitewall";
function getDefaultBackground() {
    return BACKGROUND_TEMPLATES.find((t)=>t.id === DEFAULT_BACKGROUND_ID) ?? BACKGROUND_TEMPLATES[0];
}
}),
"[project]/neon-sign-maker/src/lib/nanoBananaCompat.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// neon-sign-maker: 既存プロジェクトと同じモデル/URLを流用
__turbopack_context__.s([
    "NANO_BANANA_IMAGE_API_URL",
    ()=>NANO_BANANA_IMAGE_API_URL
]);
const NANO_BANANA_IMAGE_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent";
}),
"[project]/neon-sign-maker/src/lib/geminiImage.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateImageWithGemini",
    ()=>generateImageWithGemini
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$nanoBananaCompat$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/lib/nanoBananaCompat.ts [app-route] (ecmascript)");
;
function cleanApiKey(apiKey) {
    return apiKey.replace(/["'`]/g, "").replace(/[^\x00-\x7F]/g, "").trim();
}
async function generateImageWithGemini({ apiKey, prompt, inputImageBase64, inputMimeType = "image/png" }) {
    const cleanKey = cleanApiKey(apiKey);
    const parts = [];
    if (inputImageBase64) {
        parts.push({
            inline_data: {
                mime_type: inputMimeType,
                data: inputImageBase64
            }
        });
    }
    parts.push({
        text: prompt
    });
    const requestBody = {
        contents: [
            {
                parts
            }
        ],
        generationConfig: {
            temperature: 0.2,
            topK: 32,
            topP: 1,
            maxOutputTokens: 4096
        }
    };
    const resp = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$nanoBananaCompat$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NANO_BANANA_IMAGE_API_URL"], {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": cleanKey
        },
        body: JSON.stringify(requestBody)
    });
    if (!resp.ok) {
        const errorText = await resp.text().catch(()=>"");
        throw new Error(`Gemini API Error: ${resp.status} ${resp.statusText} ${errorText}`);
    }
    const data = await resp.json();
    const candidate = data?.candidates?.[0];
    const partsOut = candidate?.content?.parts;
    let textOut = "";
    if (Array.isArray(partsOut)) {
        for (const p of partsOut){
            if (p?.text) textOut += String(p.text);
        }
    }
    if (Array.isArray(partsOut)) {
        for (const p of partsOut){
            const inline = p?.inline_data || p?.inlineData;
            if (inline?.data) {
                const mime = inline?.mime_type || inline?.mimeType || "image/png";
                return {
                    imageDataUrl: `data:${mime};base64,${inline.data}`,
                    text: textOut || undefined
                };
            }
        }
    }
    throw new Error("Gemini API did not return image data.");
}
}),
"[project]/neon-sign-maker/src/app/api/neon/generate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$neonProtocol$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/lib/neonProtocol.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$backgrounds$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/lib/backgrounds.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$geminiImage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/lib/geminiImage.ts [app-route] (ecmascript)");
;
;
;
;
;
function getApiKey() {
    // 既存のキー名を流用（将来はサーバー用キーに分離推奨）
    return process.env.NANO_BANANA_API_KEY || process.env.NEXT_PUBLIC_NANO_BANANA_API_KEY || "";
}
function dataUrlToBase64(dataUrl) {
    const match = dataUrl.match(/^data:(.+);base64,(.*)$/);
    if (!match) return null;
    return {
        mimeType: match[1],
        base64: match[2]
    };
}
async function POST(req) {
    try {
        const body = await req.json();
        const apiKey = getApiKey();
        if (!apiKey) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "APIキーが設定されていません（環境変数 NANO_BANANA_API_KEY を設定してください）"
            }, {
                status: 400
            });
        }
        const sketchDataUrl = body?.sketchDataUrl ?? null;
        const text = body?.text ?? "";
        const colors = body?.colors;
        const widthMm = body?.widthMm ?? 600;
        const tubeDiameter = body?.tubeDiameter ?? __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$neonProtocol$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NEON_PROTOCOL_V1"].defaultTubeDiameter;
        if (!Array.isArray(colors) || colors.length < 1 || colors.length > 5) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "色数の指定が不正です（1〜5色）"
            }, {
                status: 400
            });
        }
        if (colors.some((c)=>!c?.hex || !c?.name)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "色の指定が不正です"
            }, {
                status: 400
            });
        }
        const background = (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$backgrounds$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultBackground"])(); // MVP: 背景は1つ
        const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$neonProtocol$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildNeonPrompt"])({
            userText: text,
            colors,
            background,
            widthMm,
            tubeDiameter
        });
        const parsed = sketchDataUrl ? dataUrlToBase64(sketchDataUrl) : null;
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$geminiImage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateImageWithGemini"])({
            apiKey,
            prompt,
            inputImageBase64: parsed?.base64 ?? null,
            inputMimeType: parsed?.mimeType ?? "image/png"
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            imageDataUrl: result.imageDataUrl,
            text: result.text
        });
    } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        return __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: msg
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__eb7e2597._.js.map