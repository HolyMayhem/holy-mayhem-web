import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, extname, sep } from "node:path";
const design = resolve(fileURLToPath(new URL(".", import.meta.url)));
const exported = resolve(design, "../../out");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
};
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    const isDesign = ["/", "/preview.css", "/preview.js"].includes(path);
    const root = isDesign ? design : exported;
    let file =
      path === "/hero.html"
        ? resolve(exported, "ru/index.html")
        : resolve(root, "." + (path === "/" ? "/index.html" : path));
    if (file !== root && !file.startsWith(root + sep))
      throw Error("Invalid path");
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const data = await readFile(file);
    res.writeHead(200, {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(
      path === "/hero.html"
        ? data.toString().replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
        : data,
    );
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(4175, "127.0.0.1", () =>
  console.log("Hero alternatives: http://localhost:4175/"),
);
