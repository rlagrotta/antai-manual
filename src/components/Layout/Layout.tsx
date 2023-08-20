import React, { useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import styles from './layout.module.css';
import Footer from '../Footer';
import ProgressBar from '../progressBar/ProgressBar';
import Header from '../Header/Header';
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const currentRoute = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const isHome = currentRoute === '/';
  const isQuiz = /^\/quiz\/\d+(\/[^\/]+)?\/?$/.test(currentRoute);
  useEffect(() => {
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [currentRoute]);

  return (
    <div className={styles.mainContainer} aria-live="polite" aria-atomic="true">
      <Header />
      <ProgressBar />
      <div className={styles.container}>
        <div
          ref={containerRef}
          className={`${styles.content} ${isHome && styles.isHome} ${isQuiz && styles.isQuiz} `}
        >
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
