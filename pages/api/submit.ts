// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export type Result = {
  score: number;
};
export type correctArr = {
  question: number;
  answer?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const { quizId, results } = req.body;
  const correct = await prisma.question.findMany({
    where: {
      quizId: Number(quizId),
    },
    include: {
      answers: true,
    },
  });
  const map: correctArr[] = correct.map((c, index) => {
    return {
      question: c.id,
      answer: c.answers.find((a) => a.correct)!.id,
    };
  });
  let count = 0;
  results.forEach((r: correctArr) => {
    if (map.find((a) => a.question === r.question && a.answer === r.answer)) {
      count++;
    }
  });

  const score = Math.round(Math.floor((count / map.length) * 100));
  res.status(200).json({ score });
}
