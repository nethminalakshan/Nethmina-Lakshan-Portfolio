import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import ParticleField from './components/ParticleField/ParticleField';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark relative overflow-x-hidden noise">
      <ParticleField />

      <div className="relative z-10">
        <Navbar />

        {/* Page transition */}
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <AppRoutes />
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
}

export default App;
