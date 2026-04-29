import HeroSection    from '../../components/HeroSection/HeroSection';
import AboutSection   from '../../components/AboutSection/AboutSection';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';
import SkillsSection  from '../../components/SkillsSection/SkillsSection';
import ContactSection from '../../components/ContactSection/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
