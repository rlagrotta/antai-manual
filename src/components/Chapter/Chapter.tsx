'use client';
import React, { useRef, useEffect, useContext } from 'react';

import styles from './Chapter.module.css';
import { ScrollContext } from './../../contexts/ScrollContext';
import { Chapter, TextContent, MixedContent, ListContent, Section } from '../../interfaces/Chapter';
import Image from 'next/image';
import * as Ilustrations from '../../../public/assets/chapters_ilustrations';
import Link from 'next/link';
import { Url } from 'url';
import svgLink from '../../../public/assets/icons/link.svg';

const TextComponent: React.FC<TextContent> = ({ textType, content }) => {
  return textType === 'bold' ? <strong>{content}</strong> : <span>{content}</span>;
};

const MixedTextComponent: React.FC<MixedContent> = ({ content }) => {
  return (
    <>
      {content.map((text, index) => (
        <TextComponent key={index} {...text} />
      ))}
    </>
  );
};

const ListComponent: React.FC<ListContent> = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{typeof item === 'string' ? item : <TextComponent {...item} />}</li>
      ))}
    </ul>
  );
};

const SectionComponent: React.FC<Section> = ({
  contentType,
  textType,
  content,
  url,
  src,
  alt,
  heigth,
}) => {
  switch (contentType) {
    case 'text':
      return textType === 'mixed' ? (
        <p className={styles.text}>
          <MixedTextComponent content={content as TextContent[]} />
        </p>
      ) : (
        <p className={styles.text}>
          <TextComponent textType={textType as 'bold' | 'normal'} content={content as string} />
        </p>
      );
    case 'list':
      return <ListComponent items={content as (string | TextContent)[]} />;
    case 'image':
      return (
        <figure>
          <img className={styles.image} src={src as string} alt={alt as string} />
        </figure>
      );
    case 'link':
      return (
        <div className={styles.linkContainer}>
          <Link className={styles.link} prefetch target="_blank" href={url as Url}>
            <span className={styles.linkText}>{content as string}</span>
            <Image src={svgLink} alt="external link" width={15} height={15} />
          </Link>
        </div>
      );
    case 'break':
      return <br />;
    default:
      return null;
  }
};

interface IlustrationsDictionary {
  [key: string]: any;
}

const ilustrationsDictionary: IlustrationsDictionary = {
  Introducción: Ilustrations.informacion,
  OBJETIVO: Ilustrations.objetivos,
  'EL OFICIAL DE INFORMACIÓN': Ilustrations.el_oficial_de_info,
  'TRANSPARENCIA PASIVA': Ilustrations.solicitud_acceso_info,
  'OBLIGACIONES DEL OFICIAL DE INFORMACIÓN': Ilustrations.obligaciones_de_la_oficial,
  'DESCRIPCIÓN DEL TRABAJO': Ilustrations.descripcion_trabajo,
  'TRANSPARENCIA ACTIVA': Ilustrations.transparencia_activa,
  'FLUJOGRAMA DE MONITOREO': Ilustrations.flujograma_monitoreo,
  'DATOS ABIERTOS DE GOBIERNO': Ilustrations.datos_abiertos_gob,
  'PROTECCIÓN DE DATOS PERSONALES': Ilustrations.protecion_datos_personales,
  'BUENAS PRÁCTICAS': Ilustrations.buenas_practicas,
};
// no estoy seguro de el orden de las imagenes, verificar
export const ChapterComponent: React.FC<Chapter> = ({ title, subtitle, sections }) => {
  const { scrollRef } = useContext(ScrollContext)!;
  const showIlustration = title in ilustrationsDictionary;

  return (
    <article role="main" aria-live="polite" className={styles.container} ref={scrollRef}>
      {showIlustration && (
        <Image height={150} src={ilustrationsDictionary[title]} alt={title + 'ilustracion'} />
      )}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.sections}>
        {sections.map((section, index) => (
          <SectionComponent key={index} {...section} />
        ))}
      </div>
    </article>
  );
};
