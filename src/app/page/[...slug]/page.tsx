import fsPromises from 'fs/promises';
import path from 'path';

import { ChapterComponent } from '@/components/Chapter/Chapter';
import { Chapter } from '@/interfaces/Chapter';
import manifest from '../../../json/manifest.json';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const chapters = manifest.chapters.map(chapter => ({
    slug: [chapter.id.toString(), chapter.slug],
  }));
  return chapters;
}

async function getChapter(id: number) {
  const filePath = path.join(process.cwd(), `/src/json/${id}.json`);
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString()) as Chapter;
  return objectData;
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const id = parseInt(slug[0]);
  const chapter = await getChapter(id);
  return {
    title:
      chapter.title +
      ' | Manual de Procedimientos y Lineamientos del Oficial de Información - AUTORIDAD NACIONAL DE TRANSPARENCIA Y ACCESO A LA INFORMACION',
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const id = parseInt(slug[0]);
  const chapter = await getChapter(id);
  return (
    <>
      <ChapterComponent
        title={chapter.title}
        subtitle={chapter.subtitle}
        sections={chapter.sections}
      />
    </>
  );
}
