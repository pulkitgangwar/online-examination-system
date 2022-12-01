import { Role } from "@prisma/client";
import { Response } from "express";
import { RequestWithUser } from "../interface/interface";
import { AuthUser } from "../services/User";
import { nanoid } from "nanoid";
import { prisma } from "../config/client";
import { parseDate } from "../utils/parseDate";
import { parseTime } from "../utils/parseTime";

export class DbUser {
  static async allUsers(req: RequestWithUser, res: Response) {
    const users = await AuthUser.getAllUsers();
    console.log("all users route");

    if (!users) {
      console.log("no user found");
    }

    res.render("users/all-users", {
      users: users
        .filter((user) => user.email !== req.user.email)
        .map((user) => ({ ...user, isUserStudent: user.role === "STUDENT" })),
    });
  }

  static async getStudents(req: RequestWithUser, res: Response) {
    try {
      console.log("student user route");
      const students = await prisma.user.findMany({
        where: {
          role: "STUDENT",
          name: {
            contains: req.query?.name as string,
            mode: "insensitive",
          },
          email: {
            contains: req.query?.email as string,
            mode: "insensitive",
          },
          semester: {
            equals: isNaN(parseInt(req.query?.semester as string))
              ? undefined
              : (parseInt(req.query?.semester as string) as number),
          },
        },
      });

      res.render("users/all-users", {
        users: students
          .filter((user) => user.email !== req.user.email)
          .map((user) => ({ ...user, isUserStudent: user.role === "STUDENT" })),
        email: req.query.email ? req.query.email : "",
        name: req.query.name ? req.query.name : "",
        semester: req.query.semester ? req.query.semester : "",
      });
    } catch (err) {
      console.log("err in students");
      throw err;
    }
  }

  static async getTeachers(req: RequestWithUser, res: Response) {
    try {
      console.log("teacher user route");
      const teachers = await prisma.user.findMany({
        where: {
          role: "TEACHER",
          name: {
            contains: req.query?.name as string,
            mode: "insensitive",
          },
          email: {
            contains: req.query?.email as string,
            mode: "insensitive",
          },
          semester: {
            equals: isNaN(parseInt(req.query?.semester as string))
              ? undefined
              : (parseInt(req.query?.semester as string) as number),
          },
        },
      });

      res.render("users/all-users", {
        users: teachers
          .filter((user) => user.email !== req.user.email)
          .map((user) => ({ ...user, isUserStudent: user.role === "STUDENT" })),
        email: req.query.email ? req.query.email : "",
        name: req.query.name ? req.query.name : "",
        semester: req.query.semester ? req.query.semester : "",
      });
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  static async getUserRegistrations(
    req: RequestWithUser,
    res: Response
  ): Promise<void> {
    try {
      const registrations = await prisma.registration.findMany({
        where: {
          name: {
            contains: req.query?.name as string,
            mode: "insensitive",
          },
          email: {
            contains: req.query?.email as string,
            mode: "insensitive",
          },
          semester: {
            equals: isNaN(parseInt(req.query?.semester as string))
              ? undefined
              : (parseInt(req.query?.semester as string) as number),
          },
        },
      });

      res.render("users/user-registrations", {
        users: registrations,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  static async editUser(req: RequestWithUser, res: Response) {
    try {
      if (!req.params?.id) return res.redirect("/users");
      const user = await prisma.user.findFirst({
        where: { id: req.params.id },
      });

      if (!user) {
        return res.redirect("/users");
      }

      res.render("users/edit-user", {
        user,
        isEditingUserTeacher: user.role === "TEACHER",
      });
      return null;
    } catch (err) {
      console.log("err in user controlller", err);
      return null;
    }
  }

  static async approveUserRegistration(req: RequestWithUser, res: Response) {
    try {
      const registration = await prisma.registration.findFirst({
        where: { id: req.params.id },
      });

      const upsertedUser = await prisma.user.upsert({
        where: {
          crn: registration.crn,
        },
        update: {
          semester: registration.semester,
          name: registration.name,
        },
        create: {
          email: registration.email,
          name: registration.name,
          semester: registration.semester,
          crn: registration.semester === 1 ? null : registration.crn,
          role: "STUDENT",
        },
      });
      console.log("user upserted");

      await prisma.registration.delete({
        where: { id: req.params.id },
      });

      res.redirect("/users/registration");
    } catch (err) {
      console.log(err.message);
    }
  }

  static async declineUserRegistration(req: RequestWithUser, res: Response) {
    try {
      await prisma.registration.delete({
        where: { id: req.params.id },
      });
      res.redirect("/users/registration");
    } catch (err) {
      console.log(err.message);
    }
  }

  static async editUserCallback(req: RequestWithUser, res: Response) {
    try {
      if (!req.params?.id) return res.redirect("/users");

      if (
        !req.body?.email ||
        !req.body?.name ||
        !req.body?.semester ||
        !req.body?.role
      ) {
        return res.render("users/edit-user", {
          error: "invalid data provided",
        });
      }

      const newUser = await prisma.user.update({
        where: { id: req.params.id },
        data: {
          email: req.body.email,
          name: req.body.name,
          role: req.body.role,
          semester: parseInt(req.body.semester),
          updatedAt: new Date(),
        },
      });

      if (!newUser)
        return res.render("users/edit-user", {
          error: "something went wrong",
        });

      res.redirect("/users");
    } catch (err) {
      console.log("err inside user controller", err);
      return null;
    }
  }

  static async addUser(req: RequestWithUser, res: Response) {
    res.render("users/add-user");
  }

  static async addUserCallback(req: RequestWithUser, res: Response) {
    // const { email, name, year, semester, role } = req.body;
    if (
      !req.body?.email ||
      !req.body?.name ||
      !req.body?.semester ||
      !req.body?.role
    ) {
      return res.render("users/add-user", {
        error: "invalid data provided",
      });
    }

    try {
      const user = await AuthUser.findUser(req.body.email);
      if (user) {
        return res.render("users/add-user", {
          error: "user already exists",
        });
      }

      const currentUser = {
        email: req.body.email,
        name: req.body.name,
        picture: "",
        role: req.body.role,
        year: parseInt(req.body.year),
      };

      const newUser = await AuthUser.createUser({
        email: req.body.email as string,
        name: req.body.name as string,
        picture: "",
        role: req.body.role as Role,
        id: nanoid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        semester: parseInt(req.body.semester as string),
        crn: nanoid(),
      });

      if (!newUser) {
        return res.render("users/add-user", {
          error: "something went wrong please try again later",
        });
      }

      res.redirect("/users");
    } catch (err) {
      console.log("err in user controller", err);
      res.render("users/add-user", {
        error: "something went wrong",
      });
    }
  }

  static async deleteUser(req: RequestWithUser, res: Response) {
    if (!req.params?.id) return res.redirect("/users");
    await AuthUser.deleteUser(req.params.id);
    res.redirect("/users");
  }

  static async showUserReports(
    req: RequestWithUser,
    res: Response
  ): Promise<void> {
    try {
      if (!req.params.userId) {
        return res.redirect("/users");
      }

      const reports = await prisma.report.findMany({
        where: {
          userId: req.params.userId,
        },
        include: {
          quiz: true,
        },
      });

      if (!reports) {
        console.log("no report found");
      }

      return res.render("users/reports", {
        reports: reports.map((report) => ({
          ...report,
          startingDateInFormat: parseDate(
            report.quiz.startingDate.toISOString()
          ),
          endingDateInFormat: parseDate(report.quiz.endingDate.toISOString()),
          timeLimitInFormat: parseTime(report.quiz.timeLimit * 60),
        })),
      });
    } catch (err) {
      console.log(err);
    }
  }
}
