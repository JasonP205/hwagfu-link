"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var index_exports = {};
__export(index_exports, {
  JasonCode: () => JasonCode
});
module.exports = __toCommonJS(index_exports);

// src/JasonCode.tsx
var import_react = require("react");
var import_react2 = require("@heroui/react");
var import_jsx_runtime = require("react/jsx-runtime");
var JasonCode = ({
  label = "Jason Code Space",
  url = "https://hwagfu.dev",
  className = "",
  classNames = {},
  type = "button",
  render
}) => {
  const [ogData, setOgData] = (0, import_react.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react.useState)(true);
  (0, import_react.useEffect)(() => {
    const fetchOGData = () => __async(null, null, function* () {
      var _a, _b, _c;
      try {
        setIsLoading(true);
        const res = yield fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const json = yield res.json();
        let hostname2 = "";
        try {
          hostname2 = new URL(url).hostname;
        } catch (e) {
        }
        const fallbackFavicon = hostname2 ? `https://s2.googleusercontent.com/s2/favicons?domain=${hostname2}&sz=64` : void 0;
        setOgData({
          title: (_a = json.data) == null ? void 0 : _a.title,
          favicon: ((_c = (_b = json.data) == null ? void 0 : _b.logo) == null ? void 0 : _c.url) || fallbackFavicon
        });
      } catch (error) {
        console.error("Failed to fetch OG data", error);
      } finally {
        setIsLoading(false);
      }
    });
    if (url) {
      fetchOGData();
    }
  }, [url]);
  const displayTitle = (ogData == null ? void 0 : ogData.title) || label;
  let hostname = "";
  try {
    hostname = new URL(url).hostname;
  } catch (e) {
  }
  const displayFavicon = (ogData == null ? void 0 : ogData.favicon) || (hostname ? `https://s2.googleusercontent.com/s2/favicons?domain=${hostname}&sz=64` : "");
  if (render) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: render({ title: displayTitle, favicon: displayFavicon, url, isLoading }) });
  }
  const innerContent = isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Spinner, { size: "sm", color: "current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    displayFavicon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        src: displayFavicon,
        alt: displayTitle,
        className: `w-4 h-4 object-contain shrink-0 ${classNames.image || ""}`
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `truncate ${classNames.content || ""}`, children: displayTitle })
  ] });
  const wrapperProps = {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer"
  };
  if (type === "link") {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react2.Link,
      {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: `inline-flex items-center gap-2 max-w-full truncate ${className}`,
        children: innerContent
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react2.Button,
    {
      className: `inline-flex flex-nowrap items-center gap-2 max-w-[300px] ${className}`,
      onPress: () => window.open(url, "_blank"),
      children: innerContent
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JasonCode
});
//# sourceMappingURL=index.js.map