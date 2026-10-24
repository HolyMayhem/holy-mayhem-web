const frame = document.querySelector("#site-preview");
const stage = document.querySelector(".preview-stage");
const labels = {
  cross: "Стеклянный крест",
  mobius: "Лента Мёбиуса",
  waves: "Поле волн",
};
const notes = {
  cross:
    "Крест из вашего изображения. На первом экране он становится главным визуальным знаком бренда.",
  mobius:
    "Мой фаворит для абстрактной графики: лента поддерживает технический характер сайта и оставляет акцент на названии.",
  waves:
    "Самый спокойный вариант. Линейная поверхность мягко меняется, не отвлекая от текста и проектов.",
};
let variant = new URLSearchParams(location.search).get("variant") || "cross";
if (!(variant in labels)) variant = "cross";
let paused = matchMedia("(prefers-reduced-motion: reduce)").matches;
let object;
let paths = [];
let phase = 0;
let last = 0;
let resizeObserver;
const ns = "http://www.w3.org/2000/svg";

const previewStyles = `
  html,body{overflow:hidden!important;scroll-behavior:auto!important}
  main > :not(.hero),.footer,.skip-link{display:none!important}
  .orbit{opacity:1!important}
  .orbit svg{animation:none!important}
  .concept-cross{display:flex;align-items:center;justify-content:center;perspective:1000px}
  .concept-cross img{width:66%;height:88%;object-fit:contain;transform:translate(8%,0);animation:cross-float 10s ease-in-out infinite;will-change:transform}
  .concept-cross:before{content:'';position:absolute;inset:17%;background:radial-gradient(ellipse,#5257760f,transparent 72%)}
  .concept-paused img{animation-play-state:paused!important}
  .concept-mobius svg,.concept-waves svg{width:100%;height:100%;overflow:visible}
  @keyframes cross-float{0%,100%{transform:translate(8%,0) rotate(-1deg)}50%{transform:translate(8%,-7px) rotate(1deg)}}
  @media(max-width:600px){.concept-cross img{width:68%;height:89%;transform:translate(9%,0)}.concept-cross{opacity:.72}.concept-mobius,.concept-waves{opacity:.75!important}}
  @media(prefers-reduced-motion:reduce){.concept-cross img{animation:none!important}}
`;

function fitFrame() {
  const hero = frame.contentDocument?.querySelector(".hero");
  if (hero)
    frame.style.height = `${Math.ceil(hero.getBoundingClientRect().bottom + 12)}px`;
}

function createPath(svg, kind, value) {
  const path = frame.contentDocument.createElementNS(ns, "path");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "url(#concept-gradient)");
  path.setAttribute("stroke-width", kind === "cross-section" ? ".55" : ".85");
  svg.append(path);
  paths.push({ path, kind, value });
}

function mountConcept() {
  const doc = frame.contentDocument;
  object = doc?.querySelector(".orbit");
  if (!object) return;
  object.innerHTML = "";
  object.className = `orbit concept-${variant}${paused ? " concept-paused" : ""}`;
  paths = [];
  phase = 0;
  if (variant === "cross") {
    const image = doc.createElement("img");
    image.src = "/images/brand/glass-cross.png";
    image.alt = "";
    image.width = 843;
    image.height = 1172;
    object.append(image);
  } else {
    const svg = doc.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 520 520");
    svg.innerHTML = `<defs><linearGradient id="concept-gradient" x1="80" y1="60" x2="430" y2="460" gradientUnits="userSpaceOnUse"><stop stop-color="#d1c9ef"/><stop offset=".5" stop-color="#9d94be"/><stop offset="1" stop-color="#6e668a"/></linearGradient></defs>`;
    object.append(svg);
    const count = variant === "mobius" ? 29 : 35;
    for (let i = 0; i < count; i++)
      createPath(svg, "longitudinal", -1 + (2 * i) / (count - 1));
    const crossCount = variant === "mobius" ? 40 : 21;
    for (let i = 0; i < crossCount; i++)
      createPath(svg, "cross-section", i / crossCount);
    renderGeometry();
  }
  document
    .querySelectorAll("[data-variant]")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.variant === variant),
      ),
    );
  document.querySelector("#current-label").textContent = labels[variant];
  document.querySelector("#variant-note").textContent = notes[variant];
  updatePause();
  fitFrame();
}

function project(x, y, z, pitch, yaw, roll, scale = 1) {
  const x1 = x * Math.cos(yaw) + z * Math.sin(yaw);
  const z1 = -x * Math.sin(yaw) + z * Math.cos(yaw);
  const y1 = y * Math.cos(pitch) - z1 * Math.sin(pitch);
  const z2 = y * Math.sin(pitch) + z1 * Math.cos(pitch);
  return [
    260 + scale * (x1 * Math.cos(roll) - y1 * Math.sin(roll)),
    260 + scale * (x1 * Math.sin(roll) + y1 * Math.cos(roll)),
    z2,
  ];
}
function mobius(u, v) {
  const t = u * 2 * Math.PI;
  const width = v * 52;
  const radius = 149 + width * Math.cos(t / 2);
  return project(
    radius * Math.cos(t),
    radius * Math.sin(t),
    width * Math.sin(t / 2),
    0.87,
    -0.37 + phase * 0.12,
    -0.36,
    1.15,
  );
}
function wave(u, v) {
  const height =
    22 * Math.sin(u * 3.8 + v * 1.8 + phase * 0.65) +
    15 * Math.cos(v * 3.4 - phase * 0.32) +
    7 * Math.sin(u * 1.6 - v * 2.5 + phase * 0.3);
  return project(u * 195, height, v * 160, 1.02, -0.12, -0.28, 1.05);
}
function renderGeometry() {
  for (const { path, kind, value } of paths) {
    const points = [];
    const segments = kind === "longitudinal" ? 120 : 40;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      if (variant === "mobius")
        points.push(
          kind === "longitudinal"
            ? mobius(t, value)
            : mobius(value, -1 + 2 * t),
        );
      else
        points.push(
          kind === "longitudinal"
            ? wave(-1 + 2 * t, value)
            : wave(-1 + 2 * value, -1 + 2 * t),
        );
    }
    path.setAttribute(
      "d",
      points
        .map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)},${p[1].toFixed(2)}`)
        .join(""),
    );
    const depth = points.reduce((sum, p) => sum + p[2], 0) / points.length;
    const opacity =
      variant === "mobius"
        ? 0.32 + Math.max(-0.15, Math.min(0.29, depth / 450))
        : 0.22 + (value + 1) * 0.085;
    path.setAttribute(
      "stroke-opacity",
      (kind === "cross-section" ? opacity * 0.65 : opacity).toFixed(3),
    );
  }
}
function updatePause() {
  object?.classList.toggle("concept-paused", paused);
  const button = document.querySelector("#pause");
  button.setAttribute("aria-pressed", String(paused));
  button.textContent = paused ? "Продолжить" : "Пауза";
}
function animate(now) {
  if (!last) last = now;
  if (now - last > 33) {
    const elapsed = Math.min(now - last, 80) / 1000;
    last = now;
    if (!paused && !document.hidden && variant !== "cross" && paths.length) {
      phase += elapsed;
      renderGeometry();
    }
  }
  requestAnimationFrame(animate);
}
frame.addEventListener("load", async () => {
  const doc = frame.contentDocument;
  const style = doc.createElement("style");
  style.textContent = previewStyles;
  doc.head.append(style);
  await doc.fonts.ready;
  mountConcept();
  resizeObserver?.disconnect();
  resizeObserver = new ResizeObserver(fitFrame);
  resizeObserver.observe(doc.querySelector(".hero"));
});
document.querySelectorAll("[data-variant]").forEach((button) =>
  button.addEventListener("click", () => {
    variant = button.dataset.variant;
    history.replaceState(null, "", `?variant=${variant}`);
    mountConcept();
  }),
);
document.querySelectorAll("[data-device]").forEach((button) =>
  button.addEventListener("click", () => {
    stage.dataset.device = button.dataset.device;
    document
      .querySelectorAll("[data-device]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
  }),
);
document.querySelector("#pause").addEventListener("click", () => {
  paused = !paused;
  updatePause();
});
matchMedia("(prefers-reduced-motion: reduce)").addEventListener(
  "change",
  (event) => {
    paused = event.matches;
    updatePause();
  },
);
requestAnimationFrame(animate);
