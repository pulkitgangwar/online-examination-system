import { Response } from "express";
import { RequestWithUser } from "../interface/interface";
import { prisma } from "../config/client";
import { parseTime } from "../utils/parseTime";
import { parseDate } from "../utils/parseDate";

export class Root {
  static async home(req: RequestWithUser, res: Response): Promise<void> {
    const quizzes = await prisma.quiz.findMany();
    console.log(quizzes);

    res.render("home/home", {
      title: "home",
      picture: req.user.picture,
      isTeacher: req.user.role === "TEACHER",
      quizzes: quizzes
        .filter((quiz) => new Date() < new Date(quiz.endingDate))
        .map((quiz) => ({
          ...quiz,
          timeLimitInFormat: parseTime(quiz.timeLimit * 60),
          startingDateInFormat: parseDate(
            quiz.startingDate.toISOString()
          ).trim(),
          endingDateInFormat: parseDate(quiz.endingDate.toISOString()).trim(),
        })),
    });
  }

  static async showUserProfile(
    req: RequestWithUser,
    res: Response
  ): Promise<void> {
    console.log(req.user);
    const user = req.user;
    res.render("home/profile", {
      user: {
        name: user.name,
        role: user.role,
        email: user.email,
        picture: user.picture,
      },
    });
  }

  static async generateReport(
    req: RequestWithUser,
    res: Response
  ): Promise<void> {
    try {
      const userExamData = req.body;

      console.log(userExamData);
    } catch (err) {
      console.log(err, "err in Root controller");
    }
  }

  // : quizzes.filter((quiz) => new Date() > new Date(quiz.endingDate))

  // static async readQuiz(req: RequestWithUser, res: Response): Promise<void> {
  //   const response = await prisma.quiz.findMany({
  //     include: { Questions: { include: { options: true, subject: true } } },
  //   });

  //   console.log(response);

  //   res.render("home/all-quiz", {
  //     quizzes: response.map((quiz) => ({
  //       title: quiz.title,
  //       description: quiz.description,
  //       id: quiz.id,
  //       date: quiz.date,
  //       isActive: new Date(quiz.date) > new Date(),
  //     })),
  //   });
  // }
}
