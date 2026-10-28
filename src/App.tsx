import { useState } from 'react';
import OpeningCard from './components/OpeningCard';
import MainInvitation from './components/MainInvitation';
import FloatingPetals from './components/FloatingPetals';
import MusicToggle from './components/MusicToggle';
import RotatingMandalas from './components/RotatingMandalas';
import { LanguageProvider } from './context/LanguageContext';

function MobileFloatingLove() {
  return (
    <div className="mobile-hr-heart" aria-hidden="true">
      <svg className="mobile-hr-heart__svg" viewBox="0 0 180 160" aria-hidden="true">
        <path
          d="M90 146C86 142 14 95 12 64C9 31 31 12 61 12C76 12 89 19 90 35C91 19 104 12 119 12C149 12 171 31 168 64C166 95 94 142 90 146Z"
          className="mobile-hr-heart__shape"
        />
        <text x="90" y="90" textAnchor="middle" className="mobile-hr-heart__text">R&amp;H</text>
      </svg>
    </div>
  );
}


export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <LanguageProvider>
      <MobileFloatingLove />
      {/* Mandalas softly rotating in the background on all pages */}
      <RotatingMandalas />
      {/* Petals always visible — gentle on opening screen, fuller after opening */}
      <FloatingPetals active={true} />
      <MusicToggle />
      {!opened ? (
        <OpeningCard onOpen={() => setOpened(true)} />
      ) : (
        <MainInvitation />
      )}
    </LanguageProvider>
  );
}
