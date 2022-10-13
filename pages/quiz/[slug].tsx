import { Answer, Question, Quiz } from '@prisma/client';
import Navigation from '../../components/navigation';
import TopHeader from '../../components/topheader';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import prisma from '../../lib/prisma';
import { AQuestion } from '../../context/QuizContext';
import Controls from '../../components/controls';
import useQuizContextValue from '../../hooks/useQuizContextValue';
import { QuizContext } from '../../context/QuizContext';
import { useEffect, useMemo } from 'react';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await prisma.quiz.findUnique({
    where: {
      slug: String(params?.slug),
    },
    include: {
      questions: {
        include: {
          answers: {
            select: { id: true, answer: true },
          },
        },
      },
    },
  });
  return {
    props: { data },
  };
};

type AQuiz = Quiz & {
  questions: AQuestion[];
};

type Props = {
  data: AQuiz;
};

const Slug: NextPage<Props> = ({ data }) => {
  const quizContextValue = useQuizContextValue();
  const { currentQuestion, init, quiz, answerQuestion } = quizContextValue;

  useEffect(() => {
    if (!!data.name) {
      console.log('init');
      init(data.questions, data.name);
    }
  }, [data]);

  const current = useMemo(() => {
    return currentQuestion?.getValue();
  }, [currentQuestion, answerQuestion]);

  return (
    <QuizContext.Provider value={quizContextValue}>
      <div className='flex min-h-screen flex-col  py-2'>
        <Head>
          <title>Test Ape</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Controls />
        <main className='flex flex-1 items-start justify-start text-left'>
          <div className='bg-gray-100 sm:w-full px-20 h-[calc(100vh_-_96px)] flex flex-col items-start justify-start py-28'>
            <div className='bg-white shadow-sm max-w-10xl gap-6 md:flex p-8 w-full'>
              <div className=' md:w-1/2 text-gray-500'>
                <p className='my-6'>Please answer the question below!</p>
                <div className='border-l-2 border-gray-300 italic pl-2'>
                  {current?.question}
                </div>
              </div>
              <div className='md:w-1/2 text-gray-500 '>
                <p className='my-6'>SELECT ONLY ONE</p>
                <div>
                  <ul className='flex flex-col gap-y-5 m-10 my-auto'>
                    {current?.answers
                      ? current?.answers.map((a: Answer) => {
                          return (
                            <li
                              className='relative w-full'
                              key={a.id}
                              onClick={() => answerQuestion(a.id)}
                            >
                              <input
                                className='peer absolute top-0 bottom-0 left-2'
                                type='radio'
                                value={a.id}
                                name='answer'
                                id={`${a.id}`}
                                defaultChecked={current.answer === a.id}
                              />
                              <label
                                className='flex p-5 px-8 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-emerald-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-emerald-500 peer-checked:text-white'
                                htmlFor={`${a.id}`}
                              >
                                {a.answer}
                              </label>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className='flex h-24 w-full items-center justify-center border-t'>
          <a
            className='flex items-center justify-center gap-2'
            href='https://www.webfacemedia.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            Powered by <img className='h-10 w-auto' src='/logo.svg' alt='' />
          </a>
        </footer>
      </div>
    </QuizContext.Provider>
  );
};

export default Slug;
