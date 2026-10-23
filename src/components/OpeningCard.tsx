import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { invitation } from '../data/invitationData';
import coupleImg from '../assets/couple.png';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface Props {
  onOpen: () => void;
}

/* ── Realistic Floating Petal ── */
interface PetalItem {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  type: 'jasmine' | 'rose' | 'goldLeaf';
}

function FloatingMandapamPetals() {
  const petals: PetalItem[] = [
    { id: 1, x: 6,  size: 9,  duration: 14, delay: 0,   rotation: 45,  type: 'jasmine' },
    { id: 2, x: 20, size: 14, duration: 16, delay: 3,   rotation: 120, type: 'rose' },
    { id: 3, x: 38, size: 8,  duration: 12, delay: 7,   rotation: 80,  type: 'jasmine' },
    { id: 4, x: 55, size: 7,  duration: 15, delay: 1.5, rotation: 200, type: 'goldLeaf' },
    { id: 5, x: 72, size: 15, duration: 17, delay: 5,   rotation: 160, type: 'rose' },
    { id: 6, x: 86, size: 9,  duration: 13, delay: 8.5, rotation: 30,  type: 'jasmine' },
    { id: 7, x: 94, size: 12, duration: 18, delay: 4,   rotation: 95,  type: 'rose' },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 12 }} aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-5vh', x: `${p.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: '105vh',
            x: [`${p.x}vw`, `${p.x + (p.id % 2 === 0 ? 3 : -3)}vw`, `${p.x}vw`],
            opacity: [0, 0.85, 0.7, 0],
            rotate: p.rotation + 360,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: p.type === 'jasmine' ? p.size : p.size * 1.5,
            height: p.size,
            background:
              p.type === 'jasmine'
                ? 'radial-gradient(circle, #FFFFFF 60%, #FFF8E7 100%)'
                : p.type === 'rose'
                ? 'radial-gradient(circle at 40% 40%, #D81B60 0%, #880E4F 80%)'
                : 'linear-gradient(135deg, #ECC875 0%, #A47B33 100%)',
            borderRadius: p.type === 'jasmine' ? '50%' : '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow:
              p.type === 'jasmine'
                ? '0 2px 6px rgba(0,0,0,0.1)'
                : p.type === 'rose'
                ? '0 2px 8px rgba(136,14,79,0.3)'
                : '0 0 6px rgba(212,175,55,0.5)',
          }}
        />
      ))}
    </div>
  );
}


/* ── Royal Scalloped Wax Seal ── */
function RoyalWaxSeal({ onClick, breaking, isTamil }: { onClick: () => void; breaking: boolean; isTamil: boolean }) {
  return (
    <motion.button
      type="button"
      id="btn-wax-seal"
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      animate={
        breaking
          ? { scale: [1, 1.35, 0], opacity: [1, 1, 0], rotate: [0, 15, -25] }
          : { scale: [1, 1.03, 1] }
      }
      transition={
        breaking
          ? { duration: 0.6, ease: 'easeOut' }
          : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
      }
      style={{
        width: 82,
        height: 82,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 32%, #A81B24 0%, #750B11 55%, #420508 100%)',
        border: '2.5px solid #D4AF37',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: '0 8px 24px rgba(117,11,17,0.35), 0 2px 8px rgba(0,0,0,0.2)',
        padding: 0,
        flexShrink: 0,
      }}
      aria-label="Open Invitation Seal"
    >
      {/* Subtle pulsing aura halo ring */}
      <motion.div
        animate={{
          scale: [1, 1.22, 1],
          opacity: [0.55, 0, 0.55],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          border: '1.5px solid #D4AF37',
          pointerEvents: 'none',
        }}
      />
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        style={{ position: 'absolute', inset: -1, pointerEvents: 'none', opacity: 0.85 }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#ECC875"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: 4,
          borderRadius: '50%',
          border: '1.2px solid rgba(245,226,152,0.6)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(255,255,255,0.2)',
        }}
      />

      <span
        style={{
          fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', serif",
          fontSize: isTamil ? '1.1rem' : '1.35rem',
          fontWeight: 700,
          color: '#F9E9C8',
          letterSpacing: '0.08em',
          textShadow: '0 2px 4px rgba(0,0,0,0.65), 0 0 2px #ECC875',
          lineHeight: 1,
          marginTop: 2,
        }}
      >
        {isTamil ? 'ஹ & ரா' : 'H & R'}
      </span>

      <span
        style={{
          fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
          fontSize: isTamil ? '0.48rem' : '0.46rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#ECC875',
          marginTop: 3,
          fontWeight: 600,
        }}
      >
        {isTamil ? 'திறக்க' : 'OPEN'}
      </span>
    </motion.button>
  );
}

/* ── Royal Open CTA Button ── */
function OpenInvitationCTA({ onClick, isTamil }: { onClick: () => void; isTamil: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
      <svg width="26" height="16" viewBox="0 0 40 20" fill="none" style={{ opacity: 0.85 }}>
        <path d="M40 10 C30 10 20 4 10 0 C15 7 25 10 35 10" stroke="#C59B27" strokeWidth="1.2" fill="none" />
        <path d="M40 10 C28 10 16 16 4 20 C10 14 24 10 36 10" stroke="#C59B27" strokeWidth="1.2" fill="none" />
        <circle cx="8" cy="10" r="2.5" fill="#D4AF37" />
        <circle cx="2" cy="10" r="1.5" fill="#ECC875" />
      </svg>

      <motion.button
        type="button"
        id="btn-open-invitation"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{
          background: 'linear-gradient(135deg, #7A1C24 0%, #901C27 45%, #6B1119 100%)',
          color: '#FAF3E0',
          border: '1.5px solid #E8C875',
          padding: '0.78rem 1.9rem',
          borderRadius: 9999,
          fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', sans-serif",
          fontSize: isTamil ? '0.82rem' : '0.74rem',
          fontWeight: 600,
          letterSpacing: isTamil ? '0.04em' : '0.16em',
          textTransform: isTamil ? 'none' : 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(122,28,36,0.35), inset 0 2px 4px rgba(255,255,255,0.25)',
        }}
      >
        <motion.div
          animate={{ x: ['-140%', '260%'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '45%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)',
            pointerEvents: 'none',
            skewX: '-20deg',
          }}
        />

        <span style={{ position: 'relative', zIndex: 2 }}>
          {isTamil ? 'பத்திரிகையை திறக்க' : 'Tap to Open Invitation'}
        </span>
        <motion.span
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ fontSize: '1rem', lineHeight: 0, position: 'relative', zIndex: 2, color: '#ECC875' }}
        >
          ✦
        </motion.span>
      </motion.button>

      <svg
        width="26"
        height="16"
        viewBox="0 0 40 20"
        fill="none"
        style={{ opacity: 0.85, transform: 'scaleX(-1)' }}
      >
        <path d="M40 10 C30 10 20 4 10 0 C15 7 25 10 35 10" stroke="#C59B27" strokeWidth="1.2" fill="none" />
        <path d="M40 10 C28 10 16 16 4 20 C10 14 24 10 36 10" stroke="#C59B27" strokeWidth="1.2" fill="none" />
        <circle cx="8" cy="10" r="2.5" fill="#D4AF37" />
        <circle cx="2" cy="10" r="1.5" fill="#ECC875" />
      </svg>
    </div>
  );
}

/* ── Sparkle Burst ── */
function SparkleBurst() {
  const particles = Array.from({ length: 28 });
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 60 }} aria-hidden="true">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const dist = 90 + (i % 3) * 50;
        const rad = (angle * Math.PI) / 180;
        const targetX = Math.cos(rad) * dist;
        const targetY = Math.sin(rad) * dist;
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 0.3, opacity: 1 }}
            animate={{ x: targetX, y: targetY, scale: [0.5, 1.4, 0], opacity: [1, 0.9, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: i % 2 === 0 ? 6 : 4,
              height: i % 2 === 0 ? 6 : 4,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#FFFFFF' : '#ECC875',
              boxShadow: '0 0 10px #ECC875',
            }}
          />
        );
      })}
    </div>
  );
}

/* ── High-Resolution Photo Lightbox Modal ── */
function PhotoLightbox({ onClose, isTamil }: { onClose: () => void; isTamil: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(10, 6, 4, 0.92)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: 'min(92vw, 680px)',
          maxHeight: 'min(86vh, 880px)',
          borderRadius: 20,
          padding: '6px',
          background: 'linear-gradient(145deg, #FFF2BD 0%, #D4AF37 50%, #996515 100%)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.4)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: -16,
            right: -16,
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: '#A81B24',
            border: '2px solid #ECC875',
            color: '#FFFFFF',
            fontSize: '1.2rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            zIndex: 10,
          }}
          aria-label="Close photo preview"
        >
          ×
        </button>

        <img
          src={coupleImg}
          alt="E. Harshavardhini & C. Rajagopal"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: 'min(80vh, 820px)',
            objectFit: 'contain',
            borderRadius: 16,
            display: 'block',
          }}
        />

        <p
          style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', serif",
            color: '#FFFDF8',
            fontSize: '0.95rem',
            textAlign: 'center',
            margin: '0.6rem 0 0.2rem',
            letterSpacing: '0.08em',
          }}
        >
          {isTamil ? 'ஈ. ஹர்ஷவர்தினி & சி. ராஜகோபால்' : 'E. Harshavardhini & C. Rajagopal'}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function OpeningCard({ onOpen }: Props) {
  const [phase, setPhase] = useState<'idle' | 'breaking' | 'opening' | 'transition'>('idle');
  const [showLightbox, setShowLightbox] = useState(false);
  const { language, isTamil } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 820 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 820);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerOpening = () => {
    if (phase !== 'idle') return;
    window.dispatchEvent(new CustomEvent('wedding:play-music'));
    setPhase('breaking');

    setTimeout(() => {
      setPhase('opening');
    }, 600);

    setTimeout(() => {
      setPhase('transition');
    }, 1400);

    setTimeout(() => {
      onOpen();
    }, 2200);
  };

  const brideDisplay = isTamil ? invitation.bride.name.ta : invitation.bride.fullDisplay.en;
  const groomDisplay = isTamil ? invitation.groom.name.ta : invitation.groom.fullDisplay.en;
  const ceremonyTitle = isTamil ? invitation.event.nameTamilStyle.ta : invitation.event.type.en;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        width: '100vw',
        height: '100vh',
        minHeight: '100dvh',
        background: 'radial-gradient(ellipse at 50% 35%, #FDFBF7 0%, #FAF6EE 55%, #F4ECE0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isDesktop ? '1rem' : 'clamp(0.8rem, 2.5vh, 1.5rem) clamp(0.7rem, 3vw, 1.2rem)',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* ── Top Bar with Language Switcher ── */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(12px, 2.5vh, 22px)',
          right: 'clamp(14px, 3vw, 28px)',
          zIndex: 35,
        }}
      >
        <LanguageSwitcher floating={true} />
      </div>

      {/* ── Ambient Soft Glow in Center ── */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '85vw',
          height: '85vh',
          maxWidth: 950,
          maxHeight: 950,
          background: 'radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Floating Flower Petals ── */}
      <FloatingMandapamPetals />

      {/* ── Sparkle Burst Effect on Open ── */}
      <AnimatePresence>{phase === 'breaking' && <SparkleBurst />}</AnimatePresence>

      {/* ── Photo Lightbox Modal ── */}
      <AnimatePresence>
        {showLightbox && <PhotoLightbox onClose={() => setShowLightbox(false)} isTamil={isTamil} />}
      </AnimatePresence>

      {/* ── The Royal Invitation Centerpiece ── */}
      <motion.div
        animate={{
          scale: phase === 'transition' ? 1.12 : 1,
          opacity: phase === 'transition' ? 0 : 1,
          y: phase === 'opening' ? -15 : 0,
        }}
        transition={{
          scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{
          position: 'relative',
          zIndex: 20,
          width: isDesktop ? 'min(94vw, 1260px)' : 'min(94vw, 440px)',
          maxHeight: isDesktop ? 'min(90vh, 790px)' : undefined,
          background: 'linear-gradient(175deg, #FFFDF8 0%, #FAF5EB 55%, #F5ECE0 100%)',
          borderRadius: 24,
          border: '2px solid #D8C28E',
          boxShadow: '0 28px 80px rgba(110, 70, 25, 0.22), 0 8px 28px rgba(212, 175, 55, 0.28)',
          padding: isDesktop ? '1.8rem 2.8rem' : 'clamp(1.4rem, 3.5vw, 2rem) clamp(0.9rem, 3vw, 1.5rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          boxSizing: 'border-box',
          overflow: 'hidden',
          margin: 'auto',
        }}
      >
        {/* Full-bleed Inner Gold Border */}
        <div
          style={{
            position: 'absolute',
            inset: isDesktop ? 12 : 8,
            border: isDesktop ? '1.5px solid #D4AF37' : '1px solid #D4AF37',
            borderRadius: isDesktop ? 16 : 18,
            opacity: 0.65,
            pointerEvents: 'none',
          }}
        />

        {isDesktop ? (
          /* ══════════════════════════════════════════════════════════════
             LAPTOP / WEB VIEW: Prominent, Grand Crystal-Clear Photo on Left
             ══════════════════════════════════════════════════════════════ */
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'clamp(2rem, 3.5vw, 3.5rem)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Left Column: Grand Arched Frame Portrait with CLEAR PROMINENT SIZE */}
            <div
              style={{
                flex: '1 1 50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem 1rem',
              }}
            >
              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
                  fontSize: isTamil ? '0.78rem' : '0.66rem',
                  letterSpacing: isTamil ? '0.08em' : '0.28em',
                  textTransform: 'uppercase',
                  color: '#8A7660',
                  margin: '0.2rem 0 0.8rem',
                  fontWeight: 600,
                }}
              >
                {isTamil ? 'நிச்சயதார்த்த சுபமுகூர்த்த அழைப்பிதழ்' : 'Nichayathartham • Sacred Engagement'}
              </p>

              {/* Grand Arched Portrait Frame — SIGNIFICANTLY LARGER & CLEAR */}
              <div
                style={{
                  position: 'relative',
                  width: 'clamp(320px, 28vw, 400px)',
                  margin: '0 auto 0.75rem',
                }}
              >
                {/* Golden Backlight Glow */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -14,
                    borderRadius: '180px 180px 24px 24px',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 72%)',
                    filter: 'blur(14px)',
                  }}
                />

                <div
                  style={{
                    position: 'relative',
                    borderRadius: '180px 180px 24px 24px',
                    padding: '5px',
                    background: 'linear-gradient(145deg, #FFF2BD 0%, #D4AF37 50%, #A88245 100%)',
                    boxShadow: '0 20px 48px rgba(45,20,5,0.28), 0 6px 18px rgba(212,175,55,0.38)',
                  }}
                >
                  <div
                    style={{
                      borderRadius: '174px 174px 18px 18px',
                      overflow: 'hidden',
                      aspectRatio: '3.8 / 4.7',
                      background: '#FAF6EE',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowLightbox(true)}
                    title="Click to view full size"
                  >
                    <img
                      src={coupleImg}
                      alt="E. Harshavardhini & C. Rajagopal"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 14%',
                        display: 'block',
                        filter: 'contrast(1.04) saturate(1.06)',
                        imageRendering: 'auto',
                        transition: 'transform 0.4s ease',
                      }}
                    />

                    {/* Subtle Tap to Zoom pill */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        background: 'rgba(26, 15, 10, 0.75)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFF2BD',
                        border: '1px solid #D4AF37',
                        borderRadius: 9999,
                        padding: '4px 10px',
                        fontSize: '0.62rem',
                        fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <span>🔍</span>
                      <span>{isTamil ? 'பெரிதாக்குக' : 'Tap to Zoom'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
                  fontStyle: isTamil ? 'normal' : 'italic',
                  fontSize: isTamil ? '0.85rem' : '1.05rem',
                  color: '#A88245',
                  margin: '0.2rem 0 0',
                  letterSpacing: '0.04em',
                  maxWidth: 420,
                  lineHeight: 1.5,
                }}
              >
                {invitation.texts[language].quote}
              </p>
            </div>

            {/* Vertical Golden Filigree Divider */}
            <div
              style={{
                width: 1,
                alignSelf: 'stretch',
                background: 'linear-gradient(to bottom, transparent, #D4AF37 20%, #D4AF37 80%, transparent)',
                position: 'relative',
                opacity: 0.6,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  width: 8,
                  height: 8,
                  background: '#D4AF37',
                  boxShadow: '0 0 8px rgba(212,175,55,0.6)',
                }}
              />
            </div>

            {/* Right Column: Royal Typography (Ponnu First) + Details + Open Button */}
            <div
              style={{
                flex: '1 1 48%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '1rem clamp(0.5rem, 2vw, 2rem)',
              }}
            >
              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
                  fontSize: isTamil ? '0.82rem' : '0.66rem',
                  letterSpacing: isTamil ? '0.06em' : '0.3em',
                  textTransform: 'uppercase',
                  color: '#8A7660',
                  margin: '0 0 0.4rem',
                  fontWeight: 600,
                }}
              >
                {isTamil ? 'அன்புடன் அழைக்கும் சுப வைபவம்' : 'You are cordially invited to the'}
              </p>

              <h1
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', 'Playfair Display', serif",
                  fontSize: isTamil ? 'clamp(1.4rem, 2.2vw, 1.9rem)' : 'clamp(1.7rem, 2.5vw, 2.2rem)',
                  color: '#7A1C24',
                  margin: '0 0 1rem',
                  fontWeight: 700,
                  letterSpacing: isTamil ? '0.04em' : '0.14em',
                  textTransform: isTamil ? 'none' : 'uppercase',
                  textShadow: '0 1px 2px rgba(122,28,36,0.12)',
                }}
              >
                {ceremonyTitle}
              </h1>

              {/* Ponnu Per Strictly First: Bride Name */}
              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', 'Cormorant Garamond', serif",
                  fontSize: isTamil ? 'clamp(1.45rem, 2.4vw, 1.95rem)' : 'clamp(1.55rem, 2.5vw, 2.1rem)',
                  color: '#261914',
                  margin: '0 0 0.15rem',
                  letterSpacing: isTamil ? '0.04em' : '0.06em',
                  fontWeight: 700,
                  textTransform: isTamil ? 'none' : 'uppercase',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                {brideDisplay}
              </p>
              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
                  fontStyle: isTamil ? 'normal' : 'italic',
                  fontSize: isTamil ? '0.92rem' : '1.1rem',
                  color: '#7B6A5A',
                  margin: '0.1rem 0 0.4rem',
                  letterSpacing: '0.04em',
                }}
              >
                ({isTamil ? 'எ' : 'alias'} {isTamil ? invitation.bride.alias.ta : invitation.bride.alias.en}) • {invitation.bride.qualification}
              </p>

              {/* Interlocking Rings Emblem */}
              <div style={{ display: 'flex', justifyContent: 'center', margin: '0.2rem 0' }}>
                <svg width="42" height="22" viewBox="0 0 44 22" fill="none">
                  <circle cx="15" cy="11" r="8" stroke="#D4AF37" strokeWidth="2" />
                  <circle cx="29" cy="11" r="8" stroke="#D4AF37" strokeWidth="2" />
                  <circle cx="22" cy="7" r="1.8" fill="#FFF2BD" />
                </svg>
              </div>

              {/* Paiyan Peru Strictly Second: Groom Name */}
              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', 'Cormorant Garamond', serif",
                  fontSize: isTamil ? 'clamp(1.45rem, 2.4vw, 1.95rem)' : 'clamp(1.55rem, 2.5vw, 2.1rem)',
                  color: '#261914',
                  margin: '0 0 0.2rem',
                  letterSpacing: isTamil ? '0.04em' : '0.06em',
                  fontWeight: 700,
                  textTransform: isTamil ? 'none' : 'uppercase',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                {groomDisplay}
              </p>
              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
                  fontStyle: isTamil ? 'normal' : 'italic',
                  fontSize: isTamil ? '0.88rem' : '1.05rem',
                  color: '#7B6A5A',
                  margin: '0 0 0.9rem',
                }}
              >
                {invitation.groom.qualification} • {isTamil ? invitation.groom.designation.ta : invitation.groom.designation.en}
              </p>

              {/* Gold Divider Line */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  margin: '0 auto 1rem',
                  width: 'min(80%, 280px)',
                }}
              >
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #C59B27)' }} />
                <div style={{ width: 6, height: 6, background: '#D4AF37', transform: 'rotate(45deg)' }} />
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #C59B27)' }} />
              </div>

              {/* Date & Venue */}
              <div style={{ marginBottom: '1.4rem' }}>
                <p
                  style={{
                    fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', serif",
                    fontSize: isTamil ? '1.15rem' : '1.35rem',
                    color: '#3A271E',
                    margin: '0 0 0.2rem',
                    letterSpacing: isTamil ? '0.05em' : '0.14em',
                    fontWeight: 700,
                  }}
                >
                  {isTamil ? invitation.event.date.ta : invitation.event.displayDate}
                </p>
                <p
                  style={{
                    fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
                    fontSize: isTamil ? '0.82rem' : '0.72rem',
                    letterSpacing: isTamil ? '0.04em' : '0.22em',
                    textTransform: isTamil ? 'none' : 'uppercase',
                    color: '#7A1C24',
                    margin: '0 0 0.25rem',
                    fontWeight: 600,
                  }}
                >
                  {isTamil
                    ? `${invitation.event.day.ta} | ${invitation.event.timeRange.ta}`
                    : `Sunday  |  ${invitation.event.timeRange.en}`}
                </p>
                <p
                  style={{
                    fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
                    fontStyle: isTamil ? 'normal' : 'italic',
                    fontSize: isTamil ? '0.95rem' : '1.05rem',
                    color: '#A88245',
                    margin: 0,
                    letterSpacing: '0.04em',
                  }}
                >
                  {isTamil ? invitation.venue.name.ta : invitation.venue.name.en} · {isTamil ? invitation.venue.city.ta : invitation.venue.city.en}
                </p>
              </div>

              {/* Interactive Wax Seal & Open Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', margin: '0.3rem 0' }}>
                <RoyalWaxSeal onClick={triggerOpening} breaking={phase === 'breaking'} isTamil={isTamil} />
                <OpenInvitationCTA onClick={triggerOpening} isTamil={isTamil} />
              </div>

              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
                  fontSize: isTamil ? '0.65rem' : '0.55rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#A89785',
                  marginTop: '0.75rem',
                }}
              >
                {invitation.texts[language].openSealSub}
              </p>
            </div>
          </div>
        ) : (
          /* ══════════════════════════════════════════════════════════════
             MOBILE VIEW: Large, Clear, Prominent Couple Photo at Center
             ══════════════════════════════════════════════════════════════ */
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%' }}>
            <h1
              style={{
                fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', 'Playfair Display', serif",
                fontSize: isTamil ? 'clamp(1.18rem, 4vw, 1.45rem)' : 'clamp(1.22rem, 4.2vw, 1.6rem)',
                color: '#7A1C24',
                margin: '0 0 0.5rem',
                fontWeight: 700,
                letterSpacing: isTamil ? '0.02em' : '0.12em',
                textTransform: isTamil ? 'none' : 'uppercase',
                textShadow: '0 1px 2px rgba(122,28,36,0.12)',
              }}
            >
              {ceremonyTitle}
            </h1>

            {/* 4) Portrait with Arched Gold Frame — EXPANDED TO CLEAR PROMINENT SIZE */}
            <div
              style={{
                position: 'relative',
                width: 'clamp(240px, 74vw, 320px)',
                margin: '0 auto 0.75rem',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: -10,
                  borderRadius: '130px 130px 20px 20px',
                  background: 'radial-gradient(circle, rgba(212,175,55,0.45) 0%, transparent 72%)',
                  filter: 'blur(10px)',
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: '130px 130px 20px 20px',
                  padding: '4.5px',
                  background: 'linear-gradient(145deg, #FFF2BD 0%, #D4AF37 50%, #A88245 100%)',
                  boxShadow: '0 14px 32px rgba(45,20,5,0.26)',
                }}
              >
                <div
                  style={{
                    borderRadius: '124px 124px 15px 15px',
                    overflow: 'hidden',
                    aspectRatio: '3.8 / 4.6',
                    background: '#FAF6EE',
                    border: '1.5px solid rgba(255,255,255,0.9)',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowLightbox(true)}
                >
                  <img
                    src={coupleImg}
                    alt="E. Harshavardhini & C. Rajagopal"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 14%',
                      display: 'block',
                      filter: 'contrast(1.04) saturate(1.06)',
                      imageRendering: 'auto',
                    }}
                  />

                  {/* Tap to Zoom indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      background: 'rgba(26, 15, 10, 0.75)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFF2BD',
                      border: '1px solid #D4AF37',
                      borderRadius: 9999,
                      padding: '3px 8px',
                      fontSize: '0.58rem',
                      fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
                    }}
                  >
                    🔍 {isTamil ? 'பெரிதாக்குக' : 'Zoom'}
                  </div>
                </div>
              </div>
            </div>

            {/* Ponnu Per Strictly First: Bride Name */}
            <p
              style={{
                fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', serif",
                fontSize: isTamil ? 'clamp(1.15rem, 4.4vw, 1.45rem)' : 'clamp(1.2rem, 4.5vw, 1.55rem)',
                color: '#261914',
                margin: '0 0 0.1rem',
                letterSpacing: isTamil ? '0.03em' : '0.06em',
                fontWeight: 700,
                textTransform: isTamil ? 'none' : 'uppercase',
                lineHeight: 1.2,
              }}
            >
              {brideDisplay}
            </p>
            <p
              style={{
                fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
                fontStyle: isTamil ? 'normal' : 'italic',
                fontSize: isTamil ? '0.8rem' : '0.92rem',
                color: '#7B6A5A',
                margin: '0 0 0.35rem',
              }}
            >
              ({isTamil ? 'எ' : 'alias'} {isTamil ? invitation.bride.alias.ta : invitation.bride.alias.en}) • {invitation.bride.qualification}
            </p>

            {/* Rings Icon */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0.15rem 0' }}>
              <svg width="34" height="18" viewBox="0 0 44 22" fill="none">
                <circle cx="15" cy="11" r="8" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="29" cy="11" r="8" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="22" cy="7" r="1.8" fill="#FFF2BD" />
              </svg>
            </div>

            {/* Paiyan Peru Strictly Second: Groom Name */}
            <p
              style={{
                fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', serif",
                fontSize: isTamil ? 'clamp(1.15rem, 4.4vw, 1.45rem)' : 'clamp(1.2rem, 4.5vw, 1.55rem)',
                color: '#261914',
                margin: '0 0 0.1rem',
                letterSpacing: isTamil ? '0.03em' : '0.06em',
                fontWeight: 700,
                textTransform: isTamil ? 'none' : 'uppercase',
                lineHeight: 1.2,
              }}
            >
              {groomDisplay}
            </p>
            <p
              style={{
                fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
                fontStyle: isTamil ? 'normal' : 'italic',
                fontSize: isTamil ? '0.8rem' : '0.92rem',
                color: '#7B6A5A',
                margin: '0 0 0.75rem',
              }}
            >
              {invitation.groom.qualification} • {isTamil ? invitation.groom.designation.ta : invitation.groom.designation.en}
            </p>

            {/* Date & Muhurtham */}
            <div style={{ margin: '0.5rem 0 0.9rem' }}>
              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', serif",
                  fontSize: isTamil ? '1.05rem' : '1.18rem',
                  color: '#3A271E',
                  margin: '0 0 0.15rem',
                  letterSpacing: isTamil ? '0.04em' : '0.14em',
                  fontWeight: 700,
                }}
              >
                {isTamil ? invitation.event.date.ta : invitation.event.displayDate}
              </p>
              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
                  fontSize: isTamil ? '0.74rem' : '0.62rem',
                  letterSpacing: isTamil ? '0.03em' : '0.18em',
                  textTransform: isTamil ? 'none' : 'uppercase',
                  color: '#7A1C24',
                  margin: '0 0 0.15rem',
                  fontWeight: 600,
                }}
              >
                {isTamil
                  ? `${invitation.event.day.ta} | ${invitation.event.timeRange.ta}`
                  : `Sunday  |  ${invitation.event.timeRange.en}`}
              </p>
              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
                  fontStyle: isTamil ? 'normal' : 'italic',
                  fontSize: isTamil ? '0.88rem' : '0.95rem',
                  color: '#A88245',
                  margin: 0,
                }}
              >
                {isTamil ? invitation.venue.name.ta : invitation.venue.name.en} · {isTamil ? invitation.venue.city.ta : invitation.venue.city.en}
              </p>
            </div>

            {/* Interactive Wax Seal & Tap Here Indication for Mobile View */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', margin: '0.4rem 0 0.1rem' }}>
              {/* Prominent "Tap Here to Open" Indication Badge */}
              <motion.button
                type="button"
                id="btn-tap-here-indication"
                onClick={triggerOpening}
                animate={{
                  y: [0, -4, 0],
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    '0 4px 14px rgba(122, 28, 36, 0.3), 0 0 0 0 rgba(212, 175, 55, 0)',
                    '0 6px 20px rgba(122, 28, 36, 0.45), 0 0 12px rgba(212, 175, 55, 0.5)',
                    '0 4px 14px rgba(122, 28, 36, 0.3), 0 0 0 0 rgba(212, 175, 55, 0)',
                  ],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.42rem 1.15rem',
                  borderRadius: 9999,
                  background: 'linear-gradient(135deg, #7A1C24 0%, #941F28 50%, #680E16 100%)',
                  border: '1.4px solid #F5D061',
                  color: '#FFFDF8',
                  cursor: 'pointer',
                  marginBottom: '0.2rem',
                }}
                aria-label="Tap here to open invitation"
              >
                <motion.span
                  animate={{ y: [0, 2, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ fontSize: '0.95rem', display: 'inline-block' }}
                >
                  👇
                </motion.span>
                <span
                  style={{
                    fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
                    fontSize: isTamil ? '0.8rem' : '0.72rem',
                    fontWeight: 700,
                    letterSpacing: isTamil ? '0.04em' : '0.14em',
                    textTransform: isTamil ? 'none' : 'uppercase',
                    color: '#FFEAA7',
                    textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                  }}
                >
                  {invitation.texts[language].tapHere}
                </span>
                <motion.span
                  animate={{ y: [0, 2, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ fontSize: '0.95rem', display: 'inline-block' }}
                >
                  👇
                </motion.span>
              </motion.button>

              <RoyalWaxSeal onClick={triggerOpening} breaking={phase === 'breaking'} isTamil={isTamil} />
              <span
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
                  fontSize: isTamil ? '0.76rem' : '0.66rem',
                  letterSpacing: isTamil ? '0.04em' : '0.16em',
                  textTransform: isTamil ? 'none' : 'uppercase',
                  color: '#7A1C24',
                  fontWeight: 600,
                }}
              >
                {invitation.texts[language].openSealText}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
