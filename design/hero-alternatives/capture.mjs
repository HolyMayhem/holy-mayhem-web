import { chromium, expect } from "@playwright/test";
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    reducedMotion: "no-preference",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:4175/");
  const inner = page.frameLocator("#site-preview");
  await expect(inner.locator(".concept-cross img")).toBeVisible();
  await inner.locator(".concept-cross img").evaluate((i) => i.decode());
  await page.locator("#pause").click();
  for (const variant of ["cross", "mobius", "waves"]) {
    await page.locator(`[data-variant=${variant}]`).click();
    await expect(inner.locator(`.concept-${variant}`)).toBeVisible();
    if (variant === "cross")
      await inner.locator(".concept-cross img").evaluate((i) => i.decode());
    await page
      .locator("#site-preview")
      .screenshot({
        path: `design/hero-alternatives/previews/${variant}-desktop.png`,
      });
  }
  await page.locator("[data-variant=mobius]").click();
  const path = inner.locator(".concept-mobius path").first();
  const paused = await path.getAttribute("d");
  await page.waitForTimeout(120);
  expect(await path.getAttribute("d")).toBe(paused);
  await page.locator("#pause").click();
  await expect.poll(() => path.getAttribute("d")).not.toBe(paused);
  await page.locator("#pause").click();
  await page.locator("[data-device=mobile]").click();
  await expect
    .poll(() =>
      page
        .locator("#site-preview")
        .evaluate((el) => Math.round(el.getBoundingClientRect().width)),
    )
    .toBe(390);
  await page
    .locator("#site-preview")
    .screenshot({
      path: "design/hero-alternatives/previews/mobius-mobile.png",
    });
  expect(
    await inner
      .locator("html")
      .evaluate((el) => el.scrollWidth <= window.innerWidth),
  ).toBe(true);
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const reduced = await context.newPage();
  await reduced.goto("http://localhost:4175/?variant=waves");
  await expect(reduced.locator("#pause")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(errors).toEqual([]);
  console.log(
    JSON.stringify({
      variants: 3,
      animatedGeometry: "passed",
      pause: "passed",
      mobileWidth: "passed",
      reducedMotion: "passed",
      pageErrors: errors,
    }),
  );
} finally {
  await browser.close();
}
