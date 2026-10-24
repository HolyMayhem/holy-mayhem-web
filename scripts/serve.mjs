import { createServer } from "node:http";
import { gzipSync } from "node:zlib";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};
createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", "http://localhost");
    let pathname = decodeURIComponent(url.pathname);
    if (base && pathname !== base && !pathname.startsWith(base + "/"))
      throw new Error("Outside base path");
    if (base) pathname = pathname.slice(base.length) || "/";
    let file = resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + sep))
      throw new Error("Outside export");
    const info = await stat(file);
    if (info.isDirectory()) {
      if (!pathname.endsWith("/")) {
        res.writeHead(308, { Location: `${url.pathname}/${url.search}` });
        res.end();
        return;
      }
      file = resolve(file, "index.html");
    }
    let data = await readFile(file);
    const useGzip =
      /\.(html|js|css|json|txt|xml|svg)$/.test(file) &&
      /\bgzip\b/.test(req.headers["accept-encoding"] || "");
    if (useGzip) data = gzipSync(data);
    res.writeHead(200, {
      ...(useGzip
        ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" }
        : {}),
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    const data = await readFile(resolve(root, "404.html")).catch(() =>
      Buffer.from("Not found"),
    );
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(req.method === "HEAD" ? undefined : data);
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Holy Mayhem preview: http://localhost:${port}${base}/`),
);
