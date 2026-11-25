import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "assets", "images", "projects");

const shots = [
  {
    file: "geneva-aq.png",
    url: "https://geneva-dashboard-demo-589767316676.us-east1.run.app/",
    waitMs: 8000,
    fullPage: false,
  },
  {
    file: "it-stinks.png",
    url: "https://itstinks.org/",
    waitMs: 3000,
    fullPage: false,
  },
  {
    file: "bpg-web.png",
    url: "https://www.blueprintgeneva.org/home",
    waitMs: 4000,
    fullPage: false,
  },
  {
    file: "gis-town.png",
    url: "https://townofgenevany.gov/departments_and_services/economic_development.php",
    waitMs: 5000,
    fullPage: true,
  },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

for (const shot of shots) {
  try {
    await page.goto(shot.url, { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForTimeout(shot.waitMs);
    await page.screenshot({
      path: path.join(outDir, shot.file),
      fullPage: shot.fullPage,
    });
    console.log("ok", shot.file);
  } catch (e) {
    console.error("fail", shot.file, e.message);
  }
}

await browser.close();