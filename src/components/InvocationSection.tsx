import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeUp from './FadeUp';
import mandalaBg from '../assets/mandala_bg.png';
import { useLanguage } from '../context/LanguageContext';
import { invitation } from '../data/invitationData';

interface ShowerPetal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  shape: 'rose' | 'jasmine' | 'gold';
}

/* ── 4-point Diamond Star SVG matching Image 1 ── */
function SparkleStar() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#C59B27" />
    </svg>
  );
}

/* ── Delicate Flower Icon matching Image 1 ── */
function FlowerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C59B27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-7" />
      <path d="M9 11c-2.2 0-3.8-1.8-3.8-4 0-2.8 2.8-4 6.8-4s6.8 1.2 6.8 4c0 2.2-1.6 4-3.8 4" />
      <circle cx="12" cy="7" r="3.2" fill="rgba(197,155,39,0.18)" stroke="#C59B27" />
    </svg>
  );
}

/* ── Exact Petals matching the reference image layout, placed along outer borders ── */
const REFERENCE_PETALS = [
  { id: 1, left: '2%',    top: '12%', size: 9,  rotate: 25,  color: '#D8B257', type: 'gold', shadow: 'rgba(216,178,87,0.45)' },
  { id: 2, left: '96%',   top: '22%', size: 12, rotate: -25, color: '#D81B60', type: 'rose', shadow: 'rgba(216,27,96,0.6)' },
  { id: 3, left: '94%',   top: '78%', size: 10, rotate: 50,  color: '#E8CA7B', type: 'gold', shadow: 'rgba(232,202,123,0.5)' },
  { id: 4, left: '3%',    top: '85%', size: 9,  rotate: -15, color: '#C2185B', type: 'rose', shadow: 'rgba(194,24,91,0.6)' },
  { id: 5, left: '1.5%',  top: '48%', size: 8,  rotate: 40,  color: '#ECD79B', type: 'gold', shadow: 'rgba(236,215,155,0.4)' },
  { id: 6, left: '97%',   top: '55%', size: 10, rotate: 55,  color: '#E91E63', type: 'rose', shadow: 'rgba(233,30,99,0.6)' },
];

export default function InvocationSection() {
  const { language, isTamil } = useLanguage();
  const [showerCount, setShowerCount] = useState(0);
  const [activePetals, setActivePetals] = useState<ShowerPetal[]>([]);
  const [blessingToasts, setBlessingToasts] = useState<{ id: number; text: string }[]>([]);

  const handleFlowerShower = useCallback(() => {
    setShowerCount((prev) => prev + 1);

    const newBatchId = Date.now();
    const colors = [
      { color: '#D81B60', shape: 'rose' as const },      // Deep Dark Pink Rose Petal
      { color: '#E02868', shape: 'rose' as const },      // Rich Rose Dark Pink
      { color: '#C2185B', shape: 'rose' as const },      // Crimson Dark Pink
      { color: '#E91E63', shape: 'rose' as const },      // Radiant Dark Rose Pink
      { color: '#AD1457', shape: 'rose' as const },      // Deep Magenta Rose
      { color: '#E2C374', shape: 'gold' as const },      // Champagne Gold
      { color: '#FFFDF5', shape: 'jasmine' as const },   // Cream Jasmine
    ];

    const generatedPetals: ShowerPetal[] = Array.from({ length: 22 }, (_, i) => {
      const type = colors[i % colors.length];
      return {
        id: newBatchId + i,
        x: (Math.random() - 0.5) * 400,
        y: -120 - Math.random() * 260,
        size: Math.random() * 8 + 9,
        rotation: Math.random() * 360,
        color: type.color,
        shape: type.shape,
      };
    });

    setActivePetals((prev) => [...prev.slice(-30), ...generatedPetals]);

    const toastId = Date.now();
    const blessings = isTamil
      ? ['🌸 வாழ்த்துகள்!', '✨ நீடூழி வாழ்க!', '💐 மங்களம் உண்டாகட்டும்!', '💖 அன்பு பெருகட்டும்!', '🪔 தெய்வீக அருள்!']
      : ['🌸 வாழ்த்துகள்!', '✨ Divine Blessings!', '💐 With Joy & Love!', '💖 Sacred Wishes!'];
    const text = blessings[Math.floor(Math.random() * blessings.length)];
    setBlessingToasts((prev) => [...prev.slice(-3), { id: toastId, text }]);

    setTimeout(() => {
      setActivePetals((prev) => prev.filter((p) => !generatedPetals.some((gp) => gp.id === p.id)));
    }, 2400);

    setTimeout(() => {
      setBlessingToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 1800);
  }, [isTamil]);

  return (
    <section
      id="invocation"
      style={{
        position: 'relative',
        padding: '5rem 1.25rem',
        background: 'radial-gradient(ellipse at 50% 50%, #FAF7F0 0%, #F5EFE3 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Background Subtle Mandala Backing Layer ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${mandalaBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* ── Floating Scattered Petals around card (from reference image) ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
        {REFERENCE_PETALS.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [0, -8, 0],
              x: [0, 3, 0],
              rotate: [p.rotate, p.rotate + 12, p.rotate],
              opacity: [0.85, 1, 0.85],
            }}
            transition={{
              duration: 4.5 + p.id,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.id * 0.4,
            }}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: p.type === 'gold' ? p.size * 1.5 : p.size,
              height: p.size * 0.75,
              background: p.color,
              borderRadius:
                p.type === 'rose'
                  ? '60% 40% 70% 30% / 50% 60% 40% 50%'
                  : '40% 60% 50% 50% / 60% 40% 60% 40%',
              boxShadow: `0 2px 8px ${p.shadow}`,
            }}
          />
        ))}
      </div>

      {/* ── THE ELEGANT MAIN CARD (Exact replica of Image 1) ── */}
      <FadeUp>
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            width: '100%',
            maxWidth: 820,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(254,252,248,0.94) 100%)',
            border: '1.2px solid #E6D5B4',
            borderRadius: 36,
            boxShadow:
              '0 20px 60px rgba(180, 140, 70, 0.12), 0 4px 16px rgba(0,0,0,0.03)',
            padding: 'clamp(2.2rem, 5vw, 3.6rem) clamp(0.9rem, 3.5vw, 2rem) clamp(1.8rem, 4vw, 3rem)',
            textAlign: 'center',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Mandala Watermark Layer inside the card */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${mandalaBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.4,
              pointerEvents: 'none',
              mixBlendMode: 'multiply',
            }}
          />

          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* ── 1) Top Pill: AUSPICIOUS INVOCATION ── */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                padding: '0.42rem 1.6rem',
                borderRadius: 9999,
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FDF9F0 100%)',
                border: '1.2px solid #D8C28E',
                boxShadow: '0 2px 8px rgba(212, 175, 55, 0.1)',
                margin: '0 auto 1.8rem',
              }}
            >
              <SparkleStar />
              <span
                style={{
                  fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
                  fontSize: isTamil ? '0.78rem' : '0.62rem',
                  fontWeight: 600,
                  letterSpacing: isTamil ? '0.08em' : '0.28em',
                  textTransform: isTamil ? 'none' : 'uppercase',
                  color: '#7A2028',
                  lineHeight: 1,
                  display: 'inline-block',
                }}
              >
                {isTamil ? 'மங்கள வாழ்த்துரை & இறை வணக்கம்' : 'Auspicious Invocation'}
              </span>
              <SparkleStar />
            </div>

            {/* ── 2) Inner Quote Card: Andal's Vaaranam Aayiram Verse ── */}
            <div
              style={{
                maxWidth: 680,
                width: '100%',
                margin: '0 auto',
                background: 'linear-gradient(180deg, #FAF7F0 0%, #F6F0E4 100%)',
                border: '1.2px solid #E8D8BA',
                borderRadius: 20,
                padding: 'clamp(1.2rem, 3.5vw, 2rem) clamp(1rem, 4vw, 2.5rem)',
                boxShadow: '0 6px 24px rgba(198, 155, 70, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
                textAlign: 'center',
              }}
            >
              <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                <p
                  style={{
                    fontFamily: '"Noto Serif Tamil", "Cormorant Garamond", serif',
                    fontWeight: 600,
                    fontSize: 'clamp(0.95rem, 3vw, 1.25rem)',
                    lineHeight: 2,
                    color: '#7A1C24',
                    margin: '0 0 1rem',
                    letterSpacing: '0.02em',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ display: 'block' }}>"வாரணம் ஆயிரம் சூழ வலம்செய்து</span>
                  <span style={{ display: 'block' }}>நாரணன் நம்பி நடந்தான் என்றஎன்று</span>
                  <span style={{ display: 'block' }}>தோரண வீதி கானாமை யெங்கும்தூப</span>
                  <span style={{ display: 'block' }}>நறும்சுதை தீபம்பிரகாச மாகவே..."</span>
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    margin: '0 auto 0.6rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ width: 28, height: 1, background: '#D4AF37' }} />
                  <span
                    style={{
                      fontFamily: '"Noto Serif Tamil", Inter, sans-serif',
                      fontSize: 'clamp(0.7rem, 2vw, 0.82rem)',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      color: '#9C4A5A',
                    }}
                  >
                    — நாச்சியார் திருமொழி • ஆண்டாள் (Nachiyar Thirumozhi)
                  </span>
                  <div style={{ width: 28, height: 1, background: '#D4AF37' }} />
                </div>
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(0.85rem, 2.2vw, 0.98rem)',
                    color: '#7D6352',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  "Surrounded by a thousand majestic elephants, Sri Narayanan walked in sacred procession amidst garlanded streets, fragrant incense, and radiant divine lamps."
                </p>
              </div>
            </div>

            {/* ── 3) Main Note text ── */}
            <p
              style={{
                fontFamily: isTamil ? '"Noto Serif Tamil", serif' : '"Cormorant Garamond", Georgia, serif',
                fontStyle: isTamil ? 'normal' : 'italic',
                fontWeight: 500,
                fontSize: isTamil ? 'clamp(0.95rem, 2.4vw, 1.15rem)' : 'clamp(1.1rem, 2.7vw, 1.35rem)',
                lineHeight: isTamil ? 1.85 : 1.65,
                color: '#632632',
                maxWidth: 660,
                margin: '2rem auto 0',
                letterSpacing: '0.02em',
                textAlign: 'center',
              }}
            >
              "{invitation.texts[language].invitationBody}"
            </p>

            {/* ── 4) Interactive Flower Shower Button ── */}
            <div
              style={{
                marginTop: '2.2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Floating Toast Blurbs */}
              <div
                style={{
                  position: 'absolute',
                  top: -38,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  pointerEvents: 'none',
                  height: 30,
                  zIndex: 20,
                }}
              >
                <AnimatePresence>
                  {blessingToasts.map((toast) => (
                    <motion.div
                      key={toast.id}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -16, scale: 1 }}
                      exit={{ opacity: 0, y: -32, scale: 0.9 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        background: '#7A2028',
                        color: '#FAE69E',
                        fontSize: '0.72rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        padding: '0.25rem 0.85rem',
                        borderRadius: 9999,
                        boxShadow: '0 4px 16px rgba(122,32,40,0.3)',
                      }}
                    >
                      {toast.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Bursting Petals Particle System */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  pointerEvents: 'none',
                  zIndex: 30,
                }}
              >
                {activePetals.map((petal) => (
                  <motion.div
                    key={petal.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                    animate={{
                      x: petal.x,
                      y: petal.y,
                      opacity: [0.95, 1, 0.7, 0],
                      scale: [0, 1.25, 0.95, 0.3],
                      rotate: petal.rotation + 180,
                    }}
                    transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      width: petal.size,
                      height: petal.size * (petal.shape === 'jasmine' ? 1.3 : 0.8),
                      background: petal.color,
                      borderRadius:
                        petal.shape === 'rose'
                          ? '60% 40% 70% 30% / 50% 60% 40% 50%'
                          : petal.shape === 'jasmine'
                          ? '50% 50% 50% 50% / 80% 80% 20% 20%'
                          : '40% 60% 50% 50% / 60% 40% 60% 40%',
                      boxShadow: `0 2px 8px ${petal.color}88`,
                    }}
                  />
                ))}
              </div>

              {/* The Button */}
              <motion.button
                type="button"
                onClick={handleFlowerShower}
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  padding: '0.6rem 1.8rem',
                  borderRadius: 9999,
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FDF9EE 100%)',
                  border: '1.2px solid #D8C28E',
                  boxShadow: '0 4px 16px rgba(212, 175, 55, 0.18), 0 1px 3px rgba(0,0,0,0.03)',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <FlowerIcon />
                <span
                  style={{
                    fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
                    fontSize: isTamil ? '0.84rem' : '0.72rem',
                    fontWeight: 700,
                    letterSpacing: isTamil ? '0.04em' : '0.14em',
                    textTransform: isTamil ? 'none' : 'uppercase',
                    color: '#6B2330',
                    lineHeight: 1,
                  }}
                >
                  {isTamil ? 'மணமக்களை மலர் தூவி வாழ்த்துக' : 'Shower Flowers on Couple'}
                </span>
                <span style={{ fontSize: '0.95rem', lineHeight: 1 }} role="img" aria-label="flower">
                  🌸
                </span>
                {showerCount > 0 && (
                  <span
                    style={{
                      background: '#7A2028',
                      color: '#FAE69E',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      borderRadius: 9999,
                      padding: '0.15rem 0.5rem',
                      marginLeft: '0.2rem',
                      lineHeight: 1.2,
                    }}
                  >
                    +{showerCount}
                  </span>
                )}
              </motion.button>

              {/* Exact subtitle from Image 1 */}
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.62rem',
                  letterSpacing: '0.04em',
                  color: '#9C8873',
                  marginTop: '0.55rem',
                  display: 'block',
                }}
              >
                Tap to sprinkle celebratory petals
              </span>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
