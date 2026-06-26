import React, { useEffect, useRef, useState } from 'react';
import { createIntroTimeline } from './IntroTimeline';
import { IntroPanels } from './IntroPanels';

interface IntroRevealProps {
  onComplete: () => void;
}

export const IntroReveal: React.FC<IntroRevealProps> = ({ onComplete }) => {
  const [shouldPlay, setShouldPlay] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // We don't need a useEffect to set shouldPlay to true, it starts true immediately to prevent 1-frame flashes.

  useEffect(() => {
    if (shouldPlay === null || !shouldPlay) return;

    // Lock scrolling
    document.body.style.overflow = 'hidden';

    // Start timeline
    const ctx = createIntroTimeline(containerRef, () => {
      // Restore scrolling
      document.body.style.overflow = '';
      onComplete();
    });

    return () => {
      ctx?.revert();
      document.body.style.overflow = '';
    };
  }, [shouldPlay, onComplete]);

  if (shouldPlay === null || !shouldPlay) {
    return null;
  }

  return <IntroPanels ref={containerRef} />;
};
