import { Quiz } from '@prisma/client';
import Navigation from '../components/navigation';
import TopHeader from '../components/topheader';
import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
  const quizzes = await prisma.quiz.findMany({});
  return {
    props: { quizzes },
  };
};

type Props = {
  quizzes: Quiz[];
};

const Home: NextPage<Props> = ({ quizzes }) => {
  return (
    <div className='flex min-h-screen flex-col  py-2'>
      <Head>
        <title>Test Ape</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <TopHeader />
      <Navigation />
      <main className='md:flex w-full flex-1 md:flex-row items-start justify-center text-left'>
        <div className='flex flex-col md:w-1/2 bg-teal-600 px-20 h-[calc(100vh_-_96px)] items-start justify-center'>
          <h1 className='text-6xl font-bold text-white'>
            TestApe works.
            <br />
            CVs don’t.
          </h1>

          <p className='mt-3 text-2xl text-white'>
            Our screening tests identify the best candidates and make your
            hiring decisions faster, easier, and bias-free.
          </p>
          <div className='mt-10 space-x-4'>
            <a
              href='#'
              className='inline-block rounded-md border border-indigo-500 bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50'
            >
              Try For Free
            </a>
            <a
              href='#'
              className='inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75'
            >
              Watch Video
            </a>
          </div>
        </div>
        <div className='md:w-1/2 bg-pink-300 sm:w-full px-20 h-[calc(100vh_-_96px)] flex flex-col items-start justify-center'>
          {quizzes
            ? quizzes.map((quiz: Quiz) => {
                return (
                  <a
                    href={quiz.published ? `quiz/${quiz.slug}` : '#'}
                    key={quiz.id}
                    className='mt-6 w-96 rounded-xl p-6 text-left hover:text-white focus:text-white'
                  >
                    <h3 className='text-2xl font-bold'>{quiz.name}</h3>
                    {quiz.published ? (
                      <p className='mt-4 text-xl'>
                        Find in-depth information about Next.js features and its
                        API. Take the Quiz
                      </p>
                    ) : (
                      'Not Available'
                    )}
                  </a>
                );
              })
            : null}
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
  );
};

export default Home;
