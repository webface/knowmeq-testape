import {
  DoublyLinkedList,
  DoublyLinkedListNode,
} from '@datastructures-js/linked-list';
import { Answer, Question, Quiz } from '@prisma/client';
import { createContext } from 'react';
import { Result } from '../pages/api/submit';

export type AQuestion = Question & {
  answer?: number;
  answers?: Answer[];
};

export interface QuizContextData {
  quiz: string;
  score?: number;
  isComplete: boolean;
  questions: DoublyLinkedList<AQuestion>;
  currentQuestion: DoublyLinkedListNode<AQuestion>;
  init: (data: AQuestion[], title: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  answerQuestion: (answerId: number) => void;
  submit: () => void;
}

export const quizContextDefaultValue: QuizContextData = {
  questions: new DoublyLinkedList<AQuestion>(),
  quiz: '',
  score: undefined,
  isComplete: false,
  currentQuestion: new DoublyLinkedListNode<AQuestion>(),
  init: () => null,
  nextQuestion: () => null,
  prevQuestion: () => null,
  answerQuestion: () => null,
  submit: () => null,
};

export const QuizContext = createContext<QuizContextData>(
  quizContextDefaultValue
);
