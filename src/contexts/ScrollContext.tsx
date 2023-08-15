import React, { createContext, useState, useRef, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import manifest from './../json/manifest.json';

interface ScrollContextProps {
  progress: number;
  scrollRef: React.MutableRefObject<null | HTMLDivElement>;
  scrollUp: () => void;
  scrollDown: () => void;
  nextPage: () => void;
}

export const ScrollContext = createContext<ScrollContextProps | null>(null);

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const { push } = useRouter();
  const currentRoute = usePathname();
  const params = useParams();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const isFirstMount = useRef(true);

  const prevPage = () => {
    if (!params?.slug) return;
    const currentChapter = parseInt(params?.slug[0]);
    const chapter = manifest.chapters.find(c => c.id === currentChapter - 1);
    if (!chapter) {
      setProgress(0);
      push('/');
      return;
    }
    setProgress(0);
    isFirstMount.current = true;
    push(`/page/${chapter.id}/${chapter.slug}`);
    setTimeout(() => {
      isFirstMount.current = false;
    }, 550);
  };

  const checkNeedQuiz = () => {
    if (!params?.slug) return;
    const currentChapter = parseInt(params?.slug[0]);
    const chapter = manifest.chapters.find(c => c.id === currentChapter);
    if (!chapter) return;
    if (chapter.hasQuiz) {
      isFirstMount.current = true;
      push(`/quiz/${chapter.id}/${chapter.slug}`);
      setTimeout(() => {
        isFirstMount.current = false;
      }, 550);
    } else {
      nextPage();
    }
  };

  const nextPage = () => {
    if (!params?.slug) return;
    const currentChapter = parseInt(params?.slug[0]);
    const chapter = manifest.chapters.find(c => c.id === currentChapter + 1);
    if (!chapter) return;
    setProgress(0);
    isFirstMount.current = true;
    push(`/page/${chapter.id}/${chapter.slug}`);
    setTimeout(() => {
      isFirstMount.current = false;
    }, 550);
  };

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    scrollRef.current?.focus();
    const calculateScrollDistance = () => {
      const scrollTop = scrollElement?.scrollTop ?? 0;
      const scrollHeight = scrollElement?.scrollHeight ?? 0;
      const clientHeight = scrollElement?.clientHeight ?? 0;
      const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(scrolled);
    };
    scrollElement?.addEventListener('scroll', calculateScrollDistance);
    return () => {
      scrollElement?.removeEventListener('scroll', calculateScrollDistance);
    };
  }, [scrollRef, currentRoute]);

  const scrollUp = () => {
    if (scrollRef.current) {
      const nextScrollTop = Math.max(scrollRef.current.scrollTop - 80, 0);

      if (!isFirstMount.current && scrollRef.current.scrollTop <= 20) {
        prevPage();
      } else {
        scrollRef.current.scrollTo({
          top: nextScrollTop,
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      const nextScrollTop = Math.min(
        scrollRef.current.scrollTop + 80,
        scrollRef.current.scrollHeight
      );

      if (
        !isFirstMount.current &&
        scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
          scrollRef.current.scrollHeight - 20
      ) {
        checkNeedQuiz();
      } else {
        scrollRef.current.scrollTo({
          top: nextScrollTop,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <ScrollContext.Provider value={{ progress, scrollRef, scrollUp, scrollDown, nextPage }}>
      {children}
    </ScrollContext.Provider>
  );
};
