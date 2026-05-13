'use client';

import { useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';

import ParticleField from '../ParticleField/ParticleField';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import HeroSection from '../HeroSection/HeroSection';
import AboutSection from '../AboutSection/AboutSection';
import SkillsSection from '../SkillsSection/SkillsSection';
import ProjectsSection from '../ProjectsSection/ProjectsSection';
import ExperienceSection from '../ExperienceSection/ExperienceSection';
import AchievementsSection from '../AchievementsSection/AchievementsSection';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';
import ContactSection from '../ContactSection/ContactSection';
import ScrollProgress from '../ScrollProgress/ScrollProgress';
import { useDriveCMS } from '../../hooks/useDriveCMS';

export default function AppShell() {
  const [lenis, setLenis] = useState(null);
  const { projects, experience, achievements, loading } = useDriveCMS();

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    let rafId;
    const raf = (time) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    setLenis(instance);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const sections = useMemo(
    () => [
      { id: 'hero', label: 'Intro' },
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'experience', label: 'Experience' },
      { id: 'achievements', label: 'Achievements' },
      { id: 'testimonials', label: 'Proof' },
      { id: 'contact', label: 'Contact' },
    ],
    []
  );

  const handleNavTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark relative overflow-x-hidden noise">
      <ParticleField />

      <div className="relative z-10">
        <ScrollProgress />
        <Navbar sections={sections} onNavTo={handleNavTo} />

        <main>
          <HeroSection onPrimaryCta={() => handleNavTo('projects')} onSecondaryCta={() => handleNavTo('contact')} />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection projects={projects} loading={loading} />
          <ExperienceSection experience={experience} loading={loading} />
          <AchievementsSection achievements={achievements} loading={loading} />
          <TestimonialsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
