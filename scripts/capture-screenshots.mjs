import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "assets", "images", "projects");

/** @type {import('playwright').Page} */
async function captureGeneva(page) {
  await page.goto("https://geneva-dashboard-demo-589767316676.us-east1.run.app/", {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  await page.waitForTimeout(6000);
  const ramp = page.getByRole("button", { name: "Ramp 2166" });
  await ramp.waitFor({ state: "visible", timeout: 30000 });
  await ramp.click();
  await page.waitForFunction(
    () => !document.body?.innerText?.includes("No sensor selected"),
    null,
    { timeout: 30000 },
  );
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outDir, "geneva-aq.png"), fullPage: false });
}

/** @type {import('playwright').Page} */
async function captureItStinks(page) {
  await page.goto("https://itstinks.org/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.getByRole("link", { name: /go to map/i }).click();
  await page.waitForURL(/map\.html/i, { timeout: 30000 });
  await page.waitForTimeout(5000);
  const map = page.locator("#map, .map, [id*='map'], .leaflet-container").first();
  try {
    await map.waitFor({ state: "visible", timeout: 20000 });
  } catch {
    /* fallback: viewport only */
  }
  await page.screenshot({ path: path.join(outDir, "it-stinks.png"), fullPage: false });
}

/** @type {import('playwright').Page} */
async function captureGisTown(page) {
  await page.goto("https://townofgenevany.gov/departments_and_services/economic_development.php", {
    waitUntil: "networkidle",
    timeout: 90000,
  });
  const scrolled = await page.evaluate(() => {
    const embed =
      document.querySelector('iframe[src*="arcgis"]') ||
      document.querySelector('iframe[src*="map"]') ||
      document.querySelector("#map") ||
      document.querySelector(".leaflet-container");
    if (embed) {
      const top = embed.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
      return true;
    }
    window.scrollTo(0, document.body.scrollHeight * 0.55);
    return false;
  });
  await page.waitForTimeout(scrolled ? 3000 : 1500);
  await page.screenshot({ path: path.join(outDir, "gis-town.png"), fullPage: false });
}

/** @type {import('playwright').Page} */
async function captureBpg(page) {
  await page.goto("https://www.blueprintgeneva.org/home", { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: path.join(outDir, "bpg-web.png"), fullPage: false });
}

/**
 * @param {import('playwright').Page} page
 * @param {string} baseUrl
 * @param {{ user: string, pass: string }} creds
 */
async function captureSfgc(page, baseUrl, creds) {
  await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForSelector("#auth-user_id", { timeout: 60000 });
  await page.fill("#auth-user_id", creds.user);
  await page.fill("#auth-user_pwd", creds.pass);
  await page.click("#auth-go_auth");
  await page.waitForSelector("#main_nav", { timeout: 120000 });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: path.join(outDir, "sfgc-internal.png"), fullPage: false });
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const sfgcUrl = process.env.SFGC_CAPTURE_URL || "";
const sfgcUser = process.env.SFGC_CAPTURE_USER || "admin";
const sfgcPass = process.env.SFGC_CAPTURE_PASS || "admin123";

const tasks = [
  { name: "geneva-aq.png", run: () => captureGeneva(page) },
  { name: "it-stinks.png", run: () => captureItStinks(page) },
  { name: "bpg-web.png", run: () => captureBpg(page) },
  { name: "gis-town.png", run: () => captureGisTown(page) },
];

if (sfgcUrl) {
  tasks.push({
    name: "sfgc-internal.png",
    run: () => captureSfgc(page, sfgcUrl, { user: sfgcUser, pass: sfgcPass }),
  });
}

for (const task of tasks) {
  try {
    await task.run();
    console.log("ok", task.name);
  } catch (e) {
    console.error("fail", task.name, e.message);
  }
}

await browser.close();
if (!sfgcUrl) {
  console.warn("skip sfgc-internal.png — set SFGC_CAPTURE_URL (e.g. http://127.0.0.1:8765)");
}