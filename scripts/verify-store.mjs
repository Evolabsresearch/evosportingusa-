import { appendFileSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const outDir = join(process.cwd(), "verification");

async function expectVisible(page, selector, label) {
  try {
    // Target the first *visible* match so hidden mega-nav/menu copies that
    // share text with page content don't shadow the real element.
    await page.locator(selector).filter({ visible: true }).first().waitFor({ state: "visible", timeout: 5000 });
  } catch {
    throw new Error(`${label} was not visible`);
  }
}

async function expectNoHorizontalOverflow(page, label) {
  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  if (metrics.scrollWidth > metrics.clientWidth + 2) {
    throw new Error(
      `${label} has horizontal overflow: ${metrics.scrollWidth}px content in ${metrics.clientWidth}px viewport`,
    );
  }
}

async function waitForImagePaint(page) {
  await page.evaluate(async () => {
    const images = Array.from(document.images).filter((image) => image.currentSrc);

    await Promise.all(
      images.map(async (image) => {
        if (!image.complete) {
          await Promise.race([
            new Promise((resolve) => {
              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
            }),
            new Promise((resolve) => setTimeout(resolve, 1500)),
          ]);
        }

        if (typeof image.decode === "function") {
          await Promise.race([
            image.decode().catch(() => {}),
            new Promise((resolve) => setTimeout(resolve, 800)),
          ]);
        }
      }),
    );

    await new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
  });
}

async function gotoReady(page, url) {
  const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 1800 }).catch(() => {});
  return response;
}

async function screenshot(page, name) {
  await waitForImagePaint(page);
  await page.screenshot({
    path: join(outDir, `${name}.png`),
    fullPage: true,
  });
}

function step(label) {
  const line = `[store] ${new Date().toISOString()} ${label}`;
  appendFileSync(join(outDir, "store-verifier.log"), `${line}\n`);
  console.log(line);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  writeFileSync(join(outDir, "store-verifier.log"), "");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

    step("home");
    const home = await gotoReady(page, baseUrl);
    if (!home?.ok()) throw new Error(`Home returned ${home?.status()}`);
    await expectVisible(page, "header .evo-logo-full", "header brand logo");
    await expectVisible(page, "footer .evo-logo-full", "footer brand logo");
    await expectVisible(page, ".header-search", "header search bar");
    await expectVisible(page, ".mega-nav", "header category mega-nav");
    await expectVisible(page, "text=Build a setup", "header bundle CTA");
    const iconLinks = await page.locator('link[rel="icon"]').evaluateAll((links) =>
      links.map((link) => ({
        href: link.getAttribute("href") ?? "",
        type: link.getAttribute("type") ?? "",
      })),
    );
    if (!iconLinks.some((link) => link.href.includes("/icon.svg"))) {
      throw new Error("SVG app icon link was not present in the page head");
    }
    await expectVisible(page, "text=Train heavy. Demand more from your gear", "homepage promo hero");
    await expectVisible(page, "text=Shop by category", "homepage category section");
    await expectVisible(page, ".bb-category-tile", "homepage category tiles");
    await expectVisible(page, "text=Bestsellers", "homepage bestsellers rail");
    await expectVisible(page, ".product-card", "homepage product cards");
    await expectVisible(page, "text=Build your setup in one cart", "homepage bundle promo band");
    await expectVisible(page, "text=New in the rack", "homepage new arrivals rail");
    await page.locator(".email-capture-popup").waitFor({ state: "visible", timeout: 5000 });
    await expectVisible(page, ".email-capture-popup", "email capture discount popup");
    await page.locator(".email-capture-popup input[type='email']").fill("lifter@example.test");
    await page.getByRole("button", { name: /get evo20/i }).click();
    await expectVisible(page, ".email-capture-code", "email capture code reveal");
    await expectVisible(page, "text=EVO20", "email capture discount code");
    await screenshot(page, "email-capture-popup-desktop");
    await page.locator(".email-capture-close").click();
    await page.locator(".email-capture-popup").waitFor({ state: "hidden", timeout: 1500 }).catch(() => {});
    await screenshot(page, "home-desktop");

    step("about");
    await gotoReady(page, `${baseUrl}/about`);
    await expectVisible(page, "text=Rack-ready equipment for rooms that actually get used", "about hero heading");
    await expectVisible(page, "text=Find the seller details without digging", "about store details");
    await expectVisible(page, "text=Merchant details", "about merchant link");
    await screenshot(page, "about");

    step("collections");
    await gotoReady(page, `${baseUrl}/collections`);
    await expectVisible(page, "text=Gear for the stations in your room", "collections hero heading");
    await expectVisible(page, "text=Rack sections", "collections setup heading");
    await expectVisible(page, "text=Shop the rack by section", "collections aisle heading");
    await expectVisible(page, ".collections-aisle-card", "visual collection aisle cards");
    await expectVisible(page, "text=Popular gear", "collections product grid heading");
    await screenshot(page, "collections");

    step("collection detail");
    await gotoReady(page, `${baseUrl}/collections/straps-grips`);
    await expectVisible(page, "#main-content >> text=Straps & Grips", "collection detail heading");
    await expectVisible(page, "text=Shop the section", "collection section heading");
    await expectVisible(page, ".collection-detail-shot", "collection detail product media");
    await expectVisible(page, ".product-card", "collection detail product cards");
    await screenshot(page, "collection-detail");

    step("search");
    await page.locator(".header-search input[name='q']").fill("strap");
    await page.locator(".header-search button[type='submit']").click();
    await page.waitForURL(/\/search/);
    await expectVisible(page, "text=Find the right training gear", "search page heading");
    await page.getByRole("searchbox", { name: /gear search/i }).fill("deadlift strap");
    await page.locator("#main-content").getByRole("button", { name: /^search$/i }).click();
    await page.waitForURL(/\/search\?q=deadlift\+strap/);
    await expectVisible(page, "text=matches for", "search result count");
    await expectVisible(page, ".product-card", "search product cards");
    await expectVisible(page, "text=dense cotton webbing", "product card material cue");
    await screenshot(page, "search-results");

    step("product detail");
    await gotoReady(page, `${baseUrl}/products/evo-deadlift-support-training-bundle`);
    await expectVisible(page, "h1", "product heading");
    await expectVisible(page, "text=Fit check", "product fit note");
    await expectVisible(page, "text=In the box", "product package note");
    await expectVisible(page, "text=Lifting belt, figure-8 straps", "product concrete contents");
    await expectVisible(page, "text=Care notes", "product care note");
    await expectVisible(page, "text=Why the bundle works", "product value section heading");
    await expectVisible(page, "text=Includes", "product value panel");
    await expectVisible(page, "#main-content >> text=Storage", "product storage panel");
    await expectVisible(page, "text=At a glance", "product facts");
    await page.getByRole("button", { name: /add to cart/i }).click();
    await screenshot(page, "product-detail");

    step("tall product");
    await gotoReady(page, `${baseUrl}/products/evo-sleeve-care-spray-equipment-care-kit`);
    await expectVisible(page, "h1", "tall product heading");
    await screenshot(page, "product-detail-tall");

    step("cart recommendations");
    await page.evaluate(() => {
      window.localStorage.setItem(
        "evo-sporting-usa-cart",
        JSON.stringify([{ slug: "evo-cotton-lifting-strap-pair", quantity: 1 }]),
      );
    });
    await gotoReady(page, `${baseUrl}/cart`);
    await expectVisible(page, "text=Flat standard shipping", "cart shipping rate");
    await expectVisible(page, "#main-content >> text=Order summary", "cart summary");
    await expectVisible(page, "text=Round out the setup", "cart add-ons");
    await screenshot(page, "cart-recommendations");

    step("cart bundle");
    await page.evaluate(() => {
      window.localStorage.setItem(
        "evo-sporting-usa-cart",
        JSON.stringify([{ slug: "evo-deadlift-support-training-bundle", quantity: 1 }]),
      );
    });
    await gotoReady(page, `${baseUrl}/cart`);
    await expectVisible(page, "text=Flat standard shipping", "cart shipping rate");
    await expectVisible(page, "text=No order minimum", "cart no minimum shipping copy");
    await expectVisible(page, "text=Recommended gear", "cart pairings");
    await screenshot(page, "cart");

    step("empty cart");
    await page.evaluate(() => {
      window.localStorage.setItem("evo-sporting-usa-cart", JSON.stringify([]));
    });
    await gotoReady(page, `${baseUrl}/cart`);
    await expectVisible(page, "text=Good places to start", "empty cart starting routes");
    await screenshot(page, "cart-empty");

    step("checkout step one");
    await page.evaluate(() => {
      window.localStorage.setItem(
        "evo-sporting-usa-cart",
        JSON.stringify([{ slug: "evo-deadlift-support-training-bundle", quantity: 1 }]),
      );
    });
    await gotoReady(page, `${baseUrl}/checkout`);
    await expectVisible(page, "text=Step 1 of 2", "checkout step one");
    await screenshot(page, "checkout-step-one");
    await page.getByLabel("Email").fill("buyer@example.test");
    await page.getByLabel("Phone").fill("5550100123");
    await page.getByLabel("First name").fill("Jordan");
    await page.getByLabel("Last name").fill("Rivera");
    await page.getByLabel("Address").fill("1200 Training Way");
    await page.getByLabel("City").fill("Columbus");
    await page.getByLabel("State", { exact: true }).fill("OH");
    await page.getByLabel("ZIP").fill("43215");
    await page.getByRole("button", { name: /continue to payment/i }).click();

    await page.waitForURL(`${baseUrl}/checkout/payment`);
    await expectVisible(page, "text=Step 2 of 2", "checkout step two");
    await expectVisible(page, "text=buyer@example.test", "checkout contact review");
    await expectVisible(page, "text=1200 Training Way", "checkout shipping review");
    await expectVisible(page, "text=Secure payment", "payment provider slot");
    await expectVisible(page, "text=No card data stored here", "payment checks");
    await expectVisible(page, "text=supplied by the payment provider", "payment provider data handling");
    await expectVisible(page, "text=Pay securely", "payment action");
    await screenshot(page, "checkout-step-two");

    step("support");
    await gotoReady(page, `${baseUrl}/support`);
    await expectVisible(page, "text=Order help, returns, and warranty", "support heading");
    await expectVisible(page, "text=Store policies", "store policies");
    await expectVisible(page, "text=Merchant details", "merchant details link");
    await screenshot(page, "support");

    step("faq");
    await gotoReady(page, `${baseUrl}/support/faq`);
    await expectVisible(page, "text=Give us the details that answer the first question", "faq support desk");
    await expectVisible(page, "text=Regional US fulfillment partners handle accessories", "faq first answer");
    await screenshot(page, "faq");

    step("merchant details");
    await gotoReady(page, `${baseUrl}/support/merchant-details`);
    await expectVisible(page, "text=Who sells and supports the gear", "merchant details heading");
    await expectVisible(page, "text=Secure payment fields", "payment handling detail");
    await expectVisible(page, "text=Policies", "published terms");
    await screenshot(page, "merchant-details");

    step("shipping policy");
    await gotoReady(page, `${baseUrl}/policies/shipping-policy`);
    await expectVisible(page, "text=Policy notes", "shipping policy workflow");
    await expectVisible(page, "text=If tracking stalls", "shipping policy detail");
    await screenshot(page, "policy-shipping");

    step("support contact");
    await gotoReady(page, `${baseUrl}/support/contact`);
    await expectVisible(page, "text=How can we help?", "contact form heading");
    await screenshot(page, "support-contact");
    await page.getByLabel("Name").fill("Jordan Rivera");
    await page.getByLabel("Reply address").fill("buyer@example.test");
    await page.getByLabel("Order number").fill("AXS-10001");
    await page.getByLabel("Message").fill("Can you confirm the return process for my lifting belt?");
    await page.getByRole("button", { name: /create draft/i }).click();
    await expectVisible(page, "text=draft ready", "prepared support email");
    await screenshot(page, "support-contact-prepared");

    step("track order");
    await gotoReady(page, `${baseUrl}/track-order`);
    await expectVisible(page, "text=Track your order", "track order heading");
    await expectVisible(page, "text=Before you look it up", "tracking lookup notes");
    await page.getByLabel("Order number").fill("AXS-10001");
    await page.getByLabel("Email").fill("buyer@example.test");
    await page.getByRole("button", { name: /look up order/i }).click();
    await expectVisible(page, "text=Email draft ready", "tracking request result");
    await screenshot(page, "track-order");

    step("mobile home");
    await page.setViewportSize({ width: 390, height: 900 });
    await gotoReady(page, baseUrl);
    await expectVisible(page, "text=Shop all gear", "mobile hero button");
    await expectVisible(page, "text=Train heavy. Demand more from your gear", "mobile hero heading");
    await expectVisible(page, "text=Shop by category", "mobile category section");
    await expectNoHorizontalOverflow(page, "mobile home");
    await screenshot(page, "home-mobile");

    step("mobile about");
    await gotoReady(page, `${baseUrl}/about`);
    await expectVisible(page, "text=Find the seller details without digging", "mobile about store details");
    await expectNoHorizontalOverflow(page, "mobile about");
    await screenshot(page, "about-mobile");

    step("mobile refund policy");
    await gotoReady(page, `${baseUrl}/policies/refund-policy`);
    await expectVisible(page, "text=Policy notes", "mobile refund policy workflow");
    await expectVisible(page, "text=Before starting", "mobile refund policy detail");
    await expectNoHorizontalOverflow(page, "mobile refund policy");
    await screenshot(page, "policy-refund-mobile");

    step("mobile faq");
    await gotoReady(page, `${baseUrl}/support/faq`);
    await expectVisible(page, "text=Give us the details that answer the first question", "mobile faq support desk");
    await expectVisible(page, "text=Regional US fulfillment partners handle accessories", "mobile faq first answer");
    await expectNoHorizontalOverflow(page, "mobile faq");
    await screenshot(page, "faq-mobile");

    step("mobile collections");
    await gotoReady(page, `${baseUrl}/collections`);
    await expectVisible(page, "text=Gear for the stations in your room", "mobile collections hero");
    await expectVisible(page, ".collections-aisle-card", "mobile visual collection aisle cards");
    await expectNoHorizontalOverflow(page, "mobile collections");
    await screenshot(page, "collections-mobile");

    step("mobile collection detail");
    await gotoReady(page, `${baseUrl}/collections/straps-grips`);
    await expectVisible(page, ".collection-detail-shot", "mobile collection detail media");
    await expectNoHorizontalOverflow(page, "mobile collection detail");
    await screenshot(page, "collection-detail-mobile");

    step("mobile product");
    await gotoReady(page, `${baseUrl}/products/evo-deadlift-support-training-bundle`);
    await expectVisible(page, "text=Fit check", "mobile product fit note");
    await expectVisible(page, "text=At a glance", "mobile product facts");
    await expectNoHorizontalOverflow(page, "mobile product detail");
    await screenshot(page, "product-detail-mobile");

    step("mobile cart");
    await gotoReady(page, `${baseUrl}/cart`);
    await expectVisible(page, "text=Review your gear", "mobile cart heading");
    await expectVisible(page, "text=Recommended gear", "mobile cart add-ons");
    await expectNoHorizontalOverflow(page, "mobile cart");
    await screenshot(page, "cart-mobile");

    step("mobile checkout step one");
    await gotoReady(page, `${baseUrl}/checkout`);
    await expectVisible(page, "text=Step 1 of 2", "mobile checkout step one");
    await expectNoHorizontalOverflow(page, "mobile checkout step one");
    await screenshot(page, "checkout-step-one-mobile");

    step("mobile checkout step two");
    await gotoReady(page, `${baseUrl}/checkout/payment`);
    await expectVisible(page, "text=Secure payment", "mobile checkout payment card entry");
    await expectVisible(page, "text=Pay securely", "mobile checkout payment provider");
    await expectNoHorizontalOverflow(page, "mobile checkout step two");
    await screenshot(page, "checkout-step-two-mobile");

    step("mobile support");
    await gotoReady(page, `${baseUrl}/support`);
    await expectVisible(page, "text=Send a Message", "mobile support action");
    await expectNoHorizontalOverflow(page, "mobile support");
    await screenshot(page, "support-mobile");

    console.log("Store verification passed. Screenshots saved to verification/.");
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
