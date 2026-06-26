import React, { forwardRef } from 'react';
import styles from './intro.module.css';
import { IntroMaskText } from './IntroMaskText';

interface IntroPanelsProps {
  // Any specific props if needed
}

export const IntroPanels = forwardRef<HTMLDivElement, IntroPanelsProps>((props, ref) => {
  return (
    <div ref={ref} className={styles.introContainer} style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#ffffff', display: 'flex' }}>
      <div className={styles.filmGrain} />
      
      <div className={`${styles.panel} ${styles.panelLeft} intro-panel-left`} style={{ flex: 1, backgroundColor: '#ffffff' }} />
      <div className={`${styles.panel} ${styles.panelRight} intro-panel-right`} style={{ flex: 1, backgroundColor: '#ffffff' }} />
      
      <div className={styles.centerTextWrapper}>
        <IntroMaskText text="DAMAGED" className="intro-text-damaged" />
        <IntroMaskText text="GOODS" className="intro-text-goods" />
      </div>
    </div>
  );
});

IntroPanels.displayName = 'IntroPanels';
