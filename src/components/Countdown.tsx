import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeUp from './FadeUp';
import GoldDivider from './GoldDivider';
import { engagementDate, invitation } from '../data/invitationData';
import { useLanguage } from '../context/LanguageContext';

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

function pad(n: number) { return String(n).padStart(2, '0'); }

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, engagementDate.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* ── Premium Countdown Card with 3D Flip ──────────────────────────── */
function CountCard({ value, label, prev, isTamil }: { value: string; label: string; prev: string; isTamil: boolean }) {
  const isChanging = value !== prev;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: '0.6rem', minWidth: 'clamp(68px, 16vw, 96px)',
    }}>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(201,168,106,0.18)' }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative',
          background: 'rgba(253,251,247,0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1.2px solid var(--border)',
          borderRadius: 12,
          padding: 'clamp(1rem, 3vw, 1.5rem) clamp(0.8rem, 2.5vw, 1.2rem)',
          width: '100%',
          textAlign: 'center',
          overflow: 'hidden',
          transition: 'border-color 0.4s ease',
          boxShadow: '0 4px 16px rgba(40,25,15,0.06)',
        }}
      >
        {/* Corner accents */}
        {[
          { top: -1, left: -1, borderTop: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)' },
          { top: -1, right: -1, borderTop: '2px solid var(--gold)', borderRight: '2px solid var(--gold)' },
          { bottom: -1, left: -1, borderBottom: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)' },
          { bottom: -1, right: -1, borderBottom: '2px solid var(--gold)', borderRight: '2px solid var(--gold)' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            animate={isChanging ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.35 }}
            style={{
              position: 'absolute',
              width: 10, height: 10,
              ...pos,
            }}
          />
        ))}

        {/* Shimmer sweep on flip */}
        {isChanging && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(201,168,106,0.25), transparent)',
              pointerEvents: 'none',
            }}
          />
        )}

        <div style={{ position: 'relative', height: 'clamp(2.4rem, 6vw, 3.4rem)', overflow: 'hidden' }}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: 24, opacity: 0, rotateX: -60 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -24, opacity: 0, rotateX: 60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'block',
                fontFamily: "'Cinzel', 'Playfair Display', serif",
                fontSize: 'clamp(2rem, 5.5vw, 3rem)',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      <p style={{
        fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
        fontSize: isTamil ? '0.74rem' : '0.58rem',
        letterSpacing: isTamil ? '0.04em' : '0.24em',
        textTransform: isTamil ? 'none' : 'uppercase',
        color: '#7A1C24',
        margin: 0,
        fontWeight: 600,
      }}>
        {label}
      </p>
    </div>
  );
}

/* ── Separator dot ── */
function SepDot() {
  return (
    <motion.div
      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        color: 'var(--gold)',
        fontSize: '1.8rem',
        fontFamily: 'Cormorant Garamond, serif',
        marginTop: 'clamp(0.8rem, 2.5vw, 1.3rem)',
      }}
    >
      ·
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [prev, setPrev] = useState<TimeLeft>(getTimeLeft());
  const isOver = engagementDate.getTime() <= Date.now();
  const { language, isTamil } = useLanguage();

  useEffect(() => {
    const id = setInterval(() => {
      setPrev(timeLeft);
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const cols = [
    { value: String(timeLeft.days),       label: isTamil ? 'நாட்கள்' : 'Days',    prev: String(prev.days) },
    { value: pad(timeLeft.hours),          label: isTamil ? 'மணிகள்' : 'Hours',   prev: pad(prev.hours) },
    { value: pad(timeLeft.minutes),        label: isTamil ? 'நிமிடங்கள்' : 'Minutes', prev: pad(prev.minutes) },
    { value: pad(timeLeft.seconds),        label: isTamil ? 'வினாடிகள்' : 'Seconds', prev: pad(prev.seconds) },
  ];

  return (
    <section
      id="countdown"
      style={{
        background: 'var(--ivory)',
        padding: '5.5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <FadeUp>
          <p style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
            fontSize: isTamil ? '0.78rem' : '0.64rem',
            letterSpacing: isTamil ? '0.06em' : '0.35em',
            textTransform: isTamil ? 'none' : 'uppercase',
            color: '#8A7660',
            margin: '0 0 0.8rem',
            fontWeight: 600,
          }}>
            {isTamil ? 'சுபமுகூர்த்த வைபவத்திற்கு இன்னும்' : 'Counting Down To'}
          </p>
          <h2 style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', 'Playfair Display', serif",
            fontSize: isTamil ? 'clamp(1.7rem, 4.4vw, 2.4rem)' : 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 700,
            color: '#7A1C24',
            margin: '0 0 2rem',
          }}>
            {isTamil ? 'நிச்சயதார்த்த சுப நன்னாள்' : 'The Sacred Muhurtham'}
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ marginBottom: '2.5rem' }}>
            <GoldDivider />
          </div>
        </FadeUp>

        <FadeUp delay={0.2} direction="scale">
          {isOver ? (
            <motion.p
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontFamily: isTamil ? "'Noto Serif Tamil', serif" : 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'var(--gold)', margin: 0, fontStyle: isTamil ? 'normal' : 'italic' }}
            >
              {isTamil ? 'சுப வைபவம் தொடங்கியது ✦' : 'The celebration has begun ✦'}
            </motion.p>
          ) : (
            <div style={{ display: 'flex', gap: 'clamp(0.8rem, 3vw, 1.8rem)', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {cols.map((col, i) => (
                <div key={col.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(0.8rem, 3vw, 1.8rem)' }}>
                  <CountCard value={col.value} label={col.label} prev={col.prev} isTamil={isTamil} />
                  {i < cols.length - 1 && <SepDot />}
                </div>
              ))}
            </div>
          )}
        </FadeUp>

        <FadeUp delay={0.4}>
          <div style={{ marginTop: '2.8rem' }}>
            <GoldDivider label={invitation.event.date[language]} />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
