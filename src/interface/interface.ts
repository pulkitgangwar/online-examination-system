import { Request } from "express";

export interface Query {
  [key: string]: string;
}

export interface User {
  email: string;
  name: string;
  id: string;
  picture: string;
}

export interface Session {
  userId: string;
  id: string;
}

export enum Role {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

export interface RequestWithUser extends Request {
  user: {
    role: Role;
    email: string;
    name: string;
    id: string;
    picture: string;
  };
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
}


export interface QuizQuestions {
  question: string;
  correctAnswer: string;
  subject: string;
  options: { [key: string]: string };
}

export interface QuizData {
  title: string;
  description: string;
  questions: QuizQuestions[];
  date: Date;
}