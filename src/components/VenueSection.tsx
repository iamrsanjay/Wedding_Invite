import { MapPin, Navigation, Car, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeUp from './FadeUp';
import GoldDivider from './GoldDivider';
import { invitation } from '../data/invitationData';
import { useLanguage } from '../context/LanguageContext';

/* ── Animated Glowing Pin ── */
function AnimatedMapPin() {
  return (
    <div style={{
      position: 'relative',
      width: 56,
      height: 56,
      margin: '0 auto 1.5rem',
    }}>
      {/* Pulse rings */}
      <motion.div
        animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: -8,
          borderRadius: '50%',
          border: '1.5px solid rgba(201,168,106,0.4)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 2.5, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: -16,
          borderRadius: '50%',
          border: '1px solid rgba(201,168,106,0.2)',
        }}
      />
      {/* Pin icon with float animation */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,106,0.18) 0%, rgba(201,168,106,0.04) 70%)',
          color: '#A88245',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(201,168,106,0.35)',
        }}
      >
        <MapPin size={26} strokeWidth={1.6} />
      </motion.div>
    </div>
  );
}

export default function VenueSection() {
  const { language, isTamil } = useLanguage();

  return (
    <section
      id="venue"
      style={{
        background: '#FAF7F0',
        padding: '6rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <FadeUp>
          <p
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
              fontSize: isTamil ? '0.78rem' : '0.64rem',
              letterSpacing: isTamil ? '0.06em' : '0.36em',
              textTransform: isTamil ? 'none' : 'uppercase',
              color: '#8A7660',
              margin: '0 0 0.8rem',
              fontWeight: 600,
            }}
          >
            {isTamil ? 'திருமண மண்டபம் & வழித்தடம்' : 'Location & Directions'}
          </p>
          <h2
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', 'Playfair Display', serif",
              fontSize: isTamil ? 'clamp(1.7rem, 4.4vw, 2.5rem)' : 'clamp(2rem, 5vw, 2.8rem)',
              fontWeight: 700,
              color: '#7A1C24',
              margin: '0 0 0.5rem',
            }}
          >
            {isTamil ? 'சுப முகூர்த்த இடம்' : 'The Sacred Venue'}
          </h2>
          <p
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
              fontStyle: isTamil ? 'normal' : 'italic',
              fontSize: isTamil ? '0.95rem' : '1.05rem',
              color: '#A88245',
              margin: '0 0 2rem',
            }}
          >
            {isTamil ? 'இரு குடும்பங்களின் சுப சங்கமம் நிகழும் மங்கள தலம்' : 'Where Our Families & Loved Ones Come Together'}
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ marginBottom: '3.5rem' }}>
            <GoldDivider />
          </div>
        </FadeUp>

        <FadeUp delay={0.2} direction="scale">
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(40,30,20,0.1)' }}
            transition={{ duration: 0.4 }}
            style={{
              border: '1.5px solid #E2D1B2',
              borderRadius: 16,
              padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 2.8rem)',
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 12px 36px rgba(40,30,20,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Animated Map Pin */}
            <AnimatedMapPin />

            <h3
              style={{
                fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', 'Playfair Display', serif",
                fontSize: isTamil ? 'clamp(1.4rem, 4vw, 2rem)' : 'clamp(1.6rem, 4.5vw, 2.2rem)',
                fontWeight: 700,
                color: '#261914',
                margin: '0 0 0.35rem',
                lineHeight: 1.25,
              }}
            >
              {invitation.venue.name[language]}
            </h3>

            {invitation.venue.hall && (
              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cormorant Garamond', serif",
                  fontStyle: isTamil ? 'normal' : 'italic',
                  fontSize: isTamil ? '1rem' : '1.15rem',
                  color: '#7A1C24',
                  margin: '0 0 1.5rem',
                  fontWeight: 600,
                }}
              >
                {invitation.venue.hall[language]}
              </p>
            )}

            <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, #C9A86A, transparent)', margin: '0 auto 1.6rem' }} />

            <address
              style={{
                fontStyle: 'normal',
                fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
                fontSize: isTamil ? '0.92rem' : '0.9rem',
                color: '#5A4C40',
                lineHeight: 2,
                maxWidth: 480,
                margin: '0 auto',
              }}
            >
              {invitation.venue.address[language]}
              <br />
              {invitation.venue.city[language]}, {invitation.venue.district[language]}
              <br />
              {invitation.venue.state[language]} – {invitation.venue.pincode}
            </address>

            {/* Landmark Tag */}
            <motion.div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginTop: '1.2rem',
                padding: '0.4rem 1.1rem',
                background: '#FAF6EE',
                borderRadius: 20,
                border: '1px solid #E5D6BD',
              }}
            >
              <Compass size={13} color="#A88245" />
              <span
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
                  fontSize: '0.72rem',
                  color: '#7B6753',
                }}
              >
                {invitation.venue.landmark[language]}
              </span>
            </motion.div>

            {/* Navigation Action Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '2.5rem',
                flexWrap: 'wrap',
              }}
            >
              <motion.a
                id="get-directions-btn"
                href={invitation.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 28px rgba(122,28,36,0.4)',
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 2.2rem',
                  background: 'linear-gradient(135deg, #7A1C24 0%, #5B0C10 100%)',
                  color: '#FAF3E3',
                  border: '1px solid #ECC875',
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
                  fontSize: isTamil ? '0.82rem' : '0.72rem',
                  fontWeight: 600,
                  letterSpacing: isTamil ? '0.04em' : '0.16em',
                  textTransform: isTamil ? 'none' : 'uppercase',
                  textDecoration: 'none',
                  borderRadius: 50,
                  boxShadow: '0 6px 18px rgba(122,28,36,0.3)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Navigation size={14} />
                <span style={{ position: 'relative', zIndex: 2 }}>
                  {isTamil ? 'கூகுள் மேப்பில் பார்க்க' : 'Open in Google Maps'}
                </span>
              </motion.a>

              <motion.a
                href={`https://maps.google.com/?daddr=${encodeURIComponent(
                  `${invitation.venue.name.en}, ${invitation.venue.address.en}, ${invitation.venue.city.en}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, borderColor: '#A88245' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 2rem',
                  background: '#FFFFFF',
                  color: '#261914',
                  border: '1.5px solid #D8C49E',
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
                  fontSize: isTamil ? '0.8rem' : '0.72rem',
                  fontWeight: 600,
                  letterSpacing: isTamil ? '0.04em' : '0.12em',
                  textTransform: isTamil ? 'none' : 'uppercase',
                  textDecoration: 'none',
                  borderRadius: 50,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <Car size={15} color="#A88245" />
                {isTamil ? 'வழித்தடம் (Navigation)' : 'Drive Directions'}
              </motion.a>
            </div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
