import { useState } from 'react';
import OpeningCard from './components/OpeningCard';
import MainInvitation from './components/MainInvitation';
import FloatingPetals from './components/FloatingPetals';
import MusicToggle from './components/MusicToggle';
import RotatingMandalas from './components/RotatingMandalas';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <LanguageProvider>
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
