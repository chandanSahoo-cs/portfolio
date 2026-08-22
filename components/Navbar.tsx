"use client";

import { soundManager } from "@/lib/audio";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavItem {
  name: string;
  href: string;
  id: string;
  color: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "projects",
    href: "#projects",
    id: "projects",
    color: "var(--marker)",
  },
  {
    name: "experience",
    href: "#experience",
    id: "experience",
    color: "var(--marker)",
  },
  {
    name: "skills",
    href: "#skills",
    id: "skills",
    color: "var(--marker)",
  },
  {
    name: "competitive",
    href: "#competitive",
    id: "competitive",
    color: "var(--leaf)",
  },
  {
    name: "find me",
    href: "#profiles",
    id: "profiles",
    color: "var(--pen-blue)",
  },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

  // Scroll spy — determines active section from scroll position
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 20);

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hover handlers
  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
    soundManager.playScribble();
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  // Scroll to section on click
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    soundManager.playClick();
    const id = href.replace("#", "");
    setActiveSection(id);

    const el = document.getElementById(id);
    if (el) {
      const navOffset = 90;
      const targetY =
        el.getBoundingClientRect().top + window.scrollY - navOffset;
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
          }`}>
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => scrollToSection(e, "#top")}
            className="group relative flex items-center font-display text-lg tracking-tight select-none">
            <span className="transition-transform duration-300 group-hover:-rotate-3">
              CS
            </span>
            <span className="text-marker transition-transform duration-300 group-hover:scale-125">
              .
            </span>
          </a>

          {/* Desktop Navigation Links with Doodle Brackets [ item ] */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredId === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  className={`group relative flex items-center px-3.5 py-1.5 font-mono text-[13px] select-none transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-ink"
                      : "font-medium text-ink-soft hover:text-ink"
                  }`}>
                  {/* Left Doodle Bracket */}
                  <span
                    aria-hidden="true"
                    className={`font-hand text-lg font-bold transition-all duration-200 ${
                      item.color === "var(--leaf)"
                        ? "text-leaf"
                        : item.color === "var(--pen-blue)"
                        ? "text-pen-blue"
                        : "text-marker"
                    } ${
                      isActive
                        ? "opacity-100 translate-x-0 mr-1"
                        : isHovered
                        ? "opacity-70 -translate-x-0.5 mr-0.5"
                        : "opacity-0 -translate-x-2 w-0 overflow-hidden mr-0"
                    }`}>
                    [
                  </span>

                  {/* Nav Item Label */}
                  <span className="relative z-10">{item.name}</span>

                  {/* Right Doodle Bracket */}
                  <span
                    aria-hidden="true"
                    className={`font-hand text-lg font-bold transition-all duration-200 ${
                      item.color === "var(--leaf)"
                        ? "text-leaf"
                        : item.color === "var(--pen-blue)"
                        ? "text-pen-blue"
                        : "text-marker"
                    } ${
                      isActive
                        ? "opacity-100 translate-x-0 ml-1"
                        : isHovered
                        ? "opacity-70 translate-x-0.5 ml-0.5"
                        : "opacity-0 translate-x-2 w-0 overflow-hidden ml-0"
                    }`}>
                    ]
                  </span>

                  {/* Tactile Sketch Background Pill */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 -z-10 rounded-full transition-all duration-200 pointer-events-none ${
                      isActive
                        ? "opacity-100 scale-100 border border-ink/20 bg-ink/[0.06] shadow-[1px_1px_0_0.5px_rgba(26,26,26,0.1)]"
                        : isHovered
                        ? "opacity-100 scale-95 bg-ink/[0.03]"
                        : "opacity-0 scale-90"
                    }`}
                  />
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
              title={
                soundEnabled
                  ? "Mute Web Audio SFX"
                  : "Enable Tactile Paper & Pen SFX"
              }
              className={`rough-border flex h-8 items-center gap-1.5 px-2 font-mono text-[11px] font-bold transition-all ${
                soundEnabled
                  ? "bg-sticky text-ink"
                  : "bg-paper text-ink-soft hover:bg-paper-alt"
              }`}>
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
              className="rough-border relative overflow-hidden bg-marker px-3.5 sm:px-4 py-1.5 font-mono text-xs font-bold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0.5px_var(--ink)] active:translate-y-0 active:shadow-[2px_2px_0_0.5px_var(--ink)]">
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
              aria-label="Toggle navigation menu">
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
                    }`}>
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
