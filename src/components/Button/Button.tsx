import React from 'react';
import { Lexend_Giga } from 'next/font/google';

import styles from './button.module.css';

const LexendGiga = Lexend_Giga({ subsets: ['latin'] });

interface props {
  children?: React.ReactNode;
  icon?: string;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onMouseLeave?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onTouchCancel?: () => void;
  onKeyDown?: () => void;
  onBlur?: () => void;
  red?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

const Button = ({
  children,
  icon,
  onClick,
  onMouseDown,
  onMouseLeave,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  onKeyDown,
  red,
  outlined,
  disabled,
  ariaLabel,
  onBlur,
}: props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${styles.button} ${red && styles.red} ${outlined && styles.outlined} ${
        disabled && styles.disabled
      } ${LexendGiga.className}`}
      onClick={handleClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      aria-label={ariaLabel}
    >
      {children}
      {icon && <div className={`${styles.icon} ${styles[`icon_${icon}`]}`}></div>}
    </button>
  );
};

export default Button;
