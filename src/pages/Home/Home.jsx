import { useDriveCMS } from '../../hooks/useDriveCMS';
import HeroSection    from '../../components/HeroSection/HeroSection';
import AboutSection   from '../../components/AboutSection/AboutSection';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';
import ExperienceSection from '../../components/ExperienceSection/ExperienceSection';
import AchievementsSection from '../../components/AchievementsSection/AchievementsSection';
import SkillsSection  from '../../components/SkillsSection/SkillsSection';
import ContactSection from '../../components/ContactSection/ContactSection';

export default function Home() {
  const { projects, experience, achievements, loading } = useDriveCMS();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection experience={experience} loading={loading} />
      <ProjectsSection projects={projects} loading={loading} />
      <AchievementsSection achievements={achievements} loading={loading} />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
