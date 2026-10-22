import { useRef, useMemo } from 'react';

interface Props { active: boolean; }

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: 'jasmine' | 'rose' | 'gold';
  swayAmount: number;
  rotateSpeed: number;
}

const PETAL_COUNT = 20;

function createPetal(id: number): Petal {
  const type = id % 4 === 0 ? 'gold' : id % 3 === 0 ? 'jasmine' : 'rose';
  return {
    id,
    x: Math.random() * 100,
    size: type === 'jasmine' ? 3 + Math.random() * 3 : 4 + Math.random() * 5,
    duration: 10 + Math.random() * 12,
    delay: Math.random() * 16,
    type,
    swayAmount: 15 + Math.random() * 20,
    rotateSpeed: 8 + Math.random() * 12,
  };
}

const COLOR_MAP = {
  jasmine: 'radial-gradient(circle, #FFFFFF 40%, #FFF9EC 100%)',
  rose: 'radial-gradient(circle at 35% 35%, #FF4081 0%, #D81B60 60%, #AD1457 100%)',
  gold: 'radial-gradient(circle, #F5E6BE 0%, #E2C374 50%, #C9A86A 100%)',
};

const SHADOW_MAP = {
  jasmine: '0 1px 4px rgba(255,249,236,0.6)',
  rose: '0 2px 8px rgba(216,27,96,0.55)',
  gold: '0 0 8px rgba(226,195,116,0.5)',
};

export default function FloatingPetals({ active }: Props) {
  const petals = useRef<Petal[]>(
    Array.from({ length: PETAL_COUNT }, (_, i) => createPetal(i))
  );

  // Create unique keyframe names for each petal's sway
  const styleTag = useMemo(() => {
    const rules = petals.current.map((p) => `
      @keyframes petalSway${p.id} {
        0%   { transform: translateY(-20px) rotate(0deg) translateX(0px) scale(0.7); opacity: 0; }
        5%   { opacity: ${p.type === 'gold' ? 0.3 : 0.5}; }
        20%  { transform: translateY(20vh) rotate(72deg) translateX(${p.swayAmount}px) scale(1); }
        40%  { transform: translateY(40vh) rotate(144deg) translateX(-${p.swayAmount * 0.7}px) scale(0.9); }
        60%  { transform: translateY(60vh) rotate(216deg) translateX(${p.swayAmount * 0.5}px) scale(1.05); }
        80%  { transform: translateY(80vh) rotate(288deg) translateX(-${p.swayAmount * 0.3}px) scale(0.85); opacity: 0.25; }
        100% { transform: translateY(110vh) rotate(400deg) translateX(${p.swayAmount * 0.2}px) scale(0.6); opacity: 0; }
      }
    `).join('\n');
    return rules;
  }, []);

  if (!active) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleTag }} />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }} aria-hidden="true">
        {petals.current.map((p) => {
          const isJasmine = p.type === 'jasmine';
          return (
            <div
              key={p.id}
              style={{
                position: 'fixed',
                left: `${p.x}%`,
                top: `-${p.size * 3}px`,
                width: isJasmine ? p.size : p.size * 1.6,
                height: p.size,
                background: COLOR_MAP[p.type],
                borderRadius: isJasmine
                  ? '50%'
                  : '50% 50% 50% 50% / 60% 60% 40% 40%',
                boxShadow: SHADOW_MAP[p.type],
                animationName: `petalSway${p.id}`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationFillMode: 'both',
                willChange: 'transform, opacity',
                filter: p.type === 'gold' ? 'none' : 'blur(0.2px)',
                zIndex: 50,
                pointerEvents: 'none' as const,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
