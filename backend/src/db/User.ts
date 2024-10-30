import { PrismaClient } from "@prisma/client";
import { User} from "../types";
const prisma = new PrismaClient();

type UserWithoutPassword=Required<Pick<User,"id"|"email"|"username">>;
export const createUser = async ({
  username,
  password,
  email,
}: Required<Omit<User,"id">>): Promise<UserWithoutPassword> => {
  return await prisma.users.create({
    data: {
      username,
      email,
      password,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

export const getAllUsers = async (): Promise<UserWithoutPassword[]> => {
  return await prisma.users.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

export const getUserById = async (
  userId: number
): Promise<UserWithoutPassword | null> => {
  return await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

export const getUserByEmail = async (
  email: string 
): Promise<User| null> => {
  return await prisma.users.findFirst({
    where:{
       email
    },
    select: {
      id: true,
      username: true,
      email: true,
      password:true,
    },
  });
};
