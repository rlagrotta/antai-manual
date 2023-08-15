'use client';
import React, { useState, useEffect } from 'react';
import styles from './QuestionText.module.css';

interface QuestionTextProps {
  pregunta: string;
  pista: string;
  timeShowPista?: number;
}
export default function QuestionText({
  pregunta,
  pista,
  timeShowPista = 10000,
}: QuestionTextProps) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setShowHint(false);
    setTimeout(() => {
      setShowHint(true);
    }, timeShowPista);
  }, [pregunta, timeShowPista]);

  return (
    <h2 className={styles.title} aria-label={`Pregunta: ${pregunta}`}>
      {pregunta}
    </h2>
  );
}
