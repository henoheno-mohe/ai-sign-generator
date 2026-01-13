module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/neon-sign-maker/src/components/UploadAndText.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UploadAndText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function UploadAndText({ imageDataUrl, onImageChange, text, onTextChange }) {
    const fileInputRef = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const [dragActive, setDragActive] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    function handleFiles(file) {
        if (!file.type.startsWith("image/")) {
            alert("画像ファイルを選択してください。");
            return;
        }
        if (file.size > 8 * 1024 * 1024) {
            alert("ファイルサイズは8MB以下にしてください。");
            return;
        }
        const reader = new FileReader();
        reader.onload = (e)=>{
            const url = e.target?.result;
            onImageChange(url);
        };
        reader.readAsDataURL(file);
    }
    function onDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const f = e.dataTransfer.files?.[0];
        if (f) handleFiles(f);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-white/10 bg-white/5 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold",
                children: "入力"
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-zinc-300",
                children: "手書き（単線）でも、テキストでもOK。"
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-6 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold",
                                        children: "手書きアップロード"
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this),
                                    imageDataUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>onImageChange(null),
                                        className: "text-xs text-zinc-300 hover:text-white",
                                        children: "削除"
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            !imageDataUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: [
                                    "mt-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors cursor-pointer",
                                    dragActive ? "border-fuchsia-300 bg-fuchsia-300/5" : "border-white/15 hover:border-white/25"
                                ].join(" "),
                                onDragEnter: (e)=>{
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setDragActive(true);
                                },
                                onDragOver: (e)=>{
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setDragActive(true);
                                },
                                onDragLeave: (e)=>{
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setDragActive(false);
                                },
                                onDrop: onDrop,
                                onClick: ()=>fileInputRef.current?.click(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-zinc-200",
                                        children: "ドラッグ&ドロップ"
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-zinc-400",
                                        children: "またはクリックして画像を選択（JPG/PNG, 8MB以下）"
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-xs text-zinc-400",
                                        children: "コツ：白紙に黒ペンで描くとプレビューが見やすいです"
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 rounded-xl border border-white/10 bg-black/30 p-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: imageDataUrl,
                                    alt: "アップロード画像",
                                    className: "h-56 w-full rounded-lg object-contain bg-black/20"
                                }, void 0, false, {
                                    fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                accept: "image/*",
                                className: "hidden",
                                onChange: (e)=>{
                                    const f = e.target.files?.[0];
                                    if (f) handleFiles(f);
                                }
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold",
                                children: "テキスト（任意）"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-zinc-400",
                                children: "誤字防止のため、文字ネオンの場合は入力推奨。"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: text,
                                onChange: (e)=>onTextChange(e.target.value),
                                rows: 6,
                                placeholder: "例：NIGHT OWL / 推しの名前 / 好きな言葉 など",
                                className: "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/60"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
}),
"[project]/neon-sign-maker/src/components/ColorPicker24.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ColorPicker24
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// React import is intentionally placed at bottom to keep the component compact in diffs.
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function ColorPicker24({ palette, value, onChange }) {
    const [activeSlot, setActiveSlot] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("primary");
    function setSlotColor(slot, color) {
        onChange({
            ...value,
            [slot]: color
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-white/10 bg-white/5 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold",
                                children: "色（14色パレット / 最大3色）"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-zinc-300",
                                children: "主色1＋アクセント2（配分はAIに任せる想定）"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-zinc-400",
                        children: [
                            "選択中: ",
                            slotLabel(activeSlot)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid grid-cols-3 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SlotButton, {
                        label: "主色",
                        color: value.primary,
                        active: activeSlot === "primary",
                        onClick: ()=>setActiveSlot("primary")
                    }, void 0, false, {
                        fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SlotButton, {
                        label: "アクセント1",
                        color: value.accent1,
                        active: activeSlot === "accent1",
                        onClick: ()=>setActiveSlot("accent1")
                    }, void 0, false, {
                        fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SlotButton, {
                        label: "アクセント2",
                        color: value.accent2,
                        active: activeSlot === "accent2",
                        onClick: ()=>setActiveSlot("accent2")
                    }, void 0, false, {
                        fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid grid-cols-7 gap-2",
                children: palette.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setSlotColor(activeSlot, c),
                        className: "group relative h-9 w-9 rounded-lg border border-white/10 hover:border-white/25 transition-colors",
                        title: `${c.name} (${c.hex})`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute inset-0 rounded-lg",
                                style: {
                                    backgroundColor: c.hex,
                                    boxShadow: `0 0 0 1px rgba(0,0,0,0.25) inset, 0 0 18px ${c.hex}55`
                                }
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: c.name
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this)
                        ]
                    }, c.id, true, {
                        fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-xs text-zinc-400",
                children: "※現段階のプレビューはモックです（AI生成に差し替え予定）。"
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
function SlotButton({ label, color, active, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: [
            "rounded-xl border px-3 py-3 text-left transition-colors",
            active ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5 hover:border-white/20"
        ].join(" "),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-zinc-400",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-0.5 text-sm font-semibold",
                            children: color.name
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "h-7 w-7 rounded-lg border border-white/10",
                    style: {
                        backgroundColor: color.hex,
                        boxShadow: `0 0 14px ${color.hex}66`
                    }
                }, void 0, false, {
                    fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/neon-sign-maker/src/components/ColorPicker24.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
function slotLabel(slot) {
    if (slot === "primary") return "主色";
    if (slot === "accent1") return "アクセント1";
    return "アクセント2";
}
;
}),
"[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NeonPreviewGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function NeonPreviewGrid({ templates, text, sketchDataUrl, colors }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-white/10 bg-white/5 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end justify-between gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold",
                            children: "設置イメージ（背景3種）"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-zinc-300",
                            children: "同じデザインを3背景で比較。現段階はモック表示で、後からAI生成に差し替えます。"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-4 sm:grid-cols-3",
                children: templates.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: [
                                    "relative h-56",
                                    t.className
                                ].join(" "),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/30"
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                        lineNumber: 33,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 grid place-items-center px-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative w-full max-w-[260px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-2xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-[1.5px]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                                            lineNumber: 39,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 rounded-2xl border border-white/20"
                                                        }, void 0, false, {
                                                            fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                                            lineNumber: 40,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute -inset-[6px] rounded-[22px] bg-black/10 blur-[10px]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                                            lineNumber: 41,
                                                            columnNumber: 21
                                                        }, this),
                                                        [
                                                            {
                                                                x: "8px",
                                                                y: "8px"
                                                            },
                                                            {
                                                                x: "calc(100% - 16px)",
                                                                y: "8px"
                                                            },
                                                            {
                                                                x: "8px",
                                                                y: "calc(100% - 16px)"
                                                            },
                                                            {
                                                                x: "calc(100% - 16px)",
                                                                y: "calc(100% - 16px)"
                                                            }
                                                        ].map((p, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute h-3.5 w-3.5 rounded-full bg-zinc-900/70 ring-1 ring-white/20 shadow",
                                                                style: {
                                                                    left: p.x,
                                                                    top: p.y
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                                                    lineNumber: 54,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, idx, false, {
                                                                fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                                                lineNumber: 49,
                                                                columnNumber: 23
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                                    lineNumber: 38,
                                                    columnNumber: 19
                                                }, this),
                                                sketchDataUrl && // eslint-disable-next-line @next/next/no-img-element
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: sketchDataUrl,
                                                    alt: "スケッチ",
                                                    className: "pointer-events-none absolute left-1/2 top-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 opacity-45 mix-blend-screen",
                                                    style: {
                                                        filter: "invert(1) brightness(1.4) contrast(1.1) drop-shadow(0 0 10px " + colors.primary.hex + ") drop-shadow(0 0 18px " + colors.accent1.hex + ")"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 21
                                                }, this),
                                                text.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-block select-none whitespace-pre-wrap text-2xl font-extrabold tracking-wide",
                                                        style: {
                                                            backgroundImage: `linear-gradient(90deg, ${colors.primary.hex}, ${colors.accent1.hex}, ${colors.accent2.hex})`,
                                                            WebkitBackgroundClip: "text",
                                                            backgroundClip: "text",
                                                            color: "transparent",
                                                            textShadow: [
                                                                `0 0 6px ${colors.primary.hex}`,
                                                                `0 0 12px ${colors.primary.hex}AA`,
                                                                `0 0 18px ${colors.accent1.hex}88`,
                                                                `0 0 26px ${colors.accent2.hex}66`
                                                            ].join(", ")
                                                        },
                                                        children: text
                                                    }, void 0, false, {
                                                        fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                            lineNumber: 36,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.75)_100%)]"
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-white",
                                        children: t.name
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-zinc-300",
                                        children: t.description
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[11px] text-zinc-400",
                                        children: "透明アクリル＋四隅金具の仕上がり（モック）"
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/neon-sign-maker/src/components/InquiryForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InquiryForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function InquiryForm({ text, colors, templates, tubeDiameter }) {
    const [name, setName] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [email, setEmail] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [note, setNote] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [copied, setCopied] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const summary = buildInquirySummary({
        text,
        colors,
        templates,
        tubeDiameter,
        name,
        email,
        note
    });
    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(summary);
            setCopied(true);
            window.setTimeout(()=>setCopied(false), 1200);
        } catch  {
            alert("コピーに失敗しました。手動で選択してコピーしてください。");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-white/10 bg-white/5 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold",
                children: "お問い合わせ（送信は後で差し替え）"
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-zinc-300",
                children: "まずは問い合わせ獲得（A）がゴールなので、現段階は「問い合わせ内容をコピー」できる形にしています。"
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-4 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-semibold",
                                children: "お名前（任意）"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: name,
                                onChange: (e)=>setName(e.target.value),
                                placeholder: "例：山田 太郎",
                                className: "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/60"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-semibold",
                                children: "メール（任意）"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: email,
                                onChange: (e)=>setEmail(e.target.value),
                                placeholder: "example@gmail.com",
                                className: "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/60"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm font-semibold",
                        children: "備考（任意）"
                    }, void 0, false, {
                        fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: note,
                        onChange: (e)=>setNote(e.target.value),
                        rows: 3,
                        placeholder: "用途、希望サイズ、納期感など",
                        className: "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/60"
                    }, void 0, false, {
                        fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold",
                                children: "問い合わせテンプレ"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: copyToClipboard,
                                className: "rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors",
                                children: copied ? "コピーしました" : "内容をコピー"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "mt-2 max-h-56 overflow-auto rounded-xl border border-white/10 bg-black/40 p-3 text-xs text-zinc-200 whitespace-pre-wrap",
                        children: summary
                    }, void 0, false, {
                        fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/neon-sign-maker/src/components/InquiryForm.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
function buildInquirySummary({ text, colors, templates, tubeDiameter, name, email, note }) {
    const lines = [];
    lines.push("【neon-sign-maker 問い合わせ】");
    if (name.trim()) lines.push(`お名前: ${name.trim()}`);
    if (email.trim()) lines.push(`メール: ${email.trim()}`);
    lines.push("");
    lines.push("■ 依頼内容（MVP）");
    lines.push("- 屋内ネオンサイン（個人向け）");
    lines.push(`- 発光幅（チューブ）: φ${tubeDiameter}mm 相当（デフォルト）`);
    lines.push("- 構造: ネオンチューブ + 透明アクリルパネル挟み込み（表裏） + スタンドオフ金具");
    lines.push("- 入力: 手書きアップロード + テキスト（任意）");
    lines.push("- 表現: 単線 / 14色パレット / 最大3色（主色1＋アクセント2）");
    lines.push("");
    lines.push("■ テキスト");
    lines.push(text.trim() ? text.trim() : "（未入力）");
    lines.push("");
    lines.push("■ 色");
    lines.push(`- 主色: ${colors.primary.name} (${colors.primary.hex})`);
    lines.push(`- アクセント1: ${colors.accent1.name} (${colors.accent1.hex})`);
    lines.push(`- アクセント2: ${colors.accent2.name} (${colors.accent2.hex})`);
    lines.push("");
    lines.push("■ 背景テンプレ（プレビュー）");
    for (const t of templates){
        lines.push(`- ${t.name}`);
    }
    if (note.trim()) {
        lines.push("");
        lines.push("■ 備考");
        lines.push(note.trim());
    }
    return lines.join("\n");
}
}),
"[project]/neon-sign-maker/src/lib/palette.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NEON_PALETTE_14",
    ()=>NEON_PALETTE_14
]);
const NEON_PALETTE_14 = [
    // whites
    {
        id: "cool-white-8000k",
        name: "クールホワイト（8000K相当）",
        hex: "#EAF3FF"
    },
    {
        id: "off-white-6000k",
        name: "オフホワイト（6000K相当）",
        hex: "#F6F7F4"
    },
    {
        id: "warm-white-4000k",
        name: "ウォームホワイト（4000K相当）",
        hex: "#FFF1D6"
    },
    {
        id: "lamp-orange-3000k",
        name: "ランプオレンジ（3000K相当）",
        hex: "#FFD1A3"
    },
    // colors
    {
        id: "red",
        name: "red",
        hex: "#FF1744"
    },
    {
        id: "pink",
        name: "pink",
        hex: "#FF2DAA"
    },
    {
        id: "rose",
        name: "rose",
        hex: "#FF4DFF"
    },
    {
        id: "purple",
        name: "purple",
        hex: "#8A2BFF"
    },
    {
        id: "blue",
        name: "blue",
        hex: "#2D5BFF"
    },
    {
        id: "sky-blue",
        name: "sky blue",
        hex: "#00E5FF"
    },
    {
        id: "green",
        name: "green",
        hex: "#39FF14"
    },
    {
        id: "lemon-yellow",
        name: "lemon yellow",
        hex: "#FFF200"
    },
    {
        id: "yellow",
        name: "yellow",
        hex: "#FFB000"
    },
    {
        id: "orange",
        name: "orange",
        hex: "#FF6A00"
    }
];
}),
"[project]/neon-sign-maker/src/lib/backgrounds.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BACKGROUND_TEMPLATES",
    ()=>BACKGROUND_TEMPLATES
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
}),
"[project]/neon-sign-maker/src/app/studio/studio-client.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudioClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$UploadAndText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/components/UploadAndText.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$ColorPicker24$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/components/ColorPicker24.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$NeonPreviewGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$InquiryForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/components/InquiryForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/lib/palette.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$backgrounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/lib/backgrounds.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function StudioClient() {
    const defaultPrimary = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NEON_PALETTE_14"][0];
    const defaultAccent1 = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NEON_PALETTE_14"][5];
    const defaultAccent2 = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NEON_PALETTE_14"][9];
    const [sketchDataUrl, setSketchDataUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [text, setText] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [colors, setColors] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({
        primary: defaultPrimary,
        accent1: defaultAccent1,
        accent2: defaultAccent2
    });
    const [showPreview, setShowPreview] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const canPreview = Boolean(sketchDataUrl || text.trim());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-black text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-5xl px-6 py-16 space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/",
                            className: "text-sm text-zinc-300 hover:text-white",
                            children: "← 戻る"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-zinc-400",
                            children: "MVP: 問い合わせ獲得（A） / 出力: 設置イメージ（B）"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold",
                            children: "Studio"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-zinc-300",
                            children: "画像アップロード（手書き）とテキストを元に、3背景で「飾った完成形」をプレビューします。 仕上がりは「φ5/7/9mm相当のネオンチューブ + 透明アクリルパネル挟み込み（表裏） + 四隅金具」を想定。"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$UploadAndText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    imageDataUrl: sketchDataUrl,
                    onImageChange: (next)=>{
                        setSketchDataUrl(next);
                        setShowPreview(false);
                    },
                    text: text,
                    onTextChange: (next)=>{
                        setText(next);
                        setShowPreview(false);
                    }
                }, void 0, false, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$ColorPicker24$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    palette: __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NEON_PALETTE_14"],
                    value: colors,
                    onChange: (next)=>{
                        setColors(next);
                        setShowPreview(false);
                    }
                }, void 0, false, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-white/10 bg-white/5 p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold",
                                            children: "プレビュー"
                                        }, void 0, false, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-zinc-300",
                                            children: "まずはモックで確認 → 後からAI生成に差し替えます。"
                                        }, void 0, false, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: !canPreview,
                                    onClick: ()=>setShowPreview(true),
                                    className: [
                                        "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                                        canPreview ? "bg-white text-black hover:bg-zinc-200" : "bg-white/10 text-zinc-500 cursor-not-allowed"
                                    ].join(" "),
                                    children: "設置イメージを作る"
                                }, void 0, false, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        !canPreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-xs text-zinc-400",
                            children: "※ 手書きをアップロードするか、テキストを入力してください。"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                showPreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$NeonPreviewGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            templates: __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$backgrounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BACKGROUND_TEMPLATES"],
                            text: text,
                            sketchDataUrl: sketchDataUrl,
                            colors: colors
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$InquiryForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            text: text,
                            colors: colors,
                            templates: __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$backgrounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BACKGROUND_TEMPLATES"]
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 106,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/neon-sign-maker/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f758ff81._.js.map