import mandalaArt from '../assets/mandala_art.svg';

export default function RotatingMandalas() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes mandalaSpinClockwise {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes mandalaSpinCounter {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @media (max-width: 768px) {
          .mandala-side-accent {
            width: 220px !important;
            height: 220px !important;
            opacity: 0.07 !important;
          }
          .mandala-top-left {
            top: -40px !important;
            left: -130px !important;
          }
          .mandala-top-right {
            top: -40px !important;
            right: -130px !important;
          }
          .mandala-bot-left {
            bottom: -50px !important;
            left: -130px !important;
          }
          .mandala-bot-right {
            bottom: -50px !important;
            right: -130px !important;
          }
          .mandala-mid-left, .mandala-mid-right {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .mandala-side-accent {
            opacity: 0.12;
            transition: opacity 0.5s ease;
          }
        }
      `,
        }}
      />

      {/* ── Top-Left Mandala (Clockwise) ── */}
      <div
        className="mandala-side-accent mandala-top-left"
        style={{
          position: 'absolute',
          top: -70,
          left: -180,
          width: 420,
          height: 420,
          animation: 'mandalaSpinClockwise 90s linear infinite',
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 0 12px rgba(201,168,106,0.12))',
          willChange: 'transform',
        }}
      >
        <img
          src={mandalaArt}
          alt=""
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      {/* ── Top-Right Mandala (Counter-Clockwise - Symmetrical) ── */}
      <div
        className="mandala-side-accent mandala-top-right"
        style={{
          position: 'absolute',
          top: -70,
          right: -180,
          width: 420,
          height: 420,
          animation: 'mandalaSpinCounter 90s linear infinite',
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 0 12px rgba(201,168,106,0.12))',
          willChange: 'transform',
        }}
      >
        <img
          src={mandalaArt}
          alt=""
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      {/* ── Middle-Left Mandala (Counter-Clockwise) ── */}
      <div
        className="mandala-side-accent mandala-mid-left"
        style={{
          position: 'absolute',
          top: '50%',
          marginTop: -170,
          left: -170,
          width: 340,
          height: 340,
          animation: 'mandalaSpinCounter 110s linear infinite',
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 0 10px rgba(201,168,106,0.1))',
          willChange: 'transform',
        }}
      >
        <img
          src={mandalaArt}
          alt=""
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      {/* ── Middle-Right Mandala (Clockwise - Symmetrical) ── */}
      <div
        className="mandala-side-accent mandala-mid-right"
        style={{
          position: 'absolute',
          top: '50%',
          marginTop: -170,
          right: -170,
          width: 340,
          height: 340,
          animation: 'mandalaSpinClockwise 110s linear infinite',
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 0 10px rgba(201,168,106,0.1))',
          willChange: 'transform',
        }}
      >
        <img
          src={mandalaArt}
          alt=""
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      {/* ── Bottom-Left Mandala (Clockwise) ── */}
      <div
        className="mandala-side-accent mandala-bot-left"
        style={{
          position: 'absolute',
          bottom: -80,
          left: -180,
          width: 420,
          height: 420,
          animation: 'mandalaSpinClockwise 95s linear infinite',
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 0 12px rgba(201,168,106,0.12))',
          willChange: 'transform',
        }}
      >
        <img
          src={mandalaArt}
          alt=""
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      {/* ── Bottom-Right Mandala (Counter-Clockwise - Symmetrical) ── */}
      <div
        className="mandala-side-accent mandala-bot-right"
        style={{
          position: 'absolute',
          bottom: -80,
          right: -180,
          width: 420,
          height: 420,
          animation: 'mandalaSpinCounter 95s linear infinite',
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 0 12px rgba(201,168,106,0.12))',
          willChange: 'transform',
        }}
      >
        <img
          src={mandalaArt}
          alt=""
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
    </div>
  );
}
