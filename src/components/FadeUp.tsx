import { useRef, type ReactNode } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  /** 'up' | 'left' | 'right' | 'scale' | 'blur' — entrance direction */
  direction?: 'up' | 'left' | 'right' | 'scale' | 'blur';
  /** Distance in pixels for the entrance */
  distance?: number;
}

const getVariants = (direction: string, distance: number): Variants => {
  switch (direction) {
    case 'left':
      return {
        hidden: { opacity: 0, x: -distance, filter: 'blur(4px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
      };
    case 'right':
      return {
        hidden: { opacity: 0, x: distance, filter: 'blur(4px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
      };
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.85, filter: 'blur(6px)' },
        visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      };
    case 'blur':
      return {
        hidden: { opacity: 0, filter: 'blur(12px)', y: 8 },
        visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
      };
    case 'up':
    default:
      return {
        hidden: { opacity: 0, y: distance, filter: 'blur(3px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      };
  }
};

export default function FadeUp({
  children,
  delay = 0,
  className,
  style,
  direction = 'up',
  distance = 40,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const variants = getVariants(direction, distance);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: 1,
        delay,
        ease: [0.22, 1, 0.36, 1], // custom expo-out for premium feel
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
