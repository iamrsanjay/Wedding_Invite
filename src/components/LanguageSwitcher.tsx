import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  style?: React.CSSProperties;
  floating?: boolean;
}

export default function LanguageSwitcher({ className, style, floating = false }: LanguageSwitcherProps) {
  const { setLanguage, isTamil } = useLanguage();

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'rgba(255, 253, 248, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1.5px solid #D4AF37',
        borderRadius: '9999px',
        padding: '3px 4px',
        boxShadow: floating
          ? '0 8px 24px rgba(45, 20, 5, 0.16), 0 2px 6px rgba(212, 175, 55, 0.25)'
          : '0 4px 14px rgba(45, 20, 5, 0.08)',
        zIndex: 50,
        userSelect: 'none',
        ...style,
      }}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        style={{
          position: 'relative',
          padding: '5px 12px',
          fontSize: '0.74rem',
          fontWeight: !isTamil ? 700 : 500,
          fontFamily: "'Cinzel', 'Inter', sans-serif",
          letterSpacing: '0.08em',
          color: !isTamil ? '#FFFFFF' : '#8A7660',
          background: 'transparent',
          border: 'none',
          borderRadius: '9999px',
          cursor: 'pointer',
          transition: 'color 0.2s ease',
          zIndex: 2,
        }}
      >
        {!isTamil && (
          <motion.div
            layoutId="lang-active-pill"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #A81B24 0%, #750B11 100%)',
              boxShadow: '0 2px 8px rgba(168, 27, 36, 0.35)',
              zIndex: -1,
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          />
        )}
        English
      </button>

      <button
        type="button"
        onClick={() => setLanguage('ta')}
        style={{
          position: 'relative',
          padding: '5px 14px',
          fontSize: '0.82rem',
          fontWeight: isTamil ? 700 : 500,
          fontFamily: "'Noto Serif Tamil', 'Mukta Malar', serif",
          color: isTamil ? '#FFFFFF' : '#8A7660',
          background: 'transparent',
          border: 'none',
          borderRadius: '9999px',
          cursor: 'pointer',
          transition: 'color 0.2s ease',
          zIndex: 2,
        }}
      >
        {isTamil && (
          <motion.div
            layoutId="lang-active-pill"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #A81B24 0%, #750B11 100%)',
              boxShadow: '0 2px 8px rgba(168, 27, 36, 0.35)',
              zIndex: -1,
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          />
        )}
        தமிழ்
      </button>
    </div>
  );
}
