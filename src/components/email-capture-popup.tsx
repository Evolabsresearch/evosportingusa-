"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useMemo, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, Copy, Mail, Percent, ShieldCheck, X } from "lucide-react";
import { promoCode } from "@/lib/promo";
import { storePromoCode } from "./use-promo-code";

const captureStorageKey = "evo-sporting-usa-email-capture-v1";
const captureChangeEvent = "evo-sporting-usa-email-capture-change";

type CaptureRecord = {
  email?: string;
  status: "dismissed" | "claimed";
  savedAt: string;
};

function parseCaptureRecord(value: string) {
  if (!value) return null;

  try {
    return JSON.parse(value) as CaptureRecord;
  } catch {
    return null;
  }
}

function readCaptureSnapshot() {
  try {
    const stored = window.localStorage.getItem(captureStorageKey) ?? "";
    if (stored && !parseCaptureRecord(stored)) {
      window.localStorage.removeItem(captureStorageKey);
      return "";
    }
    return stored;
  } catch {
    return "";
  }
}

function readServerCaptureSnapshot() {
  return "";
}

function emitCaptureChange() {
  window.dispatchEvent(new Event(captureChangeEvent));
}

function subscribeCaptureRecord(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(captureChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(captureChangeEvent, callback);
  };
}

function writeCaptureRecord(record: CaptureRecord) {
  try {
    window.localStorage.setItem(captureStorageKey, JSON.stringify(record));
  } catch {
    window.localStorage.removeItem(captureStorageKey);
  }

  emitCaptureChange();
}

function isQuietPath(pathname: string) {
  return (
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/support") ||
    pathname.startsWith("/policies") ||
    pathname.startsWith("/track-order")
  );
}

export function EmailCapturePopup() {
  const pathname = usePathname();
  const titleId = useId();
  const bodyId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const captureSnapshot = useSyncExternalStore(
    subscribeCaptureRecord,
    readCaptureSnapshot,
    readServerCaptureSnapshot,
  );
  const captureRecord = useMemo(() => parseCaptureRecord(captureSnapshot), [captureSnapshot]);
  const hasClaimed = captureRecord?.status === "claimed";
  const hasDismissed = captureRecord?.status === "dismissed";
  const isQuiet = useMemo(() => isQuietPath(pathname), [pathname]);

  useEffect(() => {
    if (isOpen || isQuiet || hasClaimed || hasDismissed) return undefined;

    const timer = window.setTimeout(() => setIsOpen(true), 3500);
    return () => window.clearTimeout(timer);
  }, [hasClaimed, hasDismissed, isOpen, isQuiet]);

  useEffect(() => {
    if (!isOpen) return undefined;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      if (!hasClaimed) {
        writeCaptureRecord({ status: "dismissed", savedAt: new Date().toISOString() });
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, hasClaimed]);

  function closePopup() {
    setIsOpen(false);
    if (!hasClaimed) {
      writeCaptureRecord({
        status: "dismissed",
        savedAt: new Date().toISOString(),
      });
    }
  }

  function reopenPopup() {
    setIsOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    storePromoCode(promoCode);
    writeCaptureRecord({
      email: trimmedEmail,
      status: "claimed",
      savedAt: new Date().toISOString(),
    });
  }

  async function copyCode() {
    await navigator.clipboard.writeText(promoCode).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  if (isQuiet) return null;

  return (
    <>
      {isOpen ? (
        <div className="email-capture-layer" aria-live="polite">
          <button
            className="email-capture-backdrop"
            type="button"
            onClick={closePopup}
            aria-label="Close email offer"
          />
          <section
            className="email-capture-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={bodyId}
          >
            <button
              className="email-capture-close"
              type="button"
              onClick={closePopup}
              aria-label="Close email offer"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <div className="email-capture-photo" aria-hidden="true">
              <span>20% off</span>
            </div>
            <div className="email-capture-copy">
              <p className="email-capture-kicker">
                <Percent size={16} aria-hidden="true" />
                First order code
              </p>
              <h2 id={titleId}>Take 20% off your first EVO setup.</h2>
              <p id={bodyId}>
                Use the code on the straps, bars, dumbbells, supports, or bench gear already on
                your list.
              </p>
              {hasClaimed ? (
                <div className="email-capture-code" role="status">
                  <CheckCircle2 size={20} aria-hidden="true" />
                  <span>Your Code</span>
                  <strong>{promoCode}</strong>
                  <button className="button button-dark button-compact" type="button" onClick={copyCode}>
                    <Copy size={16} aria-hidden="true" />
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <Link className="button button-soft button-compact" href="/collections">
                    Shop Gear
                  </Link>
                </div>
              ) : (
                <form className="email-capture-form" onSubmit={handleSubmit}>
                  <label>
                    Email
                    <span>
                      <Mail size={16} aria-hidden="true" />
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </span>
                  </label>
                  <button className="button button-dark" type="submit">
                    Get {promoCode}
                  </button>
                  <small>
                    <ShieldCheck size={14} aria-hidden="true" />
                    Restock notes and gear emails. Unsubscribe anytime.
                  </small>
                </form>
              )}
            </div>
          </section>
        </div>
      ) : !hasClaimed && hasDismissed ? (
        <button className="email-capture-tab" type="button" onClick={reopenPopup}>
          <Percent size={15} aria-hidden="true" />
          20% off
        </button>
      ) : null}
    </>
  );
}
