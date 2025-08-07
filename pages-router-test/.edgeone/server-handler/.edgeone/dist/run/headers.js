
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import "../esm-chunks/chunk-6BT4RYQJ.js";

// src/run/headers.ts
var getHeaderValueArray = (header) => {
  return header.split(",").map((value) => value.trim()).filter(Boolean);
};
var omitHeaderValues = (header, values) => {
  const headerValues = getHeaderValueArray(header);
  const filteredValues = headerValues.filter(
    (value) => !values.some((val) => value.startsWith(val))
  );
  return filteredValues.join(", ");
};
function setCacheControlFromRequestContext(headers, revalidate) {
  const cdnCacheControl = (
    // if we are serving already stale response, instruct edge to not attempt to cache that response
    headers.get("x-nextjs-cache") === "STALE" ? "public, max-age=0, must-revalidate, durable" : `s-maxage=${revalidate || 31536e3}, stale-while-revalidate=31536000, durable`
  );
  headers.set("eo-cdn-cache-control", cdnCacheControl);
}
var setCacheControlHeaders = ({ headers, status }, request, requestContext) => {
  if (typeof requestContext.routeHandlerRevalidate !== "undefined" && ["GET", "HEAD"].includes(request.method) && !headers.has("cdn-cache-control") && !headers.has("eo-cdn-cache-control")) {
    setCacheControlFromRequestContext(headers, requestContext.routeHandlerRevalidate);
    return;
  }
  if (status === 404) {
    if (request.url.endsWith(".php")) {
      headers.set("cache-control", "public, max-age=0, must-revalidate");
      headers.set("eo-cdn-cache-control", `max-age=31536000, durable`);
      return;
    }
    if (process.env.CACHE_404_PAGE && request.url.endsWith("/404") && ["GET", "HEAD"].includes(request.method)) {
      setCacheControlFromRequestContext(headers, requestContext.pageHandlerRevalidate);
      return;
    }
  }
  const cacheControl = headers.get("cache-control");
  if (cacheControl !== null && ["GET", "HEAD"].includes(request.method) && !headers.has("cdn-cache-control") && !headers.has("eo-cdn-cache-control")) {
    const browserCacheControl = omitHeaderValues(cacheControl, [
      "s-maxage",
      "stale-while-revalidate"
    ]);
    const cdnCacheControl = (
      // if we are serving already stale response, instruct edge to not attempt to cache that response
      headers.get("x-nextjs-cache") === "STALE" ? "public, max-age=0, must-revalidate, durable" : [
        ...getHeaderValueArray(cacheControl).map(
          (value) => value === "stale-while-revalidate" ? "stale-while-revalidate=31536000" : value
        ),
        "durable"
      ].join(", ")
    );
    headers.set("cache-control", browserCacheControl || "public, max-age=0, must-revalidate");
    headers.set("eo-cdn-cache-control", cdnCacheControl);
    return;
  }
  if (cacheControl === null && ["GET", "HEAD"].includes(request.method) && !headers.has("cdn-cache-control") && !headers.has("eo-cdn-cache-control") && requestContext.usedFsReadForNonFallback && !requestContext.didPagesRouterOnDemandRevalidate) {
    headers.set("cache-control", "public, max-age=0, must-revalidate");
    headers.set("eo-cdn-cache-control", `max-age=31536000, durable`);
  }
};
var setCacheTagsHeaders = (headers, requestContext) => {
  if (!headers.has("cache-control")) {
    return;
  }
};
var NEXT_CACHE_TO_CACHE_STATUS = {
  HIT: `hit`,
  MISS: `fwd=miss`,
  STALE: `hit; fwd=stale`
};
var setCacheStatusHeader = (headers, nextCache) => {
  if (typeof nextCache === "string") {
    if (nextCache in NEXT_CACHE_TO_CACHE_STATUS) {
      const cacheStatus = NEXT_CACHE_TO_CACHE_STATUS[nextCache];
      headers.set("cache-status", `"Next.js"; ${cacheStatus}`);
    }
    headers.delete("x-nextjs-cache");
  }
};
export {
  setCacheControlHeaders,
  setCacheStatusHeader,
  setCacheTagsHeaders
};
