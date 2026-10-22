/* Animated ornamental gold divider with a shimmer sweep and spin diamond */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  label?: string;
  style?: React.CSSProperties;
}

export default function GoldDivider({ label, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Left line — draws in from center */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--gold))',
          opacity: 0.5,
          transformOrigin: 'right center',
        }}
      />

      {/* Center ornament with spinning diamond + shimmer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--gold)',
          fontSize: '0.6rem',
          position: 'relative',
        }}
      >
        {/* Spinning diamond left */}
        <motion.span
          animate={inView ? { rotate: [45, 405] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{
            display: 'inline-block',
            width: 5,
            height: 5,
            background: 'var(--gold)',
            transformOrigin: 'center',
          }}
        >
          &nbsp;
        </motion.span>

        {label && (
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontSize: '0.6rem',
              color: 'var(--text-muted)',
            }}
          >
            {label}
          </span>
        )}

        {/* Spinning diamond right */}
        <motion.span
          animate={inView ? { rotate: [45, -315] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{
            display: 'inline-block',
            width: 5,
            height: 5,
            background: 'var(--gold)',
            transformOrigin: 'center',
          }}
        >
          &nbsp;
        </motion.span>

        {/* Subtle glow behind diamonds */}
        <motion.div
          animate={inView ? { opacity: [0.1, 0.35, 0.1] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,106,0.4) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Right line — draws in from center */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, var(--gold), transparent)',
          opacity: 0.5,
          transformOrigin: 'left center',
        }}
      />
    </div>
  );
}
