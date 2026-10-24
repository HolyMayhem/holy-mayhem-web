import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 3,
  use: {
    baseURL: "http://localhost:4173",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "PORT=4173 npm run preview",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
  },
  reporter: [["list"], ["html", { open: "never" }]],
});
