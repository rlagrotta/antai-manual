import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import styles from './BottomSheet.module.css';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
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
    if (isOpen && sheetRef.current) {
      sheetRef.current.focus();
    } else if (sheetRef.current) {
      sheetRef.current.blur();
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.overlay} ${!isOpen && styles.hidden}`}
        onClick={handleClose}
        onKeyDown={handleKeyDown}
        aria-hidden={true}
      ></div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className={`${styles.bottomSheet} ${!isOpen && styles.hidden}`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={sheetRef}
      >
        {children}
      </div>
    </>
  );
};

export default BottomSheet;
