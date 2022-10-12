import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const quizData: Prisma.QuizCreateInput[] = [
  {
    name: 'Javascript Quiz',
    slug: 'javascript-quiz',
    published: true,
    questions: {
      create: [
        {
          question: 'What does HTML stand for?',
          answers: {
            create: [
              { answer: 'Holy Terminal Mother Linux', correct: false },
              { answer: 'Hypertext Markup Language', correct: true },
              { answer: 'Holiday Toronto Markup Language', correct: false },
              { answer: 'Hypertext Markup for Linux', correct: false },
            ],
          },
        },
        {
          question: 'What does XML stand for?',
          answers: {
            create: [
              { answer: 'Extra Medium Labels', correct: false },
              { answer: 'Hypertext Markup Language', correct: false },
              { answer: 'Extensible Markup Language', correct: true },
              { answer: 'Hypertext Markup for Linux', correct: false },
            ],
          },
        },
        {
          question: 'What is NodeJS?',
          answers: {
            create: [
              { answer: 'A front end framework', correct: false },
              { answer: 'Express Server', correct: false },
              { answer: 'Holiday Toronto Markup Language', correct: false },
              { answer: 'A Javascript Runtime', correct: true },
            ],
          },
        },
        {
          question: 'What does CSS stand for?',
          answers: {
            create: [
              { answer: 'Cool Silver Surfer', correct: false },
              { answer: 'Hypertext Markup Language', correct: false },
              { answer: 'Cascading Style Sheets', correct: true },
              { answer: 'Hypertext Markup for Linux', correct: false },
            ],
          },
        },
        {
          question: 'What is WWW mean?',
          answers: {
            create: [
              { answer: "Wendy's Wild Wings", correct: false },
              { answer: 'Wikipedia Language', correct: false },
              { answer: 'Westminister, London, UK', correct: false },
              { answer: 'World Wide Web', correct: true },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'HTML Quiz',
    slug: 'html-quiz',
    published: true,
    questions: {
      create: [
        {
          question: 'What does TH stand for?',
          answers: {
            create: [
              { answer: 'Totally horrible things', correct: false },
              { answer: 'Things to do together', correct: false },
              { answer: 'Holiday Toronto Markup Language', correct: false },
              { answer: 'Hypertext Markup for Table Head', correct: true },
            ],
          },
        },
        {
          question: 'What does TR stand for?',
          answers: {
            create: [
              { answer: 'Toronto right to represent', correct: false },
              { answer: 'Big Bang Theory', correct: false },
              { answer: 'Hypertext Markup for Table Row', correct: true },
              { answer: 'Extensible Markup Language', correct: false },
            ],
          },
        },
        {
          question: 'What does margin:0 auto; do?',
          answers: {
            create: [
              { answer: 'A front end framework', correct: false },
              { answer: 'It scales a div', correct: false },
              { answer: 'It aligns obects horizontally', correct: false },
              {
                answer: 'It centers an object horizontally in a container',
                correct: true,
              },
            ],
          },
        },
        {
          question: 'What is ReactJS',
          answers: {
            create: [
              { answer: 'Cool Silver Surfer', correct: false },
              { answer: 'Hypertext Moguls of sports', correct: false },
              { answer: 'A front end framework', correct: true },
              { answer: 'Java Module', correct: false },
            ],
          },
        },
        {
          question: 'What is GOAT mean?',
          answers: {
            create: [
              { answer: 'Greatest Of All Time', correct: true },
              { answer: 'Wikipedia Language', correct: false },
              { answer: 'John Trudeau', correct: false },
              { answer: 'Toronto mid term election', correct: true },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'Mandarin Quiz',
    slug: 'mandarin-quiz',
    published: false,
  },
  {
    name: 'French Quiz',
    slug: 'french-quiz',
    published: false,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const q of quizData) {
    const quiz = await prisma.quiz.create({
      data: q,
    });
    console.log(`Created quiz with id: ${quiz.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
