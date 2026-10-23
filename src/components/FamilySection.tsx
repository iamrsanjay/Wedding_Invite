import FadeUp from './FadeUp';
import GoldDivider from './GoldDivider';
import { invitation, type FamilyGroupData } from '../data/invitationData';
import { useLanguage } from '../context/LanguageContext';

interface FamilyMemberProps {
  name: string;
  relation?: string;
  isTamil: boolean;
}

function FamilyMember({ name, relation, isTamil }: FamilyMemberProps) {
  return (
    <div style={{ textAlign: 'center', padding: '0.6rem 0' }}>
      <p style={{
        fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', 'Cormorant Garamond', serif",
        fontSize: isTamil ? '1.05rem' : '1.15rem',
        fontWeight: 600,
        color: '#292521',
        margin: relation ? '0 0 0.2rem' : 0,
      }}>
        {name}
      </p>
      {relation && (
        <p style={{
          fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
          fontSize: isTamil ? '0.72rem' : '0.62rem',
          letterSpacing: isTamil ? '0.04em' : '0.15em',
          textTransform: isTamil ? 'none' : 'uppercase',
          color: '#8A7660',
          margin: 0,
          fontWeight: 500,
        }}>
          {relation}
        </p>
      )}
    </div>
  );
}

interface FamilyPanelProps {
  title: string;
  data: FamilyGroupData;
  accentColor: string;
  isTamil: boolean;
}

function FamilyPanel({ title, data, accentColor, isTamil }: FamilyPanelProps) {
  return (
    <div style={{
      flex: '1 1 320px',
      maxWidth: 420,
      width: '100%',
      border: '1.5px solid #E2D1B2',
      borderRadius: 16,
      padding: 'clamp(2rem, 4vw, 2.8rem) clamp(1.2rem, 3.5vw, 2.2rem)',
      background: 'linear-gradient(180deg, #FDFBF7 0%, #FAF6EE 100%)',
      boxShadow: '0 8px 30px rgba(40,25,15,0.06)',
      boxSizing: 'border-box',
      textAlign: 'center',
      position: 'relative',
    }}>
      <p style={{
        fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
        fontSize: isTamil ? '0.85rem' : '0.64rem',
        letterSpacing: isTamil ? '0.06em' : '0.3em',
        textTransform: isTamil ? 'none' : 'uppercase',
        color: '#7A1C24',
        margin: '0 0 1.2rem',
        fontWeight: 700,
      }}>
        {title}
      </p>

      <div style={{ width: 32, height: 1.5, background: accentColor, opacity: 0.6, margin: '0 auto 1.4rem' }} />

      {/* Parents */}
      <FamilyMember name={data.father.name} relation={data.father.relation} isTamil={isTamil} />
      <div style={{ width: 1, height: 16, background: '#E8DFD2', margin: '0 auto' }} />
      <FamilyMember name={data.mother.name} relation={data.mother.relation} isTamil={isTamil} />

      {/* Grandparents */}
      {data.grandparents && data.grandparents.length > 0 && (
        <>
          <div style={{ margin: '1.2rem 0', opacity: 0.4 }}>
            <GoldDivider />
          </div>
          <p style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
            fontSize: isTamil ? '0.74rem' : '0.58rem',
            letterSpacing: isTamil ? '0.04em' : '0.2em',
            textTransform: isTamil ? 'none' : 'uppercase',
            color: '#8A7660',
            margin: '0 0 0.75rem',
            fontWeight: 600,
          }}>
            {isTamil ? 'தாத்தா & பாட்டி' : 'Grandparents'}
          </p>
          {data.grandparents.map((gp, i) => (
            <FamilyMember key={i} name={gp.name} relation={gp.relation} isTamil={isTamil} />
          ))}
        </>
      )}

      {/* Brother */}
      {data.brother && data.brother.length > 0 && (
        <>
          <div style={{ margin: '1.2rem 0', opacity: 0.4 }}>
            <GoldDivider />
          </div>
          <p style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
            fontSize: isTamil ? '0.74rem' : '0.58rem',
            letterSpacing: isTamil ? '0.04em' : '0.2em',
            textTransform: isTamil ? 'none' : 'uppercase',
            color: '#8A7660',
            margin: '0 0 0.75rem',
            fontWeight: 600,
          }}>
            {isTamil ? 'சகோதரர்' : 'Brother'}
          </p>
          {data.brother.map((b, i) => (
            <FamilyMember key={i} name={b.name} isTamil={isTamil} />
          ))}
        </>
      )}

      {/* Sisters */}
      {data.sisters && data.sisters.length > 0 && (
        <>
          <div style={{ margin: '1.2rem 0', opacity: 0.4 }}>
            <GoldDivider />
          </div>
          <p style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Inter', sans-serif",
            fontSize: isTamil ? '0.74rem' : '0.58rem',
            letterSpacing: isTamil ? '0.04em' : '0.2em',
            textTransform: isTamil ? 'none' : 'uppercase',
            color: '#8A7660',
            margin: '0 0 0.75rem',
            fontWeight: 600,
          }}>
            {isTamil ? 'சகோதரிகள்' : 'Sisters'}
          </p>
          {data.sisters.map((s, i) => (
            <FamilyMember key={i} name={s.name} isTamil={isTamil} />
          ))}
        </>
      )}
    </div>
  );
}

export default function FamilySection() {
  const { language, isTamil } = useLanguage();

  return (
    <section
      id="family"
      style={{
        background: '#FAF7F0',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <FadeUp>
          <p style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', serif" : "'Cinzel', sans-serif",
            fontSize: isTamil ? '0.78rem' : '0.64rem',
            letterSpacing: isTamil ? '0.06em' : '0.35em',
            textTransform: isTamil ? 'none' : 'uppercase',
            color: '#8A7660',
            margin: '0 0 0.8rem',
            fontWeight: 600,
          }}>
            {isTamil ? 'பெரியோர்களின் ஆசிகளுடன்' : 'With the Blessings of'}
          </p>
          <h2 style={{
            fontFamily: isTamil ? "'Noto Serif Tamil', 'Mukta Malar', serif" : "'Cinzel', 'Playfair Display', serif",
            fontSize: isTamil ? 'clamp(1.7rem, 4.4vw, 2.5rem)' : 'clamp(1.8rem, 5vw, 2.6rem)',
            fontWeight: 700,
            color: '#7A1C24',
            margin: '0 0 0.5rem',
          }}>
            {isTamil ? 'மணமக்கள் குடும்பத்தார்' : 'Our Families'}
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ marginBottom: '3rem' }}>
            <GoldDivider />
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div style={{ display: 'flex', gap: 'clamp(1.2rem, 3.5vw, 2.4rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <FamilyPanel
              title={invitation.bridesFamily[language].title}
              data={invitation.bridesFamily[language]}
              accentColor="#7A1C24"
              isTamil={isTamil}
            />
            <FamilyPanel
              title={invitation.groomsFamily[language].title}
              data={invitation.groomsFamily[language]}
              accentColor="#C9A86A"
              isTamil={isTamil}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
