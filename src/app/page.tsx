'use client';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <Image
          src="/assets/LogoAntai.svg"
          alt="Logo de la Autoridad Nacional de Transparencia y Acceso a la Información"
          width={302}
          height={56}
          priority
        />
      </div>
      <div className={styles.titleContainer}>
        <h1>
          Manual de funciones y procedimientos de la unidad de enlace denominada Oficial de
          Información
        </h1>
      </div>
    </div>
  );
}
