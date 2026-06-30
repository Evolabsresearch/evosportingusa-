"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown, LifeBuoy, Menu, Package, Search, X } from "lucide-react";

export type MobileNavItem = { name: string; slug: string };
export type MobileNavGroup = { label: string; href: string; items: MobileNavItem[] };

export function MobileNav({ groups }: { groups: MobileNavGroup[] }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const close = () => setOpen(false);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        className="mobile-nav-toggle mobile-only"
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu size={22} aria-hidden="true" />
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
        <div className="mobile-drawer-layer">
          <button
            className="mobile-drawer-backdrop"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
          <nav className="mobile-drawer" aria-label="Site menu">
            <div className="mobile-drawer-head">
              <span>Menu</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <form className="mobile-drawer-search" action="/search" role="search">
              <Search size={18} aria-hidden="true" />
              <input type="search" name="q" placeholder="Search gear…" aria-label="Search catalog" />
            </form>

            <Link className="mobile-drawer-primary" href="/collections" onClick={close}>
              All Gear
            </Link>

            <ul className="mobile-drawer-groups">
              {groups.map((group) => {
                const isOpen = expanded === group.label;
                return (
                  <li key={group.label} className={isOpen ? "is-open" : undefined}>
                    <div className="mobile-drawer-group-head">
                      <Link href={group.href} onClick={close}>{group.label}</Link>
                      {group.items.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : group.label)}
                          aria-label={`${isOpen ? "Collapse" : "Expand"} ${group.label}`}
                          aria-expanded={isOpen}
                        >
                          <ChevronDown size={18} aria-hidden="true" />
                        </button>
                      ) : null}
                    </div>
                    {isOpen ? (
                      <ul className="mobile-drawer-sub">
                        {group.items.map((item) => (
                          <li key={item.slug}>
                            <Link href={`/collections/${item.slug}`} onClick={close}>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
              <li>
                <div className="mobile-drawer-group-head">
                  <Link className="mobile-drawer-sale" href="/collections/bundles" onClick={close}>
                    Bundles
                  </Link>
                </div>
              </li>
            </ul>

            <div className="mobile-drawer-utility">
              <Link href="/track-order" onClick={close}>
                <Package size={16} aria-hidden="true" />
                Track order
              </Link>
              <Link href="/support" onClick={close}>
                <LifeBuoy size={16} aria-hidden="true" />
                Help
              </Link>
            </div>
          </nav>
        </div>,
            document.body,
          )
        : null}
    </>
  );
}
