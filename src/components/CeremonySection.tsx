import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import FadeUp from './FadeUp';
import GoldDivider from './GoldDivider';
import { invitation, type CeremonyTimelineItem } from '../data/invitationData';
import { useLanguage } from '../context/LanguageContext';

function TimelineNode({ item, index, isTamil }: { item: CeremonyTimelineItem; index: number; isTamil: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.36, 1] }}
      className="timeline-item-row"
    >
      {/* Desktop Time Column */}
      <div className="timeline-time-desktop">
        <p style={{
          fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', 'Cormorant Garamond', serif",
          fontSize: isTamil ? '0.88rem' : 'clamp(0.95rem, 2.5vw, 1.1rem)',
          color: '#A88245', margin: 0,
          fontWeight: 700,
          letterSpacing: isTamil ? '0.02em' : '0.05em', lineHeight: 1.4,
        }}>
          {item.time}
        </p>
      </div>

      {/* Dot with pulse ring */}
      <div className="timeline-node-dot" style={{ position: 'relative', flexShrink: 0, zIndex: 2 }}>
        <motion.div
          animate={inView ? { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] } : {}}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
          style={{
            position: 'absolute', inset: -6,
            borderRadius: '50%', border: '1px solid #D4AF37',
          }}
        />
        <div style={{
          width: 14, height: 14, borderRadius: '50%',
          background: '#D4AF37',
          border: '3px solid #FAF7F0',
          outline: '1.5px solid #D4AF37',
          boxShadow: '0 0 14px rgba(201,168,106,0.5)',
        }} />
      </div>

      {/* Content card */}
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          background: 'rgba(255,255,255,0.92)',
          border: '1.2px solid #E8DFD2',
          borderRadius: 12, padding: '1.25rem 1.6rem',
          flex: 1, position: 'relative', overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(40,25,15,0.04)',
        }}
      >
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
          background: 'linear-gradient(to bottom, #D4AF37, #A88245)',
        }} />

        {/* Mobile-Only Time Badge above Event Title */}
        <div className="timeline-time-mobile">
          <span style={{ fontSize: '0.85rem' }}>⏱️</span>
          <span style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', 'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: isTamil ? '0.84rem' : '0.8rem',
            letterSpacing: '0.04em',
            color: '#8B6425',
          }}>
            {item.time}
          </span>
        </div>

        <p style={{
          fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', 'Playfair Display', serif",
          fontSize: isTamil ? '1.08rem' : 'clamp(1.1rem, 2.8vw, 1.3rem)',
          fontWeight: 700, color: '#7A1C24', margin: '0 0 0.4rem',
        }}>
          <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
          {item.title}
        </p>
        {item.description && (
          <p style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
            fontSize: isTamil ? '0.84rem' : '0.82rem',
            color: '#6B6055', margin: 0, lineHeight: 1.8, maxWidth: 440,
          }}>
            {item.description}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function CeremonySection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 0.85', 'end 0.5'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const { language, isTamil } = useLanguage();

  const currentTimeline = invitation.timeline[language];

  return (
    <section id="ceremony" style={{ background: '#FAF7F0', padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <FadeUp>
          <p style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
            fontSize: isTamil ? '0.76rem' : '0.62rem',
            letterSpacing: isTamil ? '0.06em' : '0.38em',
            textTransform: isTamil ? 'none' : 'uppercase',
            color: '#8A7660',
            margin: '0 0 0.8rem',
            fontWeight: 600,
          }}>
            {isTamil ? 'நிகழ்ச்சி நிரல்' : 'Ceremony Schedule'}
          </p>
          <h2 style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', 'Playfair Display', serif",
            fontSize: isTamil ? 'clamp(1.7rem, 4.4vw, 2.5rem)' : 'clamp(1.9rem, 5vw, 2.8rem)',
            fontWeight: 700,
            color: '#7A1C24',
            margin: '0 0 0.5rem',
          }}>
            {isTamil ? 'சுப முகூர்த்த நிகழ்வுகள்' : 'On the Auspicious Day'}
          </h2>
          <p style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
            fontStyle: isTamil ? 'normal' : 'italic',
            fontSize: isTamil ? '0.95rem' : '1.05rem',
            color: '#A88245',
            margin: '0 0 2.2rem',
          }}>
            {invitation.event.date[language]} · {invitation.event.day[language]}
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ marginBottom: '3.5rem' }}><GoldDivider /></div>
        </FadeUp>

        {/* Timeline */}
        <div ref={lineRef} style={{ position: 'relative', textAlign: 'left' }}>
          {/* Animated gold line */}
          <div className="timeline-gold-line">
            <motion.div
              style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                background: 'linear-gradient(to bottom, #D4AF37 0%, rgba(201,168,106,0.4) 100%)',
                height: lineHeight,
              }}
            />
          </div>

          {currentTimeline.map((item, i) => (
            <TimelineNode key={i} item={item} index={i} isTamil={isTamil} />
          ))}
        </div>

        <FadeUp delay={0.4}>
          <div style={{ marginTop: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
            <GoldDivider />
            <span
              style={{
                display: 'inline-block', padding: '0.6rem 2.2rem',
                border: '1.2px solid #D4AF37', borderRadius: 9999,
                fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
                fontSize: isTamil ? '0.8rem' : '0.66rem',
                letterSpacing: isTamil ? '0.04em' : '0.22em',
                textTransform: isTamil ? 'none' : 'uppercase',
                color: '#7A1C24',
                background: '#FAF6EE',
                fontWeight: 600,
              }}
            >
              {isTamil ? invitation.event.nameTamilStyle.ta : invitation.event.type.en}
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
