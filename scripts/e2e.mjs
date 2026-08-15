import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");

const PORT = Number(process.env.PORT || 3111);
const BASE = `http://localhost:${PORT}`;
const NEXT_BIN = require.resolve("next/dist/bin/next");
let server;

function waitForPort(port, timeoutMs) {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const tryConnect = () => {
      const socket = net.connect(port, "127.0.0.1");
      socket.once("connect", () => {
        socket.destroy();
        resolve();
      });
      socket.once("error", () => {
        socket.destroy();
        if (Date.now() - started > timeoutMs) {
          reject(new Error(`Server did not start on port ${port} within ${timeoutMs}ms`));
        } else {
          setTimeout(tryConnect, 500);
        }
      });
    };
    tryConnect();
  });
}

(async () => {
  server = spawn(process.execPath, [NEXT_BIN, "start", "--port", String(PORT)], {
    cwd: path.join(import.meta.dirname, ".."),
    stdio: "ignore",
  });
  try {
    await waitForPort(PORT, 90000);
  } catch (cause) {
    server.kill();
    console.error("FAILED:", cause.message);
    process.exit(1);
  }

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text().slice(0, 200));
  });
  page.on("pageerror", (err) => errors.push("PAGEERROR: " + err.message.slice(0, 200)));

  await page.goto(`${BASE}/`, { waitUntil: "load" });

  console.log("== LANGUAGE BUTTONS ==");
  const heroBefore = (await page.locator("[data-hero-title]").innerText())
    .replace(/\s+/g, " ")
    .trim();
  await page.locator("button", { hasText: "en" }).first().click();
  await page.waitForTimeout(300);
  const heroEn = (await page.locator("[data-hero-title]").innerText())
    .replace(/\s+/g, " ")
    .trim();
  const htmlLang = await page.evaluate(() => document.documentElement.lang);
  console.log("before:", heroBefore.slice(0, 50));
  console.log("after EN:", heroEn.slice(0, 50));
  console.log("html lang:", htmlLang, "| switched:", heroBefore !== heroEn && htmlLang === "en");

  console.log("== CONTACT FORM ==");
  await page.evaluate(() => document.querySelector("#contact")?.scrollIntoView());
  await page.waitForTimeout(600);
  await page.fill("#cf-name", "Maria Silva");
  await page.fill("#cf-email", "maria@exemplo.com");
  await page.selectOption("#cf-type", "website");
  await page.selectOption("#cf-budget", "medium");
  await page.fill("#cf-message", "Preciso de um site institucional com blog e painel admin.");
  await page.click("button[type=submit]");
  await page.waitForTimeout(1500);
  const success = await page
    .locator("role=status")
    .waitFor({ timeout: 8000 })
    .then(() => true)
    .catch(() => false);
  const successText = success
    ? await page.locator("role=status").innerText()
    : "NOT FOUND";
  console.log("success state visible:", success, "|", successText.slice(0, 60));

  console.log("== VALIDATION ==");
  await page.click("button:has-text('Send another')");
  await page.waitForTimeout(300);
  await page.fill("#cf-name", "");
  await page.fill("#cf-email", "not-an-email");
  await page.click("button[type=submit]");
  await page.waitForTimeout(300);
  const invalid = await page.locator("text=Invalid email address").count();
  const required = await page.locator("text=Required").count();
  console.log("validation errors shown:", invalid + required);

  console.log("== ADMIN PANEL ==");
  await page.goto(`${BASE}/admin`, { waitUntil: "load" });
  await page.fill("#admin-pass", "wrong-pass");
  await page.click("button[type=submit]");
  await page.waitForTimeout(600);
  const wrongPass = await page.locator("text=Senha incorreta").count();
  console.log("wrong password rejected:", wrongPass > 0);

  await page.fill("#admin-pass", "snow0192");
  await page.click("button[type=submit]");
  await page.waitForTimeout(900);
  const requestCard = await page.locator("article").count();
  const unreadBadge = await page.locator("text=Nova").count();
  console.log("login ok, cards:", requestCard, "| unread badges:", unreadBadge);

  await page.click("button:has-text('Marcar como lida')");
  await page.waitForTimeout(500);
  const afterRead = await page.locator("text=Nova").count();
  console.log("after mark-read, unread badges:", afterRead);

  page.once("dialog", (dialog) => dialog.accept());
  await page.click("button:has-text('Excluir')");
  await page.waitForTimeout(700);
  const afterDelete = await page.locator("article").count();
  console.log("after delete, cards:", afterDelete);

  console.log("== MOBILE LANG ==");
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(`${BASE}/`, { waitUntil: "load" });
  await mobile.click("button[aria-label='Menu']");
  await mobile.waitForTimeout(400);
  await mobile.locator("button:visible", { hasText: "en" }).first().click();
  await mobile.waitForTimeout(300);
  const mobileLang = await mobile.evaluate(() => document.documentElement.lang);
  const mobileHero = await mobile.locator("[data-hero-title]").innerText();
  console.log("mobile html lang:", mobileLang, "| en:", mobileHero.includes("interface"));
  await mobile.close();

  console.log("== ANIMATIONS ==");
  await page.goto(`${BASE}/`, { waitUntil: "load" });
  const marqueeCount = await page.locator("text=Developer Tools").count();
  const gridAnim = await page.evaluate(() => {
    const el = document.querySelector(".grid-lines");
    return el ? getComputedStyle(el).animationName : "none";
  });
  console.log("marquee instances:", marqueeCount, "| grid animation:", gridAnim);

  console.log("== CONSOLE ERRORS ==");
  console.log(errors.length ? errors.join(" | ") : "none");

  await browser.close();
  server.kill();
})().catch((e) => {
  console.error("FAILED:", e.message);
  server?.kill();
  process.exit(1);
});