"use client";

import CompetitiveSections from "@/components/CompetitiveSection";
import ContactSection from "@/components/ContactSection";
import DoodleCanvas from "@/components/DoodleCanvas";
import { SquiggleDivider } from "@/components/Doodles";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PlaneLauncher from "@/components/PlaneLauncher";
import ProfileSection from "@/components/ProfileSection";
import ProjectSection from "@/components/ProjectSection";
import ScrollDoodles from "@/components/ScrollDoodles";
import ScrollMarginIndicator from "@/components/ScrollMarginIndicator";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-clip">
      <ScrollMarginIndicator />
      <ScrollDoodles />
      <PlaneLauncher />
      <DoodleCanvas />
      {/* NAV */}
      <Navbar />

      {/* HERO */}
      <HeroSection />

      {/* PROJECTS */}
      <ProjectSection />

      <div className="py-4">
        <SquiggleDivider />
      </div>

      {/* EXPERIENCE */}
      <ExperienceSection />

      {/* SKILLS */}
      <SkillsSection />

      {/* COMPETITIVE PROGRAMMING */}
      <CompetitiveSections />

      {/* PROFILES */}
      <ProfileSection />

      {/* CONTACT */}
      <ContactSection />
    </div>
  );
}
