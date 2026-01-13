(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/neon-sign-maker/src/components/UploadAndText.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UploadAndText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function UploadAndText({ imageDataUrl, onImageChange, text, onTextChange }) {
    _s();
    const fileInputRef = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const [dragActive, setDragActive] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-white/10 bg-white/5 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-semibold",
                children: "入力"
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-zinc-300",
                children: "手書き（単線）でも、テキストでもOK。"
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-6 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold",
                                        children: "手書きアップロード"
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this),
                                    imageDataUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            !imageDataUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-zinc-200",
                                        children: "ドラッグ&ドロップ"
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-zinc-400",
                                        children: "またはクリックして画像を選択（JPG/PNG, 8MB以下）"
                                    }, void 0, false, {
                                        fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 rounded-xl border border-white/10 bg-black/30 p-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold",
                                children: "テキスト（任意）"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-zinc-400",
                                children: "誤字防止のため、文字ネオンの場合は入力推奨。"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/UploadAndText.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
_s(UploadAndText, "HpJN2LXv/3ui+lkvJ9imE0xb2Wo=");
_c = UploadAndText;
var _c;
__turbopack_context__.k.register(_c, "UploadAndText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ColorPicker14Dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ColorPicker14Dynamic({ palette, colors, onChange, maxColors = 5 }) {
    _s();
    const [activeIndex, setActiveIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(0);
    __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ColorPicker14Dynamic.useEffect": ()=>{
            if (activeIndex > colors.length - 1) setActiveIndex(colors.length - 1);
        }
    }["ColorPicker14Dynamic.useEffect"], [
        activeIndex,
        colors.length
    ]);
    function setSlotColor(idx, color) {
        const next = colors.slice();
        next[idx] = color;
        onChange(next);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-white/10 bg-white/5 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold",
                                children: "色（14色パレット）"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-zinc-300",
                                children: [
                                    "まず色数を決めて、同じ数だけ色を選びます（上限",
                                    maxColors,
                                    "色）。"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-zinc-400",
                        children: [
                            "選択中: ",
                            slotLabel(activeIndex)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-3 sm:grid-cols-5",
                children: colors.map((c, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SlotButton, {
                        label: slotLabel(idx),
                        color: c,
                        active: idx === activeIndex,
                        onClick: ()=>setActiveIndex(idx)
                    }, idx, false, {
                        fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid grid-cols-7 gap-2",
                children: palette.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setSlotColor(activeIndex, c),
                        className: "group relative h-9 w-9 rounded-lg border border-white/10 hover:border-white/25 transition-colors",
                        title: `${c.name} (${c.hex})`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute inset-0 rounded-lg",
                                style: {
                                    backgroundColor: c.hex,
                                    boxShadow: `0 0 0 1px rgba(0,0,0,0.25) inset, 0 0 18px ${c.hex}55`
                                }
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: c.name
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        ]
                    }, c.id, true, {
                        fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(ColorPicker14Dynamic, "16En7kR7TbAJMjBrm+xutVNIc5Q=");
_c = ColorPicker14Dynamic;
function SlotButton({ label, color, active, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: [
            "rounded-xl border px-3 py-3 text-left transition-colors",
            active ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5 hover:border-white/20"
        ].join(" "),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-zinc-400",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-0.5 truncate text-sm font-semibold",
                            children: color.name
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "h-7 w-7 rounded-lg border border-white/10",
                    style: {
                        backgroundColor: color.hex,
                        boxShadow: `0 0 14px ${color.hex}66`
                    }
                }, void 0, false, {
                    fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_c1 = SlotButton;
function slotLabel(idx) {
    if (idx === 0) return "主色";
    return `アクセント${idx}`;
}
var _c, _c1;
__turbopack_context__.k.register(_c, "ColorPicker14Dynamic");
__turbopack_context__.k.register(_c1, "SlotButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NeonPreviewGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function NeonPreviewGrid({ templates, text, sketchDataUrl, colors, aiImageDataUrl }) {
    if (!aiImageDataUrl) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-white/10 bg-white/5 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end justify-between gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold",
                            children: "設置イメージ"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-zinc-300",
                            children: "AI生成のリアル設置イメージです。"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-4 sm:grid-cols-1",
                children: templates.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-white/10 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-black/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: aiImageDataUrl,
                                    alt: "AI生成の設置イメージ",
                                    className: "block w-full h-auto",
                                    style: {
                                        maxHeight: "75vh",
                                        objectFit: "contain"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3"
                            }, void 0, false, {
                                fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = NeonPreviewGrid;
var _c;
__turbopack_context__.k.register(_c, "NeonPreviewGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/neon-sign-maker/src/lib/palette.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/neon-sign-maker/src/lib/backgrounds.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/neon-sign-maker/src/lib/neonProtocol.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/neon-sign-maker/src/lib/quote.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FIXED_YEN_PER_CM_TUBE",
    ()=>FIXED_YEN_PER_CM_TUBE,
    "SAMPLE_PRICE_YEN_EX_TAX",
    ()=>SAMPLE_PRICE_YEN_EX_TAX,
    "SAMPLE_WIDTH_MM",
    ()=>SAMPLE_WIDTH_MM,
    "estimatePriceYenExTaxFromTubeLength",
    ()=>estimatePriceYenExTaxFromTubeLength,
    "formatYen",
    ()=>formatYen
]);
const SAMPLE_WIDTH_MM = 1000; // 100cm
const SAMPLE_PRICE_YEN_EX_TAX = 82400;
const FIXED_YEN_PER_CM_TUBE = 75;
function estimatePriceYenExTaxFromTubeLength(tubeLengthCm, unitYenPerCm) {
    const safeLen = Math.max(0, tubeLengthCm);
    const safeUnit = Math.max(0, unitYenPerCm);
    return Math.round(safeLen * safeUnit);
}
function formatYen(n) {
    return new Intl.NumberFormat("ja-JP").format(Math.round(n));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/neon-sign-maker/src/lib/lineLength.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "estimateTubeLengthCmFromNeonPhoto",
    ()=>estimateTubeLengthCmFromNeonPhoto,
    "estimateTubeLengthCmFromSketch",
    ()=>estimateTubeLengthCmFromSketch
]);
function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}
function loadImage(dataUrl) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.onload = ()=>resolve(img);
        img.onerror = (e)=>reject(e);
        img.src = dataUrl;
    });
}
function toGrayscaleAndBinarize(ctx, w, h, threshold) {
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    const out = new Uint8Array(w * h);
    for(let i = 0, p = 0; i < d.length; i += 4, p++){
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        const a = d[i + 3];
        if (a < 16) {
            out[p] = 0;
            continue;
        }
        // perceptual luminance
        const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        // assume dark strokes on light paper; invert if necessary later
        out[p] = y < threshold ? 1 : 0;
    }
    return out;
}
function invertIfMostlyOn(binary) {
    let on = 0;
    for(let i = 0; i < binary.length; i++)on += binary[i];
    // if more than 50% pixels are "on", likely inverted background; invert
    if (on > binary.length * 0.5) {
        for(let i = 0; i < binary.length; i++)binary[i] = binary[i] ? 0 : 1;
    }
}
function computeBBox(binary, w, h) {
    let minX = w, minY = h, maxX = -1, maxY = -1;
    for(let y = 0; y < h; y++){
        for(let x = 0; x < w; x++){
            if (binary[y * w + x]) {
                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
            }
        }
    }
    if (maxX < 0) return null;
    return {
        minX,
        minY,
        maxX,
        maxY,
        width: maxX - minX + 1,
        height: maxY - minY + 1
    };
}
// Zhang-Suen thinning (binary image: 1=foreground)
function zhangSuenThinning(binary, w, h) {
    const img = new Uint8Array(binary); // copy
    const neighbors = (x, y)=>{
        const p2 = img[(y - 1) * w + x];
        const p3 = img[(y - 1) * w + (x + 1)];
        const p4 = img[y * w + (x + 1)];
        const p5 = img[(y + 1) * w + (x + 1)];
        const p6 = img[(y + 1) * w + x];
        const p7 = img[(y + 1) * w + (x - 1)];
        const p8 = img[y * w + (x - 1)];
        const p9 = img[(y - 1) * w + (x - 1)];
        return [
            p2,
            p3,
            p4,
            p5,
            p6,
            p7,
            p8,
            p9
        ];
    };
    let changed = true;
    const toDelete = [];
    while(changed){
        changed = false;
        toDelete.length = 0;
        // step 1
        for(let y = 1; y < h - 1; y++){
            for(let x = 1; x < w - 1; x++){
                const idx = y * w + x;
                if (img[idx] !== 1) continue;
                const [p2, p3, p4, p5, p6, p7, p8, p9] = neighbors(x, y);
                const bp = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
                if (bp < 2 || bp > 6) continue;
                const ap = (p2 === 0 && p3 === 1 ? 1 : 0) + (p3 === 0 && p4 === 1 ? 1 : 0) + (p4 === 0 && p5 === 1 ? 1 : 0) + (p5 === 0 && p6 === 1 ? 1 : 0) + (p6 === 0 && p7 === 1 ? 1 : 0) + (p7 === 0 && p8 === 1 ? 1 : 0) + (p8 === 0 && p9 === 1 ? 1 : 0) + (p9 === 0 && p2 === 1 ? 1 : 0);
                if (ap !== 1) continue;
                if (p2 * p4 * p6 !== 0) continue;
                if (p4 * p6 * p8 !== 0) continue;
                toDelete.push(idx);
            }
        }
        if (toDelete.length) {
            changed = true;
            for (const idx of toDelete)img[idx] = 0;
        }
        toDelete.length = 0;
        // step 2
        for(let y = 1; y < h - 1; y++){
            for(let x = 1; x < w - 1; x++){
                const idx = y * w + x;
                if (img[idx] !== 1) continue;
                const [p2, p3, p4, p5, p6, p7, p8, p9] = neighbors(x, y);
                const bp = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
                if (bp < 2 || bp > 6) continue;
                const ap = (p2 === 0 && p3 === 1 ? 1 : 0) + (p3 === 0 && p4 === 1 ? 1 : 0) + (p4 === 0 && p5 === 1 ? 1 : 0) + (p5 === 0 && p6 === 1 ? 1 : 0) + (p6 === 0 && p7 === 1 ? 1 : 0) + (p7 === 0 && p8 === 1 ? 1 : 0) + (p8 === 0 && p9 === 1 ? 1 : 0) + (p9 === 0 && p2 === 1 ? 1 : 0);
                if (ap !== 1) continue;
                if (p2 * p4 * p8 !== 0) continue;
                if (p2 * p6 * p8 !== 0) continue;
                toDelete.push(idx);
            }
        }
        if (toDelete.length) {
            changed = true;
            for (const idx of toDelete)img[idx] = 0;
        }
    }
    return img;
}
function skeletonLengthPx(skel, w, h) {
    let length = 0;
    const sqrt2 = Math.SQRT2;
    for(let y = 0; y < h; y++){
        for(let x = 0; x < w; x++){
            const idx = y * w + x;
            if (!skel[idx]) continue;
            // count edges to avoid double counting: right, down, down-right, down-left
            if (x + 1 < w && skel[y * w + (x + 1)]) length += 1;
            if (y + 1 < h && skel[(y + 1) * w + x]) length += 1;
            if (x + 1 < w && y + 1 < h && skel[(y + 1) * w + (x + 1)]) length += sqrt2;
            if (x - 1 >= 0 && y + 1 < h && skel[(y + 1) * w + (x - 1)]) length += sqrt2;
        }
    }
    // fallback if too sparse (e.g. single pixels), approximate by count
    if (length < 1) {
        let cnt = 0;
        for(let i = 0; i < skel.length; i++)cnt += skel[i];
        length = cnt;
    }
    return length;
}
async function estimateTubeLengthCmFromSketch({ sketchDataUrl, targetWidthMm, fillRatio = 0.9, threshold = 210, maxDim = 1024 }) {
    const img = await loadImage(sketchDataUrl);
    const srcW = img.naturalWidth || img.width;
    const srcH = img.naturalHeight || img.height;
    const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
    const w = Math.max(1, Math.round(srcW * scale));
    const h = Math.max(1, Math.round(srcH * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not available");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    const bin = toGrayscaleAndBinarize(ctx, w, h, threshold);
    invertIfMostlyOn(bin);
    const bbox = computeBBox(bin, w, h);
    if (!bbox) {
        return {
            bboxWidthPx: 0,
            bboxHeightPx: 0,
            skeletonLengthPx: 0,
            tubeLengthCm: 0
        };
    }
    const skel = zhangSuenThinning(bin, w, h);
    const lenPx = skeletonLengthPx(skel, w, h);
    const widthMm = clamp(targetWidthMm, 200, 2000);
    const bboxWidthPx = Math.max(1, bbox.width);
    const mmPerPx = widthMm * fillRatio / bboxWidthPx;
    const tubeLengthMm = lenPx * mmPerPx;
    const tubeLengthCm = tubeLengthMm / 10;
    return {
        bboxWidthPx: bbox.width,
        bboxHeightPx: bbox.height,
        skeletonLengthPx: lenPx,
        tubeLengthCm
    };
}
function luminanceOf(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function percentile(values, p) {
    const arr = Array.from(values);
    arr.sort((a, b)=>a - b);
    const idx = clamp(Math.floor((arr.length - 1) * p), 0, arr.length - 1);
    return arr[idx];
}
function toBrightMask(ctx, w, h, pctl) {
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    const Y = new Float32Array(w * h);
    for(let i = 0, p = 0; i < d.length; i += 4, p++){
        const a = d[i + 3];
        if (a < 16) {
            Y[p] = 0;
            continue;
        }
        Y[p] = luminanceOf(d[i], d[i + 1], d[i + 2]);
    }
    const thr = percentile(Y, pctl); // e.g. 85th percentile
    const out = new Uint8Array(w * h);
    for(let p = 0; p < Y.length; p++){
        // keep only the brightest pixels (neon/glow)
        out[p] = Y[p] >= thr ? 1 : 0;
    }
    return out;
}
async function estimateTubeLengthCmFromNeonPhoto({ imageDataUrl, targetWidthMm, brightPercentile = 0.85, maxDim = 1024 }) {
    const img = await loadImage(imageDataUrl);
    const srcW = img.naturalWidth || img.width;
    const srcH = img.naturalHeight || img.height;
    const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
    const w = Math.max(1, Math.round(srcW * scale));
    const h = Math.max(1, Math.round(srcH * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not available");
    ctx.drawImage(img, 0, 0, w, h);
    const bin = toBrightMask(ctx, w, h, clamp(brightPercentile, 0.5, 0.98));
    const bbox = computeBBox(bin, w, h);
    if (!bbox) {
        return {
            bboxWidthPx: 0,
            bboxHeightPx: 0,
            skeletonLengthPx: 0,
            tubeLengthCm: 0
        };
    }
    const skel = zhangSuenThinning(bin, w, h);
    const lenPx = skeletonLengthPx(skel, w, h);
    const widthMm = clamp(targetWidthMm, 200, 2000);
    // 基準は「アクリル板の外寸（全体幅）」= targetWidthMm
    // 画像からアクリル板の外寸幅(px)を推定する。
    // 方針: 四隅スタンドオフ金具は暗い円として写りやすいので、各コーナー領域の最暗点を拾い、横幅を推定。
    const panelWidthPx = estimatePanelWidthPxFromStandoffs(ctx, w, h) ?? Math.round(w * 0.9);
    const mmPerPx = widthMm / Math.max(1, panelWidthPx);
    const tubeLengthMm = lenPx * mmPerPx;
    const tubeLengthCm = tubeLengthMm / 10;
    return {
        bboxWidthPx: bbox.width,
        bboxHeightPx: bbox.height,
        skeletonLengthPx: lenPx,
        tubeLengthCm
    };
}
function estimatePanelWidthPxFromStandoffs(ctx, w, h) {
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    const getY = (x, y)=>{
        const i = (y * w + x) * 4;
        return luminanceOf(d[i], d[i + 1], d[i + 2]);
    };
    const findDarkest = (x0, x1, y0, y1)=>{
        let bestX = x0;
        let bestY = y0;
        let best = 1e9;
        for(let y = y0; y < y1; y++){
            for(let x = x0; x < x1; x++){
                const Y = getY(x, y);
                if (Y < best) {
                    best = Y;
                    bestX = x;
                    bestY = y;
                }
            }
        }
        return {
            x: bestX,
            y: bestY,
            Y: best
        };
    };
    const rx = Math.floor(w * 0.35);
    const ry = Math.floor(h * 0.35);
    const tl = findDarkest(0, rx, 0, ry);
    const tr = findDarkest(w - rx, w, 0, ry);
    const bl = findDarkest(0, rx, h - ry, h);
    const br = findDarkest(w - rx, w, h - ry, h);
    // sanity: standoff candidates should be "dark enough"
    const darkEnough = (p)=>p.Y < 80;
    if (![
        tl,
        tr,
        bl,
        br
    ].every(darkEnough)) return null;
    const topSpan = tr.x - tl.x;
    const bottomSpan = br.x - bl.x;
    const span = Math.round((topSpan + bottomSpan) / 2);
    if (span < w * 0.3) return null;
    // approximate: standoff centers are slightly inset from panel edges; compensate a bit
    const pad = Math.round(w * 0.01); // ~1% of width
    return span + pad * 2;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/neon-sign-maker/src/app/studio/studio-client.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudioClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/HeroBeforeAfter'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$UploadAndText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/components/UploadAndText.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$ColorPicker14Dynamic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/components/ColorPicker14Dynamic.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$NeonPreviewGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/components/NeonPreviewGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/lib/palette.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$backgrounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/lib/backgrounds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$neonProtocol$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/lib/neonProtocol.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$quote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/lib/quote.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$lineLength$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neon-sign-maker/src/lib/lineLength.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
function StudioClient() {
    _s();
    const [sketchDataUrl, setSketchDataUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [text, setText] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const [colorCount, setColorCount] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(3);
    const [colors, setColors] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        "StudioClient.useState": ()=>[
                __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PALETTE_14"][0],
                __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PALETTE_14"][5],
                __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PALETTE_14"][9]
            ]
    }["StudioClient.useState"]);
    const [widthMm, setWidthMm] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(600);
    const tubeDiameter = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$neonProtocol$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PROTOCOL_V1"].defaultTubeDiameter;
    const [isGenerating, setIsGenerating] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [aiImageDataUrl, setAiImageDataUrl] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [aiError, setAiError] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [isEstimating, setIsEstimating] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [tubeLengthCm, setTubeLengthCm] = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    const unitYenPerCm = __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$quote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIXED_YEN_PER_CM_TUBE"];
    const canGenerate = Boolean(sketchDataUrl || text.trim());
    const background = (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$backgrounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultBackground"])();
    const priceYenExTax = tubeLengthCm == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$quote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimatePriceYenExTaxFromTubeLength"])(tubeLengthCm, unitYenPerCm);
    // 色数変更に追従して配列を増減
    __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "StudioClient.useEffect": ()=>{
            const n = Math.max(1, Math.min(5, colorCount));
            setColors({
                "StudioClient.useEffect": (prev)=>{
                    if (prev.length === n) return prev;
                    if (prev.length > n) return prev.slice(0, n);
                    // 足りない分はパレット先頭から埋める（重複OK、ユーザーが後で変える）
                    const next = prev.slice();
                    while(next.length < n)next.push(__TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PALETTE_14"][Math.min(next.length, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PALETTE_14"].length - 1)]);
                    return next;
                }
            }["StudioClient.useEffect"]);
        }
    }["StudioClient.useEffect"], [
        colorCount
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-black text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-5xl px-6 py-16 space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm font-semibold text-zinc-200",
                            children: "neon-sign-maker"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-zinc-400",
                            children: "MVP: 設置イメージ（B）をリアルに生成"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold",
                        children: "作成イメージ"
                    }, void 0, false, {
                        fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeroBeforeAfter, {}, void 0, false, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$UploadAndText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    imageDataUrl: sketchDataUrl,
                    onImageChange: (next)=>{
                        setSketchDataUrl(next);
                        setAiImageDataUrl(null);
                        setAiError(null);
                    },
                    text: text,
                    onTextChange: (next)=>{
                        setText(next);
                        setAiImageDataUrl(null);
                        setAiError(null);
                    }
                }, void 0, false, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-white/10 bg-white/5 p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-end justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold",
                                            children: "サイズ（横幅）"
                                        }, void 0, false, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-zinc-300",
                                            children: "透明アクリル板の外寸（全体幅）を指定します。縦幅は文字/ロゴの形に合わせて自動調整します。"
                                        }, void 0, false, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-zinc-400",
                                    children: [
                                        "現在: ",
                                        widthMm,
                                        "mm"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    inputMode: "numeric",
                                    min: 200,
                                    max: 2000,
                                    step: 10,
                                    value: widthMm,
                                    onChange: (e)=>{
                                        const n = Number(e.target.value);
                                        setWidthMm(Number.isFinite(n) ? n : 600);
                                        setAiImageDataUrl(null);
                                        setAiError(null);
                                    },
                                    className: "w-40 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/60"
                                }, void 0, false, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-zinc-300",
                                    children: "mm"
                                }, void 0, false, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-zinc-500",
                                    children: "（目安：400〜900mm）"
                                }, void 0, false, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-white/10 bg-white/5 p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-end justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold",
                                            children: "色数"
                                        }, void 0, false, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-zinc-300",
                                            children: "まず色数（上限5色）を選んでください。"
                                        }, void 0, false, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 122,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-zinc-400",
                                    children: [
                                        "現在: ",
                                        colorCount,
                                        "色"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex flex-wrap gap-2",
                            children: [
                                1,
                                2,
                                3,
                                4,
                                5
                            ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setColorCount(n);
                                        setAiImageDataUrl(null);
                                        setAiError(null);
                                    },
                                    className: [
                                        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                                        colorCount === n ? "bg-white text-black" : "bg-white/10 text-zinc-200 hover:bg-white/15"
                                    ].join(" "),
                                    children: [
                                        n,
                                        "色"
                                    ]
                                }, n, true, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$ColorPicker14Dynamic$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    palette: __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$palette$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEON_PALETTE_14"],
                    colors: colors,
                    maxColors: 5,
                    onChange: (next)=>{
                        setColors(next);
                        setAiImageDataUrl(null);
                        setAiError(null);
                    }
                }, void 0, false, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-white/10 bg-white/5 p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold",
                                            children: "AIでリアルに生成"
                                        }, void 0, false, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-zinc-300",
                                            children: "商品写真のような設置イメージを1枚生成します（ネオンチューブ＋透明アクリル＋四隅金具）。"
                                        }, void 0, false, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 162,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: !canGenerate || isGenerating,
                                    onClick: async ()=>{
                                        if (!canGenerate) return;
                                        setIsGenerating(true);
                                        setAiError(null);
                                        setTubeLengthCm(null);
                                        setIsEstimating(true);
                                        try {
                                            // 1) AI生成（サーバー側）
                                            const resp = await fetch("/api/neon/generate", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    sketchDataUrl,
                                                    text,
                                                    colors,
                                                    widthMm,
                                                    tubeDiameter
                                                })
                                            });
                                            const data = await resp.json();
                                            if (!resp.ok) throw new Error(data?.error || "生成に失敗しました");
                                            setAiImageDataUrl(data.imageDataUrl);
                                            // 2) 生成された“設置写真”からチューブ長推定（ユーザー要件に合わせる）
                                            const est = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$lineLength$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateTubeLengthCmFromNeonPhoto"])({
                                                imageDataUrl: data.imageDataUrl,
                                                targetWidthMm: widthMm
                                            });
                                            setTubeLengthCm(est.tubeLengthCm);
                                        } catch (e) {
                                            setAiError(e instanceof Error ? e.message : "生成に失敗しました");
                                        } finally{
                                            setIsGenerating(false);
                                            setIsEstimating(false);
                                        }
                                    },
                                    className: [
                                        "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                                        !canGenerate || isGenerating ? "bg-white/10 text-zinc-500 cursor-not-allowed" : "bg-fuchsia-300 text-black hover:bg-fuchsia-200"
                                    ].join(" "),
                                    children: isGenerating ? "作成中..." : "作成イメージ"
                                }, void 0, false, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        !canGenerate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-xs text-zinc-400",
                            children: "※ 手書きをアップロードするか、テキストを入力してください。"
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this),
                        aiError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm text-red-300",
                            children: aiError
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 219,
                            columnNumber: 23
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this),
                aiImageDataUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$components$2f$NeonPreviewGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            templates: [
                                background
                            ],
                            text: text,
                            sketchDataUrl: sketchDataUrl,
                            colors: colors,
                            aiImageDataUrl: aiImageDataUrl
                        }, void 0, false, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 224,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-white/10 bg-white/5 p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-baseline justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-semibold",
                                            children: "見積（税別）"
                                        }, void 0, false, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 234,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl font-bold text-fuchsia-200",
                                            children: priceYenExTax == null ? "—" : `¥${(0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$quote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatYen"])(priceYenExTax)}`
                                        }, void 0, false, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 235,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 233,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 grid gap-1 text-sm text-zinc-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "・横幅: ",
                                                Math.round(widthMm),
                                                "mm"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 240,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "・推定チューブ長:",
                                                " ",
                                                isEstimating || tubeLengthCm == null ? "計算中..." : `${tubeLengthCm.toFixed(0)}cm`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 241,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "・単価（固定）: ¥",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$src$2f$lib$2f$quote$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatYen"])(unitYenPerCm),
                                                " / cm"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                            lineNumber: 245,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 239,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-[11px] text-zinc-400",
                                    children: "※単価は固定（横幅100cmのサンプル：チューブ長11m、¥82,400税別 → 約75円/cm）です。"
                                }, void 0, false, {
                                    fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                                    lineNumber: 247,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
                            lineNumber: 232,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/neon-sign-maker/src/app/studio/studio-client.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(StudioClient, "BvMhyRgxF/Q7LiGx2YuU4D57+nw=");
_c = StudioClient;
var _c;
__turbopack_context__.k.register(_c, "StudioClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/neon-sign-maker/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/neon-sign-maker/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/neon-sign-maker/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$neon$2d$sign$2d$maker$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/neon-sign-maker/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/neon-sign-maker/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=neon-sign-maker_1177c600._.js.map