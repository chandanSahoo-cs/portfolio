"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/audio";

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
    color: "var(--marker)",
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
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const hoveredRef = useRef<string | null>(null);
  const isNavigatingRef = useRef<string | null>(null);
  const navigateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const activeTweenRef = useRef<Map<string, gsap.core.Tween>>(new Map());

  // Initialize sound state from soundManager
  useEffect(() => {
    setSoundEnabled(soundManager.isEnabled());
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setEnabled(next);
    if (next) soundManager.playClick();
  };

  // Smooth drawing — animates strokeDashoffset to 0 (fully visible)
  const drawPath = useCallback((id: string, duration = 0.45) => {
    const pathEl = pathRefs.current.get(id);
    if (!pathEl) return;

    const prevTween = activeTweenRef.current.get(id);
    if (prevTween) prevTween.kill();

    const tween = gsap.to(pathEl, {
      strokeDashoffset: 0,
      duration,
      ease: "power3.out",
    });

    activeTweenRef.current.set(id, tween);
  }, []);

  // Smooth un-drawing — animates strokeDashoffset to -length (forward erase)
  const undrawPath = useCallback((id: string, duration = 0.4) => {
    const pathEl = pathRefs.current.get(id);
    if (!pathEl) return;

    const prevTween = activeTweenRef.current.get(id);
    if (prevTween) prevTween.kill();

    const length = pathEl.getTotalLength();

    const tween = gsap.to(pathEl, {
      strokeDashoffset: -length,
      duration,
      ease: "power2.inOut",
    });

    activeTweenRef.current.set(id, tween);
  }, []);

  // Initialize all paths as hidden on mount
  useEffect(() => {
    pathRefs.current.forEach((pathEl) => {
      if (!pathEl) return;
      const length = pathEl.getTotalLength();
      gsap.set(pathEl, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });
  }, []);

  // Scroll handler with throttle and smooth state tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 20);

          // If currently navigating via click, don't let intermediate sections override activeSection
          if (isNavigatingRef.current) {
            const targetEl = document.getElementById(isNavigatingRef.current);
            if (targetEl) {
              const navOffset = 90;
              const targetY = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;
              if (Math.abs(scrollY - targetY) < 15) {
                isNavigatingRef.current = null;
              }
            }
            ticking = false;
            return;
          }

          const scrollMid = scrollY + window.innerHeight * 0.35;
          let current = "top";

          for (const item of NAV_ITEMS) {
            const el = document.getElementById(item.id);
            if (el) {
              if (scrollMid >= el.offsetTop - 100) {
                current = item.id;
              }
            }
          }

          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleUserInteraction = () => {
      isNavigatingRef.current = null;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      if (navigateTimeoutRef.current) clearTimeout(navigateTimeoutRef.current);
    };
  }, []);

  // Sync circle drawing whenever the active section changes
  const prevActiveRef = useRef<string>("top");
  useEffect(() => {
    const prevActive = prevActiveRef.current;
    prevActiveRef.current = activeSection;

    // Gracefully un-draw the previous active circle (if it changed and isn't hovered)
    if (prevActive !== activeSection && prevActive !== hoveredRef.current) {
      undrawPath(prevActive, 0.45);
    }

    // Draw the new active circle
    if (activeSection !== "top") {
      drawPath(activeSection, 0.5);
    }
  }, [activeSection, drawPath, undrawPath]);

  // Hover handlers
  const handleMouseEnter = (id: string) => {
    hoveredRef.current = id;
    const pathEl = pathRefs.current.get(id);
    if (!pathEl) return;

    soundManager.playScribble();

    // If not the active section, reset stroke to start position for the
    // hand-drawn circle effect — BUT only if the path is fully hidden.
    // If it's mid-undraw (negative offset), let drawPath reverse smoothly.
    if (id !== activeSection) {
      const length = pathEl.getTotalLength();
      const currentOffset = parseFloat(pathEl.style.strokeDashoffset || String(length));
      // Only reset if the stroke is fully erased (near +length or -length)
      if (Math.abs(currentOffset) > length * 0.85) {
        gsap.set(pathEl, {
          strokeDashoffset: length,
        });
      }
    }

    drawPath(id, 0.48);
  };

  const handleMouseLeave = (id: string) => {
    hoveredRef.current = null;
    if (id === activeSection) {
      // Keep the active circle visible
      drawPath(id, 0.35);
    } else {
      // Gracefully erase non-active circles
      undrawPath(id, 0.35);
    }
  };

  // Ultra-smooth custom scroll jump
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundManager.playClick();
    const id = href.replace("#", "");

    // Immediately set active section and navigation target
    setActiveSection(id);
    isNavigatingRef.current = id;

    if (navigateTimeoutRef.current) clearTimeout(navigateTimeoutRef.current);
    navigateTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = null;
    }, 1000);

    const el = document.getElementById(id);
    if (el) {
      const navOffset = 90;
      const targetY = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-3 pb-2">
        <nav
          className={`flex items-center justify-between rounded-full bg-paper/90 px-4 sm:px-5 py-2.5 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "rough-border translate-y-0"
              : "border-2 border-ink/20 shadow-[2px_2px_0_0.5px_rgba(26,26,26,0.1)]"
          }`}
        >
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => scrollToSection(e, "#top")}
            className="group relative flex items-center font-display text-lg tracking-tight select-none"
          >
            <span className="transition-transform duration-300 group-hover:-rotate-3">
              CS
            </span>
            <span className="text-marker transition-transform duration-300 group-hover:scale-125">
              .
            </span>
          </a>

          {/* Desktop Navigation Links with Live-Drawn Circles */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={() => handleMouseLeave(item.id)}
                  className={`relative px-3.5 py-1 font-mono text-[13px] transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-ink"
                      : "font-medium text-ink-soft hover:text-ink"
                  }`}
                >
                  {/* SVG Canvas with Live Drawn Stroke */}
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

          {/* Actions: Sound FX Toggle, Contact, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Tactile Audio SFX Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              title={soundEnabled ? "Mute Web Audio SFX" : "Enable Tactile Paper & Pen SFX"}
              className={`rough-border flex h-8 items-center gap-1.5 px-2 font-mono text-[11px] font-bold transition-all ${
                soundEnabled
                  ? "bg-sticky text-ink"
                  : "bg-paper text-ink-soft hover:bg-paper-alt"
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-marker" />
                  <span className="hidden sm:inline">SFX</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5 opacity-60" />
                  <span className="hidden sm:inline opacity-60">MUTED</span>
                </>
              )}
            </button>

            {/* Contact Action */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="rough-border relative overflow-hidden bg-marker px-3.5 sm:px-4 py-1.5 font-mono text-xs font-bold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0.5px_var(--ink)] active:translate-y-0 active:shadow-[2px_2px_0_0.5px_var(--ink)]"
            >
              say hi
            </a>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="rough-border flex h-8 w-8 items-center justify-center bg-paper p-1 text-ink transition-all md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="rough-border mt-3 overflow-hidden rounded-2xl bg-paper p-5 shadow-[5px_5px_0_0.5px_var(--ink)] transition-all md:hidden">
            <div className="flex flex-col gap-3 font-mono text-sm">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      scrollToSection(e, item.href);
                    }}
                    className={`flex items-center justify-between border-b border-ink/10 py-2 transition-colors ${
                      isActive
                        ? "font-bold text-marker"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="font-hand text-lg text-marker">
                        ✦ active
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
