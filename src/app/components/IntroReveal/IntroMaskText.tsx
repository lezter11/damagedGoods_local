import React from 'react';
import styles from './intro.module.css';

interface IntroMaskTextProps {
  text: string;
  className?: string;
}

export const IntroMaskText: React.FC<IntroMaskTextProps> = ({ text, className }) => {
  return (
    <div className={`${styles.text} ${className || ''}`} style={{ opacity: 0, visibility: 'hidden', transform: 'translateY(40px)' }}>
      {text}
    </div>
  );
};
