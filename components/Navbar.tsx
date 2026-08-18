"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  id: string;
  color: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "projects",
    href: "#projects",
    id: "projects",
    color: "var(--marker)",
    path: "M 14 20 C 12 7, 34 3, 62 3 C 94 3, 115 9, 113 22 C 111 35, 86 41, 52 41 C 18 41, 4 34, 5 21 C 6 10, 22 4.5, 48 4",
  },
  {
    name: "experience",
    href: "#experience",
    id: "experience",
    color: "var(--pen-blue)",
    path: "M 16 22 C 13 8, 38 3, 68 3 C 104 3, 120 10, 118 23 C 116 36, 88 41, 54 41 C 20 41, 4 35, 6 22 C 8 10, 26 4, 54 3.5",
  },
  {
    name: "skills",
    href: "#skills",
    id: "skills",
    color: "var(--marker)",
    path: "M 12 20 C 10 7, 28 3, 52 3 C 82 3, 102 9, 100 22 C 98 35, 76 41, 46 41 C 18 41, 3 34, 5 20 C 6 9, 20 4.5, 42 4",
  },
  {
    name: "competitive",
    href: "#competitive",
    id: "competitive",
    color: "var(--leaf)",
    path: "M 18 22 C 14 8, 44 3, 78 3 C 118 3, 140 10, 138 23 C 136 36, 104 41, 64 41 C 24 41, 4 35, 6 21 C 8 9, 32 4, 62 3.5",
  },
  {
    name: "find me",
    href: "#profiles",
    id: "profiles",
    color: "var(--pen-blue)",
    path: "M 14 20 C 11 7, 30 3, 58 3 C 90 3, 110 9, 108 22 C 106 35, 82 41, 48 41 C 18 41, 4 34, 5 21 C 6 10, 20 4.5, 46 4",
  },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const activeTweenRef = useRef<Map<string, gsap.core.Tween>>(new Map());

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const scrollMid = scrollY + window.innerHeight * 0.35;
      let current = "top";

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          if (scrollMid >= el.offsetTop - 80) {
            current = item.id;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize paths with strokeDasharray and draw active section if present
  useEffect(() => {
    pathRefs.current.forEach((pathEl, id) => {
      if (!pathEl) return;
      const length = pathEl.getTotalLength();
      gsap.set(pathEl, {
        strokeDasharray: length,
        strokeDashoffset: id === activeSection ? 0 : length,
      });
    });
  }, [activeSection]);

  // Animate live pen stroke on hover
  const handleMouseEnter = (id: string) => {
    const pathEl = pathRefs.current.get(id);
    if (!pathEl) return;

    // Kill any existing tween for this path
    const prevTween = activeTweenRef.current.get(id);
    if (prevTween) prevTween.kill();

    const length = pathEl.getTotalLength();

    // Reset to start and physically draw the line around the text
    gsap.set(pathEl, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
    });

    const tween = gsap.to(pathEl, {
      strokeDashoffset: 0,
      duration: 0.45,
      ease: "power2.out",
    });

    activeTweenRef.current.set(id, tween);
  };

  const handleMouseLeave = (id: string) => {
    const pathEl = pathRefs.current.get(id);
    if (!pathEl) return;

    const prevTween = activeTweenRef.current.get(id);
    if (prevTween) prevTween.kill();

    // If it's the active section, leave it drawn; otherwise animate out
    if (id === activeSection) {
      return;
    }

    const length = pathEl.getTotalLength();
    const tween = gsap.to(pathEl, {
      strokeDashoffset: -length,
      duration: 0.28,
      ease: "power1.in",
    });

    activeTweenRef.current.set(id, tween);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2.5 px-4"
          : "border-b-[3px] border-ink bg-paper/95 py-4 px-6 backdrop-blur-sm"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "rough-border rounded-full bg-paper/95 px-5 py-2 shadow-[4px_4px_0_0_var(--ink)] backdrop-blur-md"
            : ""
        }`}
      >
        {/* Logo */}
        <a
          href="#top"
          className="group relative flex items-center font-display text-lg tracking-tight select-none"
        >
          <span className="transition-transform group-hover:-rotate-3">CS</span>
          <span className="text-marker transition-transform group-hover:scale-150">.</span>
        </a>

        {/* Desktop Navigation with GSAP Live-Drawn Hand Circles */}
        <div className="hidden items-center gap-4 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
                className={`relative px-3 py-1.5 font-mono text-[13px] transition-colors select-none ${
                  isActive ? "font-bold text-ink" : "font-medium text-ink-soft hover:text-ink"
                }`}
              >
                {/* SVG Canvas with Hand-Drawn Circle Path */}
                <svg
                  viewBox="0 0 120 44"
                  fill="none"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -inset-x-2 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+16px)] overflow-visible"
                >
                  <path
                    ref={(el) => {
                      if (el) pathRefs.current.set(item.id, el);
                      else pathRefs.current.delete(item.id);
                    }}
                    d={item.path}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ willChange: "stroke-dashoffset" }}
                  />
                </svg>

                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Contact Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="rough-border relative overflow-hidden bg-marker px-3.5 py-1.5 font-mono text-xs font-bold text-paper transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--ink)]"
          >
            say hi
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rough-border flex h-8 w-8 items-center justify-center bg-paper p-1 text-ink transition md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="rough-border mt-3 overflow-hidden rounded-2xl bg-paper p-5 shadow-[5px_5px_0_0_var(--ink)] md:hidden">
          <div className="flex flex-col gap-3 font-mono text-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between border-b border-ink/10 py-2 transition-colors ${
                    isActive ? "font-bold text-marker" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="font-hand text-lg text-marker">✦ active</span>}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
