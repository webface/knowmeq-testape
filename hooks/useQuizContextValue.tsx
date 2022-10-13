import {
  DoublyLinkedList,
  DoublyLinkedListNode,
} from '@datastructures-js/linked-list';
import { Question } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import { AQuestion, QuizContextData } from '../context/QuizContext';
import { correctArr, Result } from '../pages/api/submit';

function useQuizContextValue(): QuizContextData {
  const [questions, setQuestions] = useState<DoublyLinkedList<AQuestion>>(
    DoublyLinkedList.fromArray<AQuestion>([])
  );
  const [currentQuestion, setCurrentQuestion] = useState<
    DoublyLinkedListNode<AQuestion>
  >(questions.head());

  const [quiz, setQuiz] = useState('');
  const [isComplete, setComplete] = useState(false);
  const [score, setScore] = useState();
  const nextQuestion = (): void => {
    if (currentQuestion.hasNext()) {
      if (!!currentQuestion.getValue().answer) {
        setCurrentQuestion(currentQuestion.getNext());
      }
    } else {
      setComplete(true);
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

  const submit = async (): Promise<Result | undefined> => {
    try {
      let results: correctArr[] = [];
      let quizID: number = 0;
      questions.forEach((node, position) => {
        const { quizId, answer, id } = node.getValue();
        quizID = quizId;
        results.push({ question: id, answer: answer });
      });
      const body = { quizId: quizID, results };
      const response = await fetch(`/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const { score } = await response.json();
      console.log({ score });
      setScore(score);
      return score;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  };

  return {
    quiz,
    questions,
    currentQuestion,
    nextQuestion,
    prevQuestion,
    answerQuestion,
    isComplete,
    init,
    submit,
    score,
  };
}

export default useQuizContextValue;
