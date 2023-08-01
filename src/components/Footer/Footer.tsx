'use client';

import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { Button } from '../Button';
import styles from './footer.module.css';
import manifest from './../../json/manifest.json';
import BottomSheet from '../BottomSheet/BottomSheet';
import { ScrollContext } from './../../contexts/ScrollContext';

const Footer = () => {
  const { push } = useRouter();
  const params = useParams();
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { scrollUp, scrollDown } = useContext(ScrollContext)!;
  const [isLastChapter, setIsLastChapter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentRoute = usePathname();
  const isHome = currentRoute === '/';

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const start = () => {
    const chapter = manifest.chapters[0];
    push(`/page/${chapter.id}/${chapter.slug}`);
    closeMenu();
  };


const startScrolling = (scrollFunc: () => void) => {
  if(scrollIntervalRef.current !== null) {
    // scrollFunc ya se está ejecutando, no hacer nada
    return;
  }

  // Ejecutar scrollFunc cada 100ms
  scrollIntervalRef.current = setInterval(scrollFunc, 100);
}

const stopScrolling = () => {
  if(scrollIntervalRef.current !== null) {
    clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = null;
  }
}

useEffect(() => {
  return () => {
    stopScrolling();
  };
}, []);


  const exit = () => {
    push('/');
    closeMenu();
  };

  useEffect(() => {
    if (params?.slug && parseInt(params?.slug[0]) === manifest.chapters.length) {
      setIsLastChapter(true);
    } else {
      setIsLastChapter(false);
    }
  }, [params?.slug]);

  return (
    <>
      <div className={`${styles.footer} ${isHome && styles.homeNavigationFooter}`}>
        <nav
          aria-label="Menú principal"
          className={`${styles.navigationMenu} ${menuOpen && styles.showTwoLeft} ${
            isLastChapter && styles.showTwoLeft
          } ${isHome && styles.homeNavigationMenu} ${isHome && menuOpen && styles.homeMenuOpen}`}
        >
          {menuOpen && (
            <Button onClick={exit} red>
              SALIR
            </Button>
          )}
          {!menuOpen && params?.slug && <Button icon="back"   onMouseDown={() => startScrolling(scrollUp)}
  onMouseUp={stopScrolling}
  onMouseLeave={stopScrolling}
  onTouchStart={() => startScrolling(scrollUp)}
  onTouchEnd={stopScrolling}
  onTouchCancel={stopScrolling}></Button>}
          <Button icon={menuOpen ? 'close' : 'menu'} onClick={toggleMenu}>
            Menú
          </Button>
          {!menuOpen && !params?.slug && (
            <Button icon="next" onClick={start}>
              Iniciar
            </Button>
          )}
          {!menuOpen && params?.slug && parseInt(params?.slug[0]) < manifest.chapters.length && (
            <Button icon="next"  onMouseDown={() => startScrolling(scrollDown)}
  onMouseUp={stopScrolling}
  onMouseLeave={stopScrolling}
  onTouchStart={() => startScrolling(scrollDown)}
  onTouchEnd={stopScrolling}
  onTouchCancel={stopScrolling}></Button>
          )}
        </nav>
      </div>
      <BottomSheet isOpen={menuOpen} onClose={closeMenu}>
        <ul className={styles.menuList}>
          {manifest.chapters.map((chapter, i) => (
            <li
              key={i}
              className={`${styles.menuItem} ${
                params?.slug && parseInt(params?.slug[0]) === chapter.id && styles.active
              }`}
            >
              <Link href={`/page/${chapter.id}/${chapter.slug}`} onClick={closeMenu} prefetch>
                {chapter.title}
              </Link>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </>
  );
};

export default Footer;
