import { Role } from "../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const getAllUsers = async (page: number) => {
  const users = await prisma.user.findMany({
    take: 15,
    skip: (page - 1) * 15,

    select: {
      id: true,
      email: true,
      role: true,
    },
  });
  const totalUsers = await prisma.user.count();
  const totalPages = Math.ceil(totalUsers / 15);
  return {
    users,
    totalPages,
  };
};

const updateUserRole = async (id: string, role: Role) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });
  return result;
};

const verifyEmail = async (token: string) => {
  
  const result = await auth.api.verifyEmail({
    query: {
      token,
    },
  });
  return result;
};

export const userServices = {
  getAllUsers,
  updateUserRole,
  verifyEmail,
};
