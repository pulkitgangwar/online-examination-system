import { nanoid } from "nanoid";
import { User, Session } from "../interface/interface";
import { prisma } from "../config/client";

export const getUser = async (id: string): Promise<User> => {
  try {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) return null;

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getSession = async (id: string): Promise<Session> => {
  try {
    const session = await prisma.session.findFirst({ where: { id } });

    if (!session) return null;
    return session;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const checkUserExists = async (id: string): Promise<User> => {
  try {
    const user = await prisma.user.findFirst({ where: { id: id } });
    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    return null;
  }
};

export const createUser = async (user: User): Promise<User> => {
  try {
    const currentUser = await checkUserExists(user.id);
    if (currentUser) {
      return currentUser;
    }

    const newUser = await prisma.user.create({
      data: {
        ...user,
      },
    });

    return newUser;
  } catch (err) {
    console.log(err, "createuser function");
    return null;
  }
};

export const createUserSession = async (user: User): Promise<Session> => {
  try {
    const newSession = await prisma.session.create({
      data: {
        id: nanoid(),
        userId: user.id,
      },
    });

    return newSession;
  } catch (err) {
    console.log(err, "create user session");
    return null;
  }
};

export const createUserAndSession = async (user: User): Promise<Session> => {
  try {
    const currentUser = await createUser(user);
    if (!currentUser) {
      return null;
    }

    const session = await createUserSession(currentUser);
    return session;
  } catch (err) {
    console.log(err, "createuserandsession function");
    return null;
  }
};
