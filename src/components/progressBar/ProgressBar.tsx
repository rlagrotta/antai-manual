import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Lexend_Giga } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';

import { ScrollContext } from './../../contexts/ScrollContext';
import { ProgressBarLine } from './components/ProgressBarLine';
import manifest from './../../json/manifest.json';
import styles from './ProgressBar.module.css';

const LexendGiga = Lexend_Giga({ subsets: ['latin'] });

export default function ProgressBar() {
  const params = useParams();
  const currentRoute = usePathname();
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const { progress } = useContext(ScrollContext)!;
  const [title, setTitle] = useState('');
  const [isHome, setIsHome] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isLastChapter, setIsLastChapter] = useState(false);

  useEffect(() => {
    if (params?.slug && parseInt(params?.slug[0]) === manifest.chapters.length) {
      setCurrentChapter(parseInt(params?.slug[0]));
      setIsLastChapter(true);
      setTitle(manifest.chapters[parseInt(params?.slug[0]) - 1].title);
    } else {
      setIsLastChapter(false);
      if (params?.slug) {
        setCurrentChapter(parseInt(params?.slug[0]));
        setTitle(manifest.chapters[parseInt(params?.slug[0]) - 1].title);
      }
    }
  }, [params?.slug]);

  useEffect(() => {
    const progressBar = progressBarRef.current;
    if (progressBar) {
      const height = progressBar.offsetHeight;
      document.documentElement.style.setProperty('--progressBarHeight', `${height}px`);
    }
  }, [title]);

  useEffect(() => {
    setIsHome(currentRoute === '/');
  }, [currentRoute]);

  if (isHome) return null;

  return (
    <div className={`${styles.mainContainer} ${LexendGiga.className}`} ref={progressBarRef}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.subContainer}>
        <span className={styles.text}>Cap {currentChapter}</span>
        <ProgressBarLine progress={progress} />
        {!isLastChapter && <span className={styles.text}>Cap {currentChapter + 1}</span>}
      </div>
    </div>
  );
}
