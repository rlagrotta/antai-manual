import fsPromises from 'fs/promises';
import path from 'path';

import React from 'react';
import QuizView from '../../../components/QuizView/QuizView';
import { QuizData } from '@/interfaces/Quiz';

import manifest from '../../../json/manifest.json';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const chapters = manifest.chapters.map(chapter => ({
    slug: [chapter.id.toString(), chapter.slug],
  }));
  return chapters;
}

async function getQuiz(id: number) {
  const filePath = path.join(process.cwd(), `/src/json/${id}.json`);
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString()).quiz as QuizData;
  return objectData;
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const id = parseInt(slug[0]);
  const quizData = await getQuiz(id);
  return (
    <>
      <QuizView quizData={quizData} />
    </>
  );
}
