import React, { useState, useEffect, useRef } from 'react';
import styles from './BottomSheet.module.css';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => {
        setAnimateOpen(true);
      }, 10);
    } else {
      setAnimateOpen(false);
      setTimeout(() => setShouldRender(false), 300); // Esperar a que termine la animación
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && sheetRef.current) {
      sheetRef.current.focus();
    } else if (sheetRef.current) {
      sheetRef.current.blur();
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`${styles.overlay} ${!animateOpen && styles.hidden}`}
        onClick={handleClose}
        onKeyDown={handleKeyDown}
        aria-hidden={true}
      ></div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className={`${styles.bottomSheet} ${!animateOpen && styles.hidden}`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-label="Menú de capítulos"
        aria-modal="true"
        ref={sheetRef}
      >
        {children}
      </div>
    </>
  );
};

export default BottomSheet;
