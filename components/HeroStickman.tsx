"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function HeroStickman() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageWrapperRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal the stickman illustration smoothly from left to right
      gsap.fromTo(
        imageWrapperRef.current,
        {
          clipPath: "inset(0% 100% 0% 0%)",
          opacity: 0,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.15,
          onComplete: () => {
            // Remove clip-path layer once finished to prevent GPU compositor overhead
            if (imageWrapperRef.current) {
              imageWrapperRef.current.style.clipPath = "none";
            }

            // Start subtle ambient float seamlessly after reveal completes
            gsap.to(containerRef.current, {
              y: -4,
              duration: 2.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] flex items-center justify-center select-none will-change-transform"
    >
      <div
        ref={imageWrapperRef}
        style={{ clipPath: "inset(0% 100% 0% 0%)", opacity: 0 }}
        className="relative w-full aspect-[4/3] flex items-center justify-center will-change-[clip-path,opacity]"
      >
        <Image
          src="/drinking-coffee.png"
          alt="Chandan Sahoo - Stickman illustration"
          width={400}
          height={300}
          priority
          className="w-full h-auto object-contain drop-shadow-sm pointer-events-none"
        />
      </div>
    </div>
  );
}




