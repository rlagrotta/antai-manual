'use client';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>
          Manual de funciones y procedimientos de la unidad de enlace denominada Oficial de
          Información
        </h1>
      </div>
    </div>
  );
}
