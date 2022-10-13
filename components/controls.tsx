import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import useQuizContextValue from '../hooks/useQuizContextValue';

export default function Controls(): JSX.Element {
  let navbarClasses = ['bg-white', 'fixed', 'w-screen', 'top-0'];
  const { quiz, nextQuestion, prevQuestion, currentQuestion } =
    useContext(QuizContext);
  //console.log('QUIZ: ', quiz);
  return (
    <header className={navbarClasses.join(' ')}>
      <nav
        className='mx-auto max-w-10xl px-4 sm:px-6 lg:px-12'
        aria-label='Top'
      >
        <div className='flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none'>
          <div className='flex items-center'>
            <a href='/#'>
              <span className='sr-only'>Test Ape</span>
              <img className='h-10 w-auto' src='/logo.svg' alt='' />
            </a>
            &nbsp;&nbsp;
            <span className='text-md font-bold text-black'>{quiz}</span>
            <div className='ml-10 hidden space-x-8 lg:block'></div>
          </div>
          <div className='ml-10 space-x-4'>
            {currentQuestion?.hasPrev() ? (
              <button
                onClick={prevQuestion}
                className='inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75'
              >
                Prev
              </button>
            ) : null}
            {currentQuestion?.hasNext() ? (
              <button
                onClick={nextQuestion}
                className='inline-block rounded-md border border-indigo-500 bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50'
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
}
