import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import InvocationSection from './InvocationSection';
import EventDetails from './EventDetails';
import Countdown from './Countdown';
import FamilySection from './FamilySection';
import CeremonySection from './CeremonySection';
import VenueSection from './VenueSection';
import GallerySection from './GallerySection';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

/* ── Footer with subtle entrance ── */
function Footer() {
  const { isTamil } = useLanguage();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{
        background: '#1A0E08',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(212,175,55,0.2)',
      }}
    >
      <p style={{
        fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
        fontSize: isTamil ? '0.8rem' : '0.66rem',
        letterSpacing: isTamil ? '0.04em' : '0.22em',
        color: '#ECC875',
        margin: '0 0 0.4rem',
        fontWeight: 600,
      }}>
        {isTamil ? 'ஈ. ஹர்ஷவர்தினி & சி. ராஜகோபால் · 29 நவம்பர் 2026' : 'E. HARSHAVARDHINI & C. RAJAGOPAL · 29 NOVEMBER 2026'}
      </p>
      <p style={{
        fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        color: 'rgba(250,249,246,0.45)',
        margin: 0,
      }}>
        {isTamil ? 'தங்கள் அன்பான வருகையே எங்கள் பெருமை' : 'With Heartfelt Blessings & Warm Regards'}
      </p>
    </motion.footer>
  );
}

/* ── Main wrapper with cinematic page entrance ── */
export default function MainInvitation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative' }}
    >
      {/* ── Floating Sticky Language Switcher in Top Left ── */}
      <div
        style={{
          position: 'fixed',
          top: 'clamp(1rem, 2.5vh, 1.35rem)',
          left: 'clamp(1rem, 3vw, 1.5rem)',
          zIndex: 110,
        }}
      >
        <LanguageSwitcher floating={true} />
      </div>

      <main>
        <HeroSection />
        <InvocationSection />
        <EventDetails />
        <Countdown />
        <FamilySection />
        <CeremonySection />
        <VenueSection />
        <GallerySection />
      </main>

      <Footer />
    </motion.div>
  );
}
