import {
  DoublyLinkedList,
  DoublyLinkedListNode,
} from '@datastructures-js/linked-list';
import { Question } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import { AQuestion, QuizContextData } from '../context/QuizContext';

function useQuizContextValue(): QuizContextData {
  const [questions, setQuestions] = useState<DoublyLinkedList<AQuestion>>(
    DoublyLinkedList.fromArray<AQuestion>([])
  );
  const [currentQuestion, setCurrentQuestion] = useState<
    DoublyLinkedListNode<AQuestion>
  >(questions.head());

  const [quiz, setQuiz] = useState('');

  const nextQuestion = (): void => {
    if (currentQuestion.hasNext()) {
      setCurrentQuestion(currentQuestion.getNext());
    } else {
      //submit
    }
  };

  const prevQuestion = (): void => {
    if (currentQuestion.hasPrev()) {
      setCurrentQuestion(currentQuestion.getPrev());
    }
  };

  const answerQuestion = (answerId: number): void => {
    currentQuestion.setValue({
      ...currentQuestion.getValue(),
      answer: answerId,
    });
  };
  const init = useCallback((data: AQuestion[], title: string) => {
    setQuiz(title);
    const dll = DoublyLinkedList.fromArray<AQuestion>(data);
    setQuestions(dll);
    setCurrentQuestion(dll.head());
  }, []);

  return {
    quiz,
    questions,
    currentQuestion,
    nextQuestion,
    prevQuestion,
    answerQuestion,
    init,
  };
}

export default useQuizContextValue;
