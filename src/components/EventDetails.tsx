import { Calendar, Clock, MapPin } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import FadeUp from './FadeUp';
import GoldDivider from './GoldDivider';
import { invitation } from '../data/invitationData';
import { useLanguage } from '../context/LanguageContext';

interface DetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  extra?: string;
  index: number;
  isTamil?: boolean;
}

function DetailCard({ icon, label, value, sub, extra, index, isTamil }: DetailCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        borderColor: '#C9A86A',
        boxShadow: '0 16px 40px rgba(40,30,20,0.1)',
      }}
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid #E8DFD2',
        borderRadius: 16,
        padding: '2.5rem 1.8rem',
        textAlign: 'center',
        flex: '1 1 240px',
        maxWidth: 320,
        width: '100%',
        minWidth: 200,
        position: 'relative',
        boxShadow: '0 4px 16px rgba(40,30,20,0.04)',
        overflow: 'hidden',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Corner gold brackets */}
      {[
        { top: -1, left: -1, borderTop: '2px solid #C9A86A', borderLeft: '2px solid #C9A86A' },
        { top: -1, right: -1, borderTop: '2px solid #C9A86A', borderRight: '2px solid #C9A86A' },
        { bottom: -1, left: -1, borderBottom: '2px solid #C9A86A', borderLeft: '2px solid #C9A86A' },
        { bottom: -1, right: -1, borderBottom: '2px solid #C9A86A', borderRight: '2px solid #C9A86A' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
          style={{
            position: 'absolute',
            width: 14,
            height: 14,
            ...pos,
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(201,168,106,0.15) 0%, rgba(201,168,106,0.05) 100%)',
          border: '1px solid rgba(201,168,106,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.2rem',
          color: '#A88245',
        }}
      >
        {icon}
      </motion.div>

      <p
        style={{
          fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
          fontSize: isTamil ? '0.74rem' : '0.62rem',
          letterSpacing: isTamil ? '0.04em' : '0.24em',
          textTransform: isTamil ? 'none' : 'uppercase',
          color: '#8A7660',
          margin: '0 0 0.6rem',
          fontWeight: 600,
        }}
      >
        {label}
      </p>

      <p
        style={{
          fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', 'Cormorant Garamond', serif",
          fontSize: isTamil ? '1.18rem' : '1.35rem',
          fontWeight: 700,
          color: '#261914',
          margin: sub ? '0 0 0.35rem' : 0,
          lineHeight: 1.25,
        }}
      >
        {value}
      </p>

      {sub && (
        <p
          style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
            fontSize: isTamil ? '0.84rem' : '0.76rem',
            color: '#7B6A5A',
            margin: extra ? '0 0 0.25rem' : 0,
            letterSpacing: '0.04em',
          }}
        >
          {sub}
        </p>
      )}

      {extra && (
        <p
          style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
            fontSize: isTamil ? '0.76rem' : '0.68rem',
            color: '#A88245',
            margin: 0,
            letterSpacing: '0.04em',
            fontWeight: 600,
          }}
        >
          {extra}
        </p>
      )}
    </motion.div>
  );
}

export default function EventDetails() {
  const { language, isTamil } = useLanguage();

  return (
    <section
      id="event-details"
      style={{
        background: '#FAF7F0',
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <FadeUp>
          <p
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
              fontSize: isTamil ? '0.78rem' : '0.64rem',
              letterSpacing: isTamil ? '0.08em' : '0.36em',
              textTransform: isTamil ? 'none' : 'uppercase',
              color: '#8A7660',
              margin: '0 0 0.8rem',
              fontWeight: 600,
            }}
          >
            {''}
          </p>
          <h2
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', 'Playfair Display', serif",
              fontSize: isTamil ? 'clamp(1.7rem, 4.4vw, 2.5rem)' : 'clamp(1.9rem, 4.8vw, 2.8rem)',
              fontWeight: 700,
              color: '#7A1C24',
              margin: '0 0 0.5rem',
            }}
          >
            {isTamil ? invitation.event.type.ta : invitation.event.type.en}
          </h2>
          <p
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
              fontStyle: isTamil ? 'normal' : 'italic',
              fontSize: isTamil ? '0.95rem' : '1.1rem',
              color: '#A88245',
              margin: '0 0 2rem',
            }}
          >
            {invitation.event.subheading[language]}
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ marginBottom: '3.5rem' }}>
            <GoldDivider />
          </div>
        </FadeUp>

        {/* Detail Cards Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center',
          }}
        >
          <DetailCard
            icon={<Calendar size={22} strokeWidth={1.8} />}
            label={isTamil ? "நன்னாள் & கிழமை" : "Date & Day"}
            value={invitation.event.date[language]}
            sub={invitation.event.day[language]}
            extra={isTamil ? "சுபமுகூர்த்த நன்னாள்" : "Subamuhurtham"}
            index={0}
            isTamil={isTamil}
          />
          <DetailCard
            icon={<Clock size={22} strokeWidth={1.8} />}
            label={isTamil ? "சுப முகூர்த்த நேரம்" : "Auspicious Muhurtham"}
            value={invitation.event.timeRange[language]}
            sub={isTamil ? "காலை முகூர்த்த வேளை" : "Morning Muhurtham"}
            extra={''}
            index={1}
            isTamil={isTamil}
          />
          <DetailCard
            icon={<MapPin size={22} strokeWidth={1.8} />}
            label={isTamil ? "சுப வைபவ மண்டபம்" : "Ceremony Venue"}
            value={invitation.venue.name[language]}
            sub={`${invitation.venue.address[language]}, ${invitation.venue.city[language]}`}
            extra={invitation.venue.hall[language]}
            index={2}
            isTamil={isTamil}
          />
        </div>
      </div>
    </section>
  );
}
