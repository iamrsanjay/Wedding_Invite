import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  isPlaying: boolean;
}

const KARAOKE_LINES = [
  { roman: 'Yaachche Yaachche Yaachche Yaachche...', tamil: 'யாச்சே யாச்சே யாச்சே யாச்சே...' },
  { roman: 'Thuli Maiyal Undaache...', tamil: 'துளி மையல் உண்டாச்சே...' },
  { roman: 'Yaachche Yaachche Yaachche Yaachche...', tamil: 'யாச்சே யாச்சே யாச்சே யாச்சே...' },
  { roman: 'Aval Maiyam Kondaache...', tamil: 'அவள் மையம் கொண்டாச்சே...' },
  { roman: 'Neethaane Neethaane En Nenjai Thattum Saththam...', tamil: 'நீதானே நீதானே என் நெஞ்சை தட்டும் சத்தம்...' },
  { roman: 'Azhagaai Udaindhen Neeye Artham!', tamil: 'அழகாய் உடைந்தேன் நீயே அர்த்தம்!' },
  { roman: 'Unnaale Unnaale En Vaanam Engum Ponminnum...', tamil: 'உன்னாலே உன்னாலே என் வானம் எங்கும் பொன்மின்னும்...' },
  { roman: 'Kannaale Kannaale En Kaadhal Aayul Mei Sollum! 🌸', tamil: 'கண்ணாலே கண்ணாலே என் காதல் ஆயுள் மெய் சொல்லும்! 🌸' },
];

export default function KaraokeLyrics({ isPlaying }: Props) {
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  // Cycle karaoke lines every 3.8s when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentLineIdx((prev) => (prev + 1) % KARAOKE_LINES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!isPlaying) return null;

  const current = KARAOKE_LINES[currentLineIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 95,
        width: 'min(92vw, 480px)',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(254, 252, 248, 0.96) 0%, rgba(250, 246, 238, 0.94) 100%)',
          border: '1.5px solid #D8C28E',
          borderRadius: 20,
          boxShadow: '0 12px 36px rgba(122, 28, 36, 0.2), 0 2px 10px rgba(212, 175, 55, 0.25)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          overflow: 'hidden',
          padding: collapsed ? '0.5rem 1rem' : '0.8rem 1.2rem',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.6rem',
            cursor: 'pointer',
          }}
          onClick={() => setCollapsed((v) => !v)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Spinning Music Icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#7A1C24',
                color: '#FFF8EA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Music size={12} />
            </motion.div>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#7A1C24',
              }}
            >
              Karaoke • Yaache Yaache (Neethanae)
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed((v) => !v);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#8A7660',
              padding: '0 0.2rem',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label={collapsed ? 'Expand karaoke' : 'Collapse karaoke'}
          >
            {collapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Expandable Karaoke Lyrics Content */}
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              key={currentLineIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              style={{
                marginTop: '0.6rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid rgba(216, 194, 142, 0.4)',
                textAlign: 'center',
              }}
            >
              {/* Active Roman Line with Shimmer */}
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.15rem, 3.8vw, 1.45rem)',
                  fontWeight: 600,
                  color: '#7A1C24',
                  margin: '0 0 0.2rem',
                  letterSpacing: '0.04em',
                  lineHeight: 1.25,
                }}
              >
                {current.roman}
              </p>

              {/* Tamil Lyric Line */}
              <p
                style={{
                  fontFamily: '"Noto Serif Tamil", serif',
                  fontSize: 'clamp(0.85rem, 2.6vw, 1rem)',
                  color: '#9C6A2A',
                  margin: '0 0 0.45rem',
                  letterSpacing: '0.02em',
                  fontStyle: 'italic',
                }}
              >
                {current.tamil}
              </p>

              {/* Karaoke Progress Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                {KARAOKE_LINES.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: i === currentLineIdx ? 1.4 : 1,
                      backgroundColor: i === currentLineIdx ? '#7A1C24' : '#D8C28E',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
