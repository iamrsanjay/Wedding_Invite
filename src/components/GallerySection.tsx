import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeUp from './FadeUp';
import GoldDivider from './GoldDivider';
import coupleImg from '../assets/couple.png';
import ringsImg from '../assets/gallery_rings.jpg';
import lampImg from '../assets/gallery_lamp.jpg';
import { useLanguage } from '../context/LanguageContext';

interface LocalizedText {
  en: string;
  ta: string;
}

interface GalleryItemData {
  image: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  tag?: LocalizedText;
  accentColor?: string;
}

const galleryItems: GalleryItemData[] = [
  {
    image: coupleImg,
    title: {
      en: 'Harshavardhini & Rajagopal',
      ta: 'ஹர்ஷவர்தினி & ராஜகோபால்',
    },
    subtitle: {
      en: 'Nichayathartham • Two Hearts, One Auspicious Beginning',
      ta: 'நிச்சயதார்த்த சுபமுகூர்த்தம் • இரு மனங்களின் மங்கள தொடக்கம்',
    },
    tag: {
      en: 'The Couple',
      ta: 'மணமக்கள்',
    },
    accentColor: '#7A1C24',
  },
  {
    image: ringsImg,
    title: {
      en: 'The Sacred Rings',
      ta: 'திருமண மோதிரங்கள்',
    },
    subtitle: {
      en: 'Sparkling Solitaire Diamond & Gold Rings of Eternal Devotion',
      ta: 'அன்பின் அடையாளமாய் மிளிரும் நிச்சயதார்த்த மோதிரங்கள்',
    },
    tag: {
      en: 'Sacred Vows',
      ta: 'நிச்சயதார்த்தம்',
    },
    accentColor: '#C59B27',
  },
  {
    image: lampImg,
    title: {
      en: 'Auspicious Kuthu Vilakku',
      ta: 'மங்கள குத்துவிளக்கு',
    },
    subtitle: {
      en: 'Divine Brass Lamp Illuminating Our Journey with Grace',
      ta: 'தெய்வீக ஒளி பரப்பும் பாரம்பரிய மங்கள திருவிளக்கு',
    },
    tag: {
      en: 'Temple Radiance',
      ta: 'மங்கள ஒளி',
    },
    accentColor: '#B8860B',
  },
];

/* ── Tilt Card with Parallax Shine Effect ── */
function TiltCard({ item, index, onOpen, isTamil, language }: { item: GalleryItemData; index: number; onOpen: () => void; isTamil: boolean; language: 'en' | 'ta' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shine: { x: 50, y: 50 } });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 10,
      rotateY: x * 10,
      shine: { x: (x + 0.5) * 100, y: (y + 0.5) * 100 },
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, shine: { x: 50, y: 50 } });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          position: 'relative',
          borderRadius: 16,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #FDFBF7 0%, #FAF5EB 100%)',
          border: '1.5px solid #E2D1B2',
          boxShadow: '0 8px 30px rgba(40,25,15,0.08)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Shimmer light reflection overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${tilt.shine.x}% ${tilt.shine.y}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* Image wrapper */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 290,
            overflow: 'hidden',
            background: '#FAF6EE',
          }}
        >
          <img
            src={item.image}
            alt={item.title[language]}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: item.image === coupleImg ? 'center 14%' : 'center',
              display: 'block',
              filter: item.image === coupleImg ? 'contrast(1.04) saturate(1.06)' : 'brightness(1.02) contrast(1.04)',
              transition: 'transform 0.6s ease',
            }}
          />

          {item.tag && (
            <div
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                zIndex: 2,
                background: 'rgba(25, 12, 8, 0.72)',
                backdropFilter: 'blur(8px)',
                borderRadius: 9999,
                padding: '0.35rem 0.9rem',
                border: '1px solid rgba(212,175,55,0.4)',
                fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
                fontSize: isTamil ? '0.72rem' : '0.62rem',
                letterSpacing: isTamil ? '0.04em' : '0.18em',
                textTransform: isTamil ? 'none' : 'uppercase',
                color: '#FAF3E0',
                fontWeight: 600,
              }}
            >
              {item.tag[language]}
            </div>
          )}
        </div>

        {/* Card info */}
        <div style={{ padding: '1.4rem 1.6rem 1.6rem', textAlign: 'center' }}>
          <h4
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', 'Playfair Display', serif",
              fontSize: isTamil ? '1.15rem' : '1.25rem',
              fontWeight: 700,
              color: '#261914',
              margin: '0 0 0.35rem',
            }}
          >
            {item.title[language]}
          </h4>
          <p
            style={{
              fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
              fontSize: isTamil ? '0.82rem' : '0.78rem',
              color: '#7B6A5A',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {item.subtitle[language]}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const { language, isTamil } = useLanguage();

  return (
    <>
      <section
        id="gallery"
        style={{
          background: '#FAF7F0',
          padding: '6rem 1.5rem',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1040, margin: '0 auto', textAlign: 'center' }}>
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
              {isTamil ? 'மங்கள தருணங்கள்' : 'Auspicious Moments'}
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
              {isTamil ? 'வைபவ நினைவுகள்' : 'Ceremonial Elegance'}
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
              {isTamil ? 'அன்பின் மலர்ச்சி • மங்கள சடங்குகள் • அழியா நினைவுகள்' : 'Vows of Love, Sacred Traditions & Golden Memories'}
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ marginBottom: '3.5rem' }}>
              <GoldDivider />
            </div>
          </FadeUp>

          {/* Gallery Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.8rem',
            }}
          >
            {galleryItems.map((item, index) => (
              <TiltCard
                key={index}
                item={item}
                index={index}
                onOpen={() => setLightboxIdx(index)}
                isTamil={isTamil}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 150,
              background: 'rgba(15,8,5,0.92)',
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
                onClick={() => setLightboxIdx(null)}
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
                  zIndex: 10,
                }}
              >
                ×
              </button>

              <img
                src={galleryItems[lightboxIdx].image}
                alt={galleryItems[lightboxIdx].title[language]}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 'min(80vh, 800px)',
                  objectFit: 'contain',
                  borderRadius: 16,
                  display: 'block',
                }}
              />

              <p
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', serif",
                  color: '#FFFDF8',
                  fontSize: '1rem',
                  textAlign: 'center',
                  margin: '0.6rem 0 0.2rem',
                  letterSpacing: '0.06em',
                }}
              >
                {galleryItems[lightboxIdx].title[language]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
