import { Url } from 'url';
import { QuizData } from './Quiz';

export interface TextContent {
  textType: 'bold' | 'normal';
  content: string;
}

export interface MixedContent {
  content: TextContent[];
}

export interface ListContent {
  items: (string | TextContent)[];
}

export interface Section {
  contentType: 'text' | 'list' | 'link' | 'image' | 'break';
  textType?: 'bold' | 'normal' | 'mixed';
  content?: string | TextContent[] | ListContent[];
  url?: Url;
  src?: string;
  alt?: string;
  heigth?: number;
}

export interface Chapter {
  title: string;
  sections: Section[];
}

export interface Chapter {
  title: string;
  subtitle?: string; // Subtítulo opcional
  sections: Section[];
  quiz?: QuizData;
}
