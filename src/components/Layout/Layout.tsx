import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import styles from './layout.module.css';
import Footer from '../Footer';
import ProgressBar from '../progressBar/ProgressBar';
interface props {
  children: React.ReactNode;
}

const Layout = ({ children }: props) => {
  const currentRoute = usePathname();
  const isHome = currentRoute === '/';
  const isQuiz = /^\/quiz\/\d+(\/[^\/]+)?\/?$/.test(currentRoute);
  console.log(isQuiz, 'isQuiz');
  useEffect(() => {
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <ProgressBar />
      <div className={styles.container}>
        <div className={`${styles.content} ${isHome && styles.isHome} ${isQuiz && styles.isQuiz} `}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
