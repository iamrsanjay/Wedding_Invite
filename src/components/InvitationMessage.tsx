import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import FadeUp from './FadeUp';
import GoldDivider from './GoldDivider';
import { invitation } from '../data/invitationData';
import { useLanguage } from '../context/LanguageContext';

/* ── Tiny flickering lamp decoration ── */
function SmallLamp() {
  return (
    <svg width="20" height="32" viewBox="0 0 20 32" fill="none" opacity="0.5">
      <motion.path d="M10 4 C8.5 8 7 12 10 14 C13 12 11.5 8 10 4Z" fill="#FF8C00"
        animate={{ scaleY: [1, 1.15, 0.9, 1.08, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '10px 14px' }}
      />
      <ellipse cx="10" cy="15" rx="5" ry="2.5" fill="#C9A86A" />
      <rect x="8.5" y="16" width="3" height="8" rx="1.5" fill="#B8860B" />
      <path d="M4 24 H16 L15 28 H5 Z" fill="#C9A86A" />
      <path d="M6 28 H14 L13 32 H7 Z" fill="#A88245" />
    </svg>
  );
}

/* ── Paper reveal animation wrapper ── */
function PaperReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      {children}
      <motion.div
        initial={{ y: '0%' }}
        animate={inView ? { y: '102%' } : { y: '0%' }}
        transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute', inset: 0,
          background: 'var(--white)',
          zIndex: 5,
        }}
      />
    </div>
  );
}

export default function InvitationMessage() {
  const [eggFound, setEggFound] = useState(false);
  const { language, isTamil } = useLanguage();

  return (
    <section
      id="invitation-message"
      style={{ background: '#FAF7F0', padding: '7rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: 620, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Lord Ganesha header */}
        <FadeUp>
          <p style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
            fontSize: isTamil ? '0.88rem' : '0.74rem',
            letterSpacing: isTamil ? '0.04em' : '0.25em',
            textTransform: isTamil ? 'none' : 'uppercase',
            color: '#7A1C24',
            margin: '0 0 1.5rem',
            fontWeight: 600,
          }}>
            {invitation.texts[language].divineHeader}
          </p>
        </FadeUp>

        {/* Lamp decorations */}
        <FadeUp delay={0.15}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem' }}>
            <SmallLamp />
            <SmallLamp />
            <SmallLamp />
          </div>
        </FadeUp>

        {/* Opening blessing — paper reveal */}
        <PaperReveal delay={0.2}>
          <FadeUp delay={0}>
            <p style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', 'Cormorant Garamond', serif",
              fontSize: isTamil ? '1.15rem' : '1.35rem',
              color: '#A88245', fontStyle: isTamil ? 'normal' : 'italic', margin: '0 0 2rem',
              letterSpacing: '0.04em',
            }}>
              {invitation.texts[language].openingBlessing}
            </p>
          </FadeUp>
        </PaperReveal>

        {/* Invitation body — paper reveal */}
        <PaperReveal delay={0.35}>
          <FadeUp delay={0}>
            <p style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
              fontSize: isTamil ? '0.92rem' : '0.9rem',
              lineHeight: 1.9, color: 'var(--text-muted)',
              whiteSpace: 'pre-line', margin: '0 0 3rem',
            }}>
              {invitation.texts[language].invitationBody}
            </p>
          </FadeUp>
        </PaperReveal>

        {/* Couple names card */}
        <FadeUp delay={0.4}>
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(41,37,33,0.1)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              border: '1px solid var(--border)',
              padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)',
              margin: '0 0 3rem',
              position: 'relative',
              background: 'var(--ivory)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {/* Bride (Ponnu Per First) */}
            <p style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', serif",
              fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
              fontWeight: 700, color: 'var(--text)', margin: '0 0 0.25rem', letterSpacing: '0.06em'
            }}>
              {invitation.bride.name[language]}
            </p>
            <p style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
              fontSize: '0.68rem', letterSpacing: '0.12em', color: 'var(--text-muted)', margin: '0 0 1.5rem'
            }}>
              {invitation.bride.qualification} · ({isTamil ? 'எ' : 'alias'} {invitation.bride.alias[language]})
            </p>

            {/* Interlocking rings */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 1.5rem' }}>
              <svg width="44" height="24" viewBox="0 0 60 32" fill="none">
                <circle cx="22" cy="16" r="12" stroke="#C9A86A" strokeWidth="1.5" fill="none" />
                <circle cx="38" cy="16" r="12" stroke="#C9A86A" strokeWidth="1.5" fill="none" />
                <circle cx="22" cy="16" r="4" fill="rgba(201,168,106,0.15)" />
                <circle cx="38" cy="16" r="4" fill="rgba(201,168,106,0.15)" />
              </svg>
            </div>

            {/* Groom (Paiyan Peru Second) */}
            <p style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', serif",
              fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
              fontWeight: 700, color: 'var(--text)', margin: '0 0 0.25rem', letterSpacing: '0.06em'
            }}>
              {invitation.groom.name[language]}
            </p>
            <p style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
              fontSize: '0.68rem', letterSpacing: '0.12em', color: 'var(--text-muted)', margin: 0
            }}>
              {invitation.groom.qualification} · {invitation.groom.designation[language]}
            </p>

            {/* Hidden Easter Egg: click the ornament */}
            <motion.button
              onClick={() => setEggFound(true)}
              whileHover={{ scale: 1.2, rotate: 45 }}
              style={{
                position: 'absolute', bottom: 12, right: 12, background: 'none',
                border: 'none', cursor: 'pointer', color: 'var(--gold)',
                fontSize: '0.8rem', opacity: 0.35,
              }}
              title="A small token of love"
            >
              ✦
            </motion.button>
          </motion.div>
        </FadeUp>

        {/* Easter egg popup */}
        <AnimatePresence>
          {eggFound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: 'var(--ivory)', border: '1px solid var(--gold)',
                borderRadius: 8, padding: '1.25rem 2rem',
                margin: '0 0 2.5rem', position: 'relative',
              }}
            >
              <p style={{ fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif", fontStyle: isTamil ? 'normal' : 'italic', fontSize: '1.05rem', color: '#7A1C24', margin: 0, lineHeight: 1.8 }}>
                {isTamil ? '"அன்பும் ஆசியும் பொழிய, தங்களின் நல்வரவை எதிர்நோக்குகிறோம்." 🌸' : '"With love, laughter and blessings, we look forward to celebrating with you." 🌸'}
              </p>
              <motion.button
                onClick={() => setEggFound(false)}
                style={{ position: 'absolute', top: 8, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.7rem' }}
              >
                ✕
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closing blessing */}
        <PaperReveal delay={0.5}>
          <FadeUp delay={0}>
            <p style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
              fontSize: '1.15rem', color: '#7A1C24', fontStyle: isTamil ? 'normal' : 'italic', margin: 0, letterSpacing: '0.04em'
            }}>
              {invitation.texts[language].closingBlessing}
            </p>
          </FadeUp>
        </PaperReveal>

        <FadeUp delay={0.6}>
          <div style={{ marginTop: '2.5rem' }}><GoldDivider /></div>
        </FadeUp>
      </div>
    </section>
  );
}
