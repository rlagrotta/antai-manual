'use client';

import './globals.css';
import { useEffect, useRef } from 'react';
import { Lexend_Exa } from 'next/font/google';

import { Layout } from './../components/Layout';
import { ScrollProvider } from './../contexts/ScrollContext';

const LexendExa = Lexend_Exa({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
}

// Este componente manejará el enfoque en las transiciones de ruta.
const FocusHandler = ({ children }: Props) => {
  const containerRef = useRef<HTMLElement>(null);

  // En cada cambio de ruta, coloca el foco en el contenedor principal.
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  });

  return (
    // El atributo tabIndex es necesario para hacer que un elemento no enfocable sea enfocable.
    <main tabIndex={-1} ref={containerRef}>
      {children}
    </main>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>
          Manual de Procedimientos y Lineamientos del Oficial de Información - AUTORIDAD NACIONAL DE
          TRANSPARENCIA Y ACCESO A LA INFORMACION
        </title>
        <meta
          name="description"
          content="Manual de funciones del Oficial de Información, creado para garantizar el derecho de acceso a la información pública conforme a leyes y tratados. Este manual provee el flujograma para la publicación de información, la atención de solicitudes y el perfil ético requerido para su correcto desempeño."
        />
      </head>
      <body className={`${LexendExa.className}`}>
        <FocusHandler>
          <ScrollProvider>
            <Layout>{children}</Layout>
          </ScrollProvider>
        </FocusHandler>
      </body>
    </html>
  );
}
