import {
  DoublyLinkedList,
  DoublyLinkedListNode,
} from '@datastructures-js/linked-list';
import { Answer, Question, Quiz } from '@prisma/client';
import { createContext } from 'react';

export type AQuestion = Question & {
  answer?: number;
  answers?: Answer[];
};

export interface QuizContextData {
  quiz: string;
  questions: DoublyLinkedList<AQuestion>;
  currentQuestion: DoublyLinkedListNode<AQuestion>;
  init: (data: AQuestion[], title: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  answerQuestion: (answerId: number) => void;
}

export const quizContextDefaultValue: QuizContextData = {
  questions: new DoublyLinkedList<AQuestion>(),
  quiz: '',
  currentQuestion: new DoublyLinkedListNode<AQuestion>(),
  init: () => null,
  nextQuestion: () => null,
  prevQuestion: () => null,
  answerQuestion: () => null,
};

export const QuizContext = createContext<QuizContextData>(
  quizContextDefaultValue
);
