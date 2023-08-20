import React from 'react';
import Image from 'next/image';

import styles from './Header.module.css';
const Header = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.logo}
        src="/assets/logo.png"
        alt="Logo de la Autoridad Nacional de Transparencia y Acceso a la Información"
        width={393}
        height={80}
        priority
      />
    </div>
  );
};

export default Header;
