import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({ text, className, style, delay = 0, stagger = 0.05 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const words = text.split(' ');

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'inline-block',
        whiteSpace: style?.whiteSpace ?? 'normal',
        ...style,
      }}
      aria-label={text}
    >
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            marginRight: wIdx < words.length - 1 ? '0.28em' : 0,
            whiteSpace: 'nowrap',
          }}
        >
          <motion.span
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { y: '120%', opacity: 0 },
              visible: { y: '0%', opacity: 1 },
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + wIdx * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
