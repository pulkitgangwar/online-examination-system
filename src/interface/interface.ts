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

export interface RequestWithUser extends Request {
  user: User;
}
