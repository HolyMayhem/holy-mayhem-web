import { test, expect } from "@playwright/test";
import { brandAssets } from "../src/config/brand";
import AxeBuilder from "@axe-core/playwright";
const slugs = ["torrserve-silicon", "torrframe", "holyvpn"];
for (const locale of ["ru", "en"]) {
  test(`${locale}: routes, assets, metadata and no runtime errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    for (const suffix of [
      "",
      "projects/",
      ...slugs.map((slug) => `projects/${slug}/`),
    ]) {
      const path = `/${locale}/${suffix}`;
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `http://localhost:3000${path}`,
      );
      expect(
        await page.locator('link[rel="alternate"][hreflang]').count(),
      ).toBe(3);
      expect(
        await page.locator('meta[property="og:title"]').getAttribute("content"),
      ).toBeTruthy();
      await page.locator("img").evaluateAll((images) =>
        Promise.all(
          images.map((image) => {
            if (image instanceof HTMLImageElement) {
              image.loading = "eager";
              return image.decode().catch(() => {});
            }
          }),
        ),
      );
      expect(
        await page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (image) =>
                image instanceof HTMLImageElement &&
                image.complete &&
                image.naturalWidth > 0,
            ),
          ),
      ).toBe(true);
    }
    expect(errors).toEqual([]);
  });
  test(`${locale}: filters and project navigation`, async ({ page }) => {
    await page.goto(`/${locale}/projects/`);
    await page
      .getByRole("button", {
        name: locale === "ru" ? "Сервисы 1" : "Services 1",
      })
      .click();
    await expect(page.locator(".project-card")).toHaveCount(1);
    await expect(page.locator(".project-card h3")).toHaveText("HolyVPN");
    await page.locator(".project-card").click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/projects/holyvpn/`));
    await expect(
      page.getByRole("heading", {
        name: locale === "ru" ? "Внутри приложения" : "Inside the app",
      }),
    ).toHaveCount(0);
    await page.locator(".back-link").click();
    await page
      .getByRole("button", {
        name: locale === "ru" ? "Приложения 2" : "Apps 2",
      })
      .click();
    await expect(page.locator(".project-card")).toHaveCount(2);
  });
}
test("language switch keeps project and stores preference", async ({
  page,
}) => {
  await page.goto("/ru/projects/torrframe/");
  await page
    .locator(".language-switch")
    .getByRole("link", { name: "EN" })
    .click();
  await expect(page).toHaveURL(/\/en\/projects\/torrframe\//);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.locator(".brand").first().click();
  await expect(page).toHaveURL(/\/en\//);
  await page.goto("/");
  await expect(page).toHaveURL(/\/en\//);
});
test("mobile menu supports focus trap, Escape, and navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ru/");
  const toggle = page.getByRole("button", { name: "Открыть меню" });
  await toggle.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Закрыть меню" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "GitHub" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Закрыть меню" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await dialog.getByRole("link", { name: "Проекты" }).click();
  await expect(page).toHaveURL(/\/ru\/projects\//);
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
for (const width of [360, 390, 768, 1024, 1440]) {
  test(`responsive layout and screenshot at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    for (const path of [
      "/ru/",
      "/en/",
      "/ru/projects/",
      "/en/projects/torrserve-silicon/",
    ]) {
      await page.goto(path);
      await page.locator(".footer").scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
    await page.goto("/ru/");
    await page.locator(".footer").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
  });
}
test("WCAG checks on homepage, catalog, project, and mobile dialog", async ({
  page,
}) => {
  for (const path of ["/ru/", "/en/projects/", "/en/projects/torrframe/"]) {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});
test("static aliases, 404, sitemap and social image", async ({ request }) => {
  for (const path of [
    "/",
    "/projects/",
    ...slugs.map((s) => `/projects/${s}/`),
    "/sitemap.xml",
    "/robots.txt",
    "/images/og-ru.png",
    "/images/og-en.png",
    brandAssets.favicon,
  ])
    expect((await request.get(path)).status()).toBe(200);
  expect((await request.get("/en/projects/unknown/")).status()).toBe(404);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect((sitemap.match(/<loc>/g) || []).length).toBe(10);
});
test("content remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:4173/ru/");
  await expect(
    page.getByRole("heading", { name: "TorrServe Silicon" }),
  ).toBeVisible();
  await expect(page.locator("#about h2")).toBeVisible();
  await context.close();
});

test("404 follows the requested language", async ({ page }) => {
  await page.goto("/en/projects/unknown/");
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "Back home" }).click();
  await expect(page).toHaveURL(/\/en\//);
});

for (const [device, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
] as const) {
  test.describe(`${device}: navigation scroll`, () => {
    test.use({ viewport, reducedMotion: "no-preference" });

    test("project navigation shows the catalog filters at the top", async ({
      page,
    }) => {
      await page.goto("/ru/");
      if (device === "mobile") {
        await page.getByRole("button", { name: "Открыть меню" }).click();
        await page
          .getByRole("dialog")
          .getByRole("link", { name: "Проекты" })
          .click();
      } else {
        await page
          .locator(".desktop-nav")
          .getByRole("link", { name: "Проекты" })
          .click();
      }
      await expect(page).toHaveURL(/\/ru\/projects\/$/);
      await expect(page.locator("h1")).toHaveText("Мои проекты.");
      await expect(page.locator(".catalog-toolbar")).toBeInViewport();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    });

    test("RU/EN switches start the current page at the top", async ({
      page,
    }) => {
      for (const path of ["", "projects/", "projects/torrframe/"]) {
        await page.goto(`/ru/${path}`);
        await page.locator(".footer").scrollIntoViewIfNeeded();
        await page
          .locator(".language-switch")
          .getByRole("link", { name: "EN" })
          .click();
        await expect(page).toHaveURL(new RegExp(`/en/${path}$`));
        await expect(page.locator("html")).toHaveAttribute("lang", "en");
        await expect(page.locator("h1")).toBeInViewport();
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
        await page.locator(".footer").scrollIntoViewIfNeeded();
        await page
          .locator(".language-switch")
          .getByRole("link", { name: "RU" })
          .click();
        await expect(page).toHaveURL(new RegExp(`/ru/${path}$`));
        await expect(page.locator("html")).toHaveAttribute("lang", "ru");
        await expect(page.locator("h1")).toBeInViewport();
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      }
    });
  });
}

test("section anchors keep their offset, language switching clears the anchor", async ({
  page,
}) => {
  await page.goto("/ru/");
  for (const [name, id] of [
    ["Обо мне", "about"],
    ["Связаться", "contact"],
  ]) {
    await page.locator(".desktop-nav").getByRole("link", { name }).click();
    await expect
      .poll(() =>
        page
          .locator(`#${id}`)
          .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
      )
      .toBe(100);
  }
  await page
    .locator(".language-switch")
    .getByRole("link", { name: "EN" })
    .click();
  await expect(page).toHaveURL(/\/en\/$/);
  await expect(page.locator(".hero-title")).toBeInViewport();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});
