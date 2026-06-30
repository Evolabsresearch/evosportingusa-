import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

const routes = [
  "/",
  "/collections",
  "/collections/lifting-supports",
  "/products/evo-deadlift-support-training-bundle",
  "/search?q=straps",
  "/cart",
  "/checkout",
  "/checkout/payment",
  "/support",
  "/support/contact",
  "/support/faq",
  "/support/merchant-details",
  "/track-order",
  "/about",
  "/policies/refund-policy",
  "/policies/payment-and-billing",
  "/policies/privacy-policy",
  "/policies/terms-of-service",
  "/policies/shipping-policy",
];

async function evaluateRoute(page) {
  return page.evaluate(() => {
    function isVisible(element) {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity) !== 0 &&
        rect.width > 0 &&
        rect.height > 0
      );
    }

    function labelTextFor(control) {
      if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)) {
        return "";
      }
      const labels = Array.from(control.labels ?? []);
      return labels.map((label) => label.textContent ?? "").join(" ");
    }

    const h1s = Array.from(document.querySelectorAll("h1")).filter(isVisible);
    const images = Array.from(document.querySelectorAll("img"))
      .filter(isVisible)
      .map((node) => ({
        src: node.getAttribute("src") ?? "",
        alt: node.getAttribute("alt") ?? "",
        role: node.getAttribute("role") ?? "",
        ariaHidden: node.getAttribute("aria-hidden") ?? "",
      }))
      .filter((node) => !node.alt.trim() && node.role !== "presentation" && node.ariaHidden !== "true");

    const controls = Array.from(document.querySelectorAll("a[href], button"))
      .filter(isVisible)
      .map((node) => ({
        tag: node.tagName.toLowerCase(),
        href: node instanceof HTMLAnchorElement ? node.getAttribute("href") ?? "" : "",
        text: node.textContent ?? "",
        ariaLabel: node.getAttribute("aria-label") ?? "",
        title: node.getAttribute("title") ?? "",
        alt: node.querySelector("img")?.getAttribute("alt") ?? "",
        value: node instanceof HTMLInputElement ? node.value : "",
        outerHTML: node.outerHTML.slice(0, 220),
      }));

    const unlabeledControls = controls.filter((node) => {
      const name = [
        node.ariaLabel,
        node.title,
        node.alt,
        node.value,
        node.text,
      ]
        .filter(Boolean)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      return !name;
    });

    const formFields = Array.from(document.querySelectorAll("input, select, textarea"))
      .filter((node) => {
        if (!isVisible(node)) return false;
        if (node instanceof HTMLInputElement) {
          return !["hidden", "submit", "button", "reset"].includes(node.type);
        }
        return true;
      })
      .map((node) => ({
        tag: node.tagName.toLowerCase(),
        type: node instanceof HTMLInputElement ? node.type : "",
        name: node.getAttribute("name") ?? "",
        ariaLabel: node.getAttribute("aria-label") ?? "",
        title: node.getAttribute("title") ?? "",
        placeholder: node.getAttribute("placeholder") ?? "",
        labelText: labelTextFor(node),
        outerHTML: node.outerHTML.slice(0, 220),
      }));

    const unlabeledFields = formFields.filter((field) => {
      const name = [field.ariaLabel, field.title, field.labelText]
        .filter(Boolean)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      return !name;
    });

    const documentWidth = Math.ceil(document.documentElement.scrollWidth);
    const viewportWidth = Math.ceil(window.innerWidth);

    return {
      h1Count: h1s.length,
      missingImageAlts: images,
      unlabeledControls,
      unlabeledFields,
      documentWidth,
      viewportWidth,
    };
  });
}

function reportList(items) {
  return items
    .slice(0, 6)
    .map((item) => JSON.stringify(item))
    .join("\n");
}

const failures = [];
const browser = await chromium.launch();

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const mobile = await browser.newPage({ viewport: { width: 390, height: 900 } });

  for (const route of routes) {
    for (const [label, page] of [
      ["desktop", desktop],
      ["mobile", mobile],
    ]) {
      const url = new URL(route, baseUrl).toString();
      const response = await page.goto(url, { waitUntil: "networkidle" });
      if (!response?.ok()) {
        failures.push(`${label} ${route}: HTTP ${response?.status() ?? "no response"}`);
        continue;
      }

      const result = await evaluateRoute(page);
      if (result.h1Count < 1) {
        failures.push(`${label} ${route}: missing visible h1`);
      }
      if (result.missingImageAlts.length) {
        failures.push(`${label} ${route}: images missing alt text\n${reportList(result.missingImageAlts)}`);
      }
      if (result.unlabeledControls.length) {
        failures.push(`${label} ${route}: links/buttons missing accessible names\n${reportList(result.unlabeledControls)}`);
      }
      if (result.unlabeledFields.length) {
        failures.push(`${label} ${route}: form fields missing labels\n${reportList(result.unlabeledFields)}`);
      }
      if (result.documentWidth > result.viewportWidth + 2) {
        failures.push(
          `${label} ${route}: horizontal overflow ${result.documentWidth}px > ${result.viewportWidth}px`,
        );
      }
    }
  }

  await desktop.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  await desktop.keyboard.press("Tab");
  const focusCheck = await desktop.evaluate(() => {
    const active = document.activeElement;
    if (!active) return { ok: false, reason: "no active element" };
    const style = window.getComputedStyle(active);
    return {
      ok: style.outlineStyle !== "none" && Number.parseFloat(style.outlineWidth) > 0,
      tag: active.tagName.toLowerCase(),
      text: active.textContent?.replace(/\s+/g, " ").trim() ?? "",
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });

  if (!focusCheck.ok) {
    failures.push(`desktop /: first keyboard focus has no visible outline ${JSON.stringify(focusCheck)}`);
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`Accessibility verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`\n- ${failure}`);
  }
  process.exit(1);
}

console.log(`Accessibility verification passed: ${routes.length} routes checked on desktop and mobile.`);
