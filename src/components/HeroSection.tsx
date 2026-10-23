import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { invitation } from '../data/invitationData';
import GoldDivider from './GoldDivider';
import TextReveal from './TextReveal';
import coupleImg from '../assets/couple.png';
import { useLanguage } from '../context/LanguageContext';

/* ── Floating Gold Dust Particles for Hero ── */
function HeroGoldenDust() {
  const [particles] = useState(() =>
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.8 + 0.8,
      duration: 8 + Math.random() * 14,
      delay: Math.random() * 8,
      driftX: (Math.random() - 0.5) * 40,
    }))
  );

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 3 }} aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}%`, y: `${p.y}%`, scale: 0 }}
          animate={{
            opacity: [0, 0.9, 0.5, 0],
            y: [`${p.y}%`, `${p.y - 18}%`],
            x: [`${p.x}%`, `${p.x + p.driftX * 0.3}%`],
            scale: [0, 1.3, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: '#F5D061',
            boxShadow: `0 0 ${p.size * 3}px rgba(245,208,97,0.75)`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated Interlocking Rings ── */
function AnimatedRings() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.1, duration: 1, type: 'spring', stiffness: 180, damping: 15 }}
      style={{ margin: '0.8rem 0', position: 'relative' }}
    >
      <svg width="68" height="38" viewBox="0 0 68 38" fill="none">
        {/* Left ring */}
        <motion.circle
          cx="24" cy="19" r="14"
          stroke="#F5D061" strokeWidth="2.5" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Right ring */}
        <motion.circle
          cx="44" cy="19" r="14"
          stroke="#ECC875" strokeWidth="2.5" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Sparkle at intersection */}
        <motion.circle
          cx="34" cy="11" r="3" fill="#FFFFFF"
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.6, 0.8],
            filter: ['blur(0px)', 'blur(1.5px)', 'blur(0px)'],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Gold shimmer ring */}
        <motion.circle
          cx="34" cy="11" r="6"
          fill="none"
          stroke="rgba(245,208,97,0.5)"
          strokeWidth="1.2"
          animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const { isTamil } = useLanguage();

  const rawBgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rawTextY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rawOp = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  const bgY = useSpring(rawBgY, { stiffness: 80, damping: 25 });
  const textY = useSpring(rawTextY, { stiffness: 80, damping: 25 });
  const op = useSpring(rawOp, { stiffness: 100, damping: 30 });
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });

  const brideDisplay = isTamil ? invitation.bride.name.ta : invitation.bride.fullDisplay.en;
  const groomDisplay = isTamil ? invitation.groom.name.ta : invitation.groom.fullDisplay.en;
  const ceremonyTitle = isTamil ? invitation.event.type.ta : invitation.event.type.en;

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: '100dvh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5.5rem 1.25rem 4.5rem',
        textAlign: 'center',
        overflow: 'hidden',
        background: '#120A07',
      }}
    >
      {/* ── COUPLE PHOTO CLEARLY & PROPERLY VISIBLE IN THE BACKGROUND ── */}
      <motion.div
        aria-label="Couple Background"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${coupleImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 16%',
          backgroundRepeat: 'no-repeat',
          y: bgY,
          scale: 1.04,
          zIndex: 1,
          filter: 'contrast(1.05) saturate(1.08) brightness(0.96)',
        }}
      />

      {/* ── Soft Golden Warm Vignette — Preserving Full Clear Visibility of the Couple ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(14, 7, 5, 0.48) 0%, rgba(14, 7, 5, 0.16) 28%, rgba(14, 7, 5, 0.22) 60%, rgba(10, 5, 4, 0.78) 100%), radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.08) 0%, rgba(14, 7, 5, 0.32) 75%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Ambient Golden Aura ── */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.18, 0.3, 0.18],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 750,
          height: 750,
          background: 'radial-gradient(circle, rgba(245,208,97,0.35) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Floating Gold Dust Particles ── */}
      <HeroGoldenDust />

      {/* ── Temple Gopuram Arch Motif ── */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.16, scale: 1 }}
        transition={{ delay: 0.5, duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        width="380"
        height="320"
        viewBox="0 0 380 320"
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        <motion.path
          d="M190 10 C130 60 70 140 70 280 H310 C310 140 250 60 190 10 Z"
          stroke="#F5D061"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 3, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle cx="190" cy="18" r="5" fill="#F5D061" />
        <motion.circle cx="190" cy="5" r="2.5" fill="#FFE599" />
      </motion.svg>

      {/* ── Main Content with Royal Backdrop ── */}
      <motion.div
        style={{
          y: textY,
          opacity: op,
          scale,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 4,
          width: '100%',
          maxWidth: 920,
        }}
      >

        {/* Ceremony Subtitle */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: isTamil ? '0.06em' : '0.34em' }}
          transition={{ delay: 0.35, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', 'Inter', sans-serif",
            fontSize: isTamil ? 'clamp(1.15rem, 3.2vw, 1.45rem)' : 'clamp(0.78rem, 2.2vw, 1rem)',
            color: '#FFE599',
            textTransform: isTamil ? 'none' : 'uppercase',
            margin: '0.2rem 0 0.8rem',
            fontWeight: 700,
            textShadow: '0 2px 14px rgba(0,0,0,0.9), 0 0 10px rgba(245,208,97,0.5)',
          }}
        >
          {ceremonyTitle}
        </motion.p>

        {/* 1) Ponnu Per Strictly First: Bride Name (No Wrap) */}
        <div
          style={{
            maxWidth: '100%',
            overflow: 'hidden',
            padding: '0.1rem 0.5rem',
            textAlign: 'center',
            marginBottom: '0.2rem',
          }}
        >
          <TextReveal
            text={brideDisplay}
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', 'Playfair Display', serif",
              fontSize: isTamil ? 'clamp(1.7rem, 6vw, 3.2rem)' : 'clamp(1.6rem, 5.8vw, 3.3rem)',
              fontWeight: 700,
              color: '#FFFDF8',
              letterSpacing: isTamil ? '0.03em' : '0.06em',
              lineHeight: 1.15,
              whiteSpace: 'nowrap',
              textShadow: '0 3px 20px rgba(0,0,0,0.95), 0 0 18px rgba(212,175,55,0.7), 0 1px 3px rgba(0,0,0,0.9)',
              textAlign: 'center',
            }}
            delay={0.5}
            stagger={0.06}
          />
        </div>

        {/* Bride Alias & Degree */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.85, duration: 0.9 }}
          style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
            fontStyle: isTamil ? 'normal' : 'italic',
            fontSize: isTamil ? '0.92rem' : 'clamp(0.95rem, 2.8vw, 1.25rem)',
            color: '#F0DFBE',
            margin: '0.1rem 0 0.4rem',
            letterSpacing: '0.04em',
            textShadow: '0 2px 10px rgba(0,0,0,0.9)',
            textAlign: 'center',
          }}
        >
          ({isTamil ? 'எ' : 'alias'} {isTamil ? invitation.bride.alias.ta : invitation.bride.alias.en}) • {invitation.bride.qualification}
        </motion.p>

        {/* Interlocking Golden Rings Motif */}
        <AnimatedRings />

        {/* 2) Paiyan Peru Strictly Second: Groom Name (No Wrap) */}
        <div
          style={{
            maxWidth: '100%',
            overflow: 'hidden',
            padding: '0.1rem 0.5rem',
            textAlign: 'center',
            marginBottom: '0.2rem',
          }}
        >
          <TextReveal
            text={groomDisplay}
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', 'Playfair Display', serif",
              fontSize: isTamil ? 'clamp(1.7rem, 6vw, 3.2rem)' : 'clamp(1.6rem, 5.8vw, 3.3rem)',
              fontWeight: 700,
              color: '#FFFDF8',
              letterSpacing: isTamil ? '0.03em' : '0.06em',
              lineHeight: 1.15,
              whiteSpace: 'nowrap',
              textShadow: '0 3px 20px rgba(0,0,0,0.95), 0 0 18px rgba(212,175,55,0.7), 0 1px 3px rgba(0,0,0,0.9)',
              textAlign: 'center',
            }}
            delay={1.2}
            stagger={0.06}
          />
        </div>

        {/* Groom Qualification & Company */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
            fontStyle: isTamil ? 'normal' : 'italic',
            fontSize: isTamil ? '0.92rem' : '1.15rem',
            color: '#F0DFBE',
            margin: '0.1rem 0 1.2rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.9)',
          }}
        >
          {invitation.groom.qualification} • {isTamil ? invitation.groom.designation.ta : invitation.groom.designation.en} ({isTamil ? invitation.groom.company.ta : invitation.groom.company.en})
        </motion.p>

        {/* Gold Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.2 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', maxWidth: 360, margin: '1rem auto 1.6rem' }}
        >
          <GoldDivider />
        </motion.div>

        {/* Date / Time Card — Frosted Glass Container with high legibility */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 2.0, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            alignItems: 'center',
            background: 'rgba(20, 10, 6, 0.72)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1.2px solid rgba(245, 208, 97, 0.45)',
            borderRadius: 18,
            padding: '1.2rem clamp(1.4rem, 4vw, 2.5rem)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.2)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', serif",
              fontSize: isTamil ? 'clamp(1.15rem, 3.4vw, 1.45rem)' : 'clamp(1.2rem, 3.8vw, 1.55rem)',
              color: '#FFFDF8',
              margin: 0,
              letterSpacing: isTamil ? '0.04em' : '0.14em',
              fontWeight: 700,
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            {isTamil ? invitation.event.date.ta : invitation.event.date.en}
          </p>
          <p
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
              fontSize: isTamil ? '0.86rem' : '0.74rem',
              letterSpacing: isTamil ? '0.04em' : '0.22em',
              textTransform: isTamil ? 'none' : 'uppercase',
              color: '#F5D061',
              margin: 0,
              fontWeight: 600,
            }}
          >
            {isTamil
              ? `${invitation.event.day.ta} · ${invitation.event.timeRange.ta}`
              : `Sunday · ${invitation.event.timeRange.en}`}
          </p>
          <p
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
              fontStyle: isTamil ? 'normal' : 'italic',
              fontSize: isTamil ? '0.98rem' : '1.1rem',
              color: '#E8CA7B',
              margin: '0.2rem 0 0',
              letterSpacing: '0.04em',
            }}
          >
            {isTamil ? invitation.venue.name.ta : invitation.venue.name.en}, {isTamil ? invitation.venue.city.ta : invitation.venue.city.en}
          </p>
        </motion.div>
      </motion.div>

      {/* ── Animated Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1.2 }}
        style={{ position: 'absolute', bottom: '1.6rem', left: '50%', transform: 'translateX(-50%)', zIndex: 4 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{
            width: 1.5,
            height: 38,
            background: 'linear-gradient(to bottom, #F5D061, transparent)',
            margin: '0 auto',
          }}
        />
        <motion.span
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
            fontSize: isTamil ? '0.72rem' : '0.54rem',
            letterSpacing: '0.22em',
            textTransform: isTamil ? 'none' : 'uppercase',
            color: '#ECC875',
            display: 'block',
            marginTop: '0.35rem',
          }}
        >
          {isTamil ? 'கீழே காண்க' : 'Scroll'}
        </motion.span>
      </motion.div>
    </section>
  );
}
