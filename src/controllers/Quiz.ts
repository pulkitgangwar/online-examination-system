import { Response } from "express";
import { RequestWithUser } from "../interface/interface";
import { nanoid } from "nanoid";
import { prisma } from "../config/client";
import { QuizData } from "../interface/interface";

export class Quiz {
  static async home(req: RequestWithUser, res: Response): Promise<void> {
    res.send("hello quiz");
  }

  static async showAddQuiz(req: RequestWithUser, res: Response): Promise<void> {
    res.render("quiz/add-quiz", { route: "showaddquiz route" });
  }

  static async addQuiz(req: RequestWithUser, res: Response): Promise<void> {
    const quiz: QuizData = req.body;

    const response = await prisma.quiz.create({
      data: {
        id: nanoid(),
        title: quiz.title,
        description: quiz.description,
        date: new Date(quiz.date).toISOString(),
        Questions: {
          create: quiz.questions.map((question) => ({
            id: nanoid(),
            question: question.question,
            subject: {
              create: { id: nanoid(), subject: question.subject },
            },
            options: {
              create: [
                { id: nanoid(), option: question.options.a },
                { id: nanoid(), option: question.options.b },
                { id: nanoid(), option: question.options.c },
                { id: nanoid(), option: question.options.d },
              ],
            },
          })),
        },
      },
    });

    console.log(response);

    res.json(req.body);
  }
}
