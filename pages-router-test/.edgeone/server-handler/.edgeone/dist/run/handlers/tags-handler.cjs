"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
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

// src/run/handlers/tags-handler.cts
var tags_handler_exports = {};
__export(tags_handler_exports, {
  isAnyTagStale: () => isAnyTagStale,
  markTagsAsStaleAndPurgeEdgeCache: () => markTagsAsStaleAndPurgeEdgeCache,
  purgeEdgeCache: () => purgeEdgeCache
});
module.exports = __toCommonJS(tags_handler_exports);

// package.json
var name = "@tencent/opennext";
var version = "1.0.11";

// src/run/handlers/tags-handler.cts
var import_request_context = require("./request-context.cjs");
var purgeCacheUserAgent = `${name}@${version}`;
function isAnyTagStale(tags, timestamp) {
  return Promise.resolve(false);
}
function getCacheTagsFromTagOrTags(tagOrTags) {
  return (Array.isArray(tagOrTags) ? tagOrTags : [tagOrTags]).flatMap((tag) => tag.split(/,|%2c/gi)).filter(Boolean);
}
function purgeEdgeCache(tagOrTags) {
  const tags = getCacheTagsFromTagOrTags(tagOrTags);
  if (tags.length === 0) {
    return Promise.resolve();
  }
  (0, import_request_context.getLogger)().debug(`[NextRuntime] Purging CDN cache for: [${tags}.join(', ')]`);
}
async function doRevalidateTagAndPurgeEdgeCache(tags) {
  (0, import_request_context.getLogger)().withFields({ tags }).debug("doRevalidateTagAndPurgeEdgeCache");
  if (tags.length === 0) {
    return;
  }
  const tagManifest = {
    revalidatedAt: Date.now()
  };
  await purgeEdgeCache(tags);
}
function markTagsAsStaleAndPurgeEdgeCache(tagOrTags) {
  const tags = getCacheTagsFromTagOrTags(tagOrTags);
  const revalidateTagPromise = doRevalidateTagAndPurgeEdgeCache(tags);
  const requestContext = (0, import_request_context.getRequestContext)();
  if (requestContext) {
    requestContext.trackBackgroundWork(revalidateTagPromise);
  }
  return revalidateTagPromise;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isAnyTagStale,
  markTagsAsStaleAndPurgeEdgeCache,
  purgeEdgeCache
});
