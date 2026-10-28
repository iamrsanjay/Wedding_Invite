import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Use the actual project music track from the Music folder
    const audio = new Audio('/neethane.mp3.mpeg');
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handlePlayRequest = () => {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3800);
        })
        .catch((err) => {
          console.log('Audio playback prevented by browser:', err);
        });
    };

    window.addEventListener('engagement:play-music', handlePlayRequest);

    return () => {
      window.removeEventListener('engagement:play-music', handlePlayRequest);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setShowToast(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3500);
        })
        .catch((err) => {
          console.error('Play error:', err);
        });
    }
  };

  return (
    <>
      {/* ── Floating Music Control Button ── */}
      <div
        style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        {/* Toast Announcement */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, #FAF7F0 0%, #F5EFE3 100%)',
                border: '1.2px solid #D8C28E',
                borderRadius: 9999,
                padding: '0.4rem 0.75rem',
                boxShadow: '0 4px 16px rgba(122, 32, 40, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <span style={{ fontSize: '0.85rem' }}>🎵</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Music Button */}
        <motion.button
          id="music-toggle-btn"
          type="button"
          onClick={toggleMusic}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          animate={
            isPlaying
              ? {
                  boxShadow: [
                    '0 4px 16px rgba(212,175,55,0.25), 0 0 0 0 rgba(212,175,55,0.3)',
                    '0 6px 24px rgba(212,175,55,0.45), 0 0 0 8px rgba(212,175,55,0)',
                    '0 4px 16px rgba(212,175,55,0.25), 0 0 0 0 rgba(212,175,55,0.3)',
                  ],
                }
              : {}
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            border: '1.5px solid #D4AF37',
            background: isPlaying
              ? 'linear-gradient(135deg, #FAF7F0 0%, #F5ECE0 100%)'
              : 'rgba(250, 247, 240, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            outline: 'none',
            position: 'relative',
          }}
          aria-label={isPlaying ? 'Pause Neethaane' : 'Play Neethaane'}
          title={isPlaying ? 'Pause Neethaane Instrumental' : 'Play Neethaane Instrumental'}
        >
          {isPlaying ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Volume2 size={18} color="#7A1C24" />
              {/* Equalizer animation bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 12 }}>
                <motion.span
                  animate={{ height: [4, 12, 6, 10, 4] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: 2, background: '#D4AF37', borderRadius: 1 }}
                />
                <motion.span
                  animate={{ height: [8, 4, 12, 5, 8] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  style={{ width: 2, background: '#7A1C24', borderRadius: 1 }}
                />
                <motion.span
                  animate={{ height: [5, 10, 4, 12, 5] }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  style={{ width: 2, background: '#D4AF37', borderRadius: 1 }}
                />
              </div>
            </div>
          ) : (
            <VolumeX size={18} color="#8A7660" />
          )}
        </motion.button>
      </div>
    </>
  );
}
