import { Meals } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMeals = async (meal: Meals, providerId: string) => {
  const result = await prisma.meals.create({
    data: { ...meal, providerId },
  });
  return result;
};

const updateMeals = async (id: string, updatedData: any) => {
  const result = await prisma.meals.update({
    where: {
      id,
    },
    data: updatedData,
  });
  return result;
};

const deleteMeals = async (id: string) => {
  const result = await prisma.meals.delete({
    where: {
      id,
    },
  });
  return result;
};

const getAllMeals = async (page: number, search: string) => {
  const totalMeals = await prisma.meals.count({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          category: {
            is: {
              cuisineType: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
  });
  const totalPages = Math.ceil(totalMeals / 9);
  const result = await prisma.meals.findMany({
    take: 9,
    skip: (page - 1) * 9,
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
      image: true,
      description: true,
    },
  });
  return {
    result,
    totalPages,
  };
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const createCategories = async (category: any) => {
  const result = await prisma.category.create({
    data: { ...category },
  });
  return result;
};

const updateCategories = async (id: string, updatedData: any) => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: updatedData,
  });
  return result;
};

const getMyMeals = async (providerId: string, page: number) => {
  const totalMeals = await prisma.meals.count({
    where: {
      providerId,
    },
  });
  const totalPages = Math.ceil(totalMeals / 15);
  const result = await prisma.meals.findMany({
    take: 15,
    skip: (page - 1) * 15,
    where: {
      providerId,
    },
    include: {
      category: true,
    },
  });
  return {
    result,
    totalPages,
  };
};

const getMealsById = async (id: string) => {
  const result = await prisma.meals.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          restaurantName: true,
        },
      },
      reviews: true,
    },
  });
  return result;
};

export const MealsServices = {
  createMeals,
  createCategories,
  updateMeals,
  getMealsById,
  updateCategories,
  deleteMeals,
  getAllMeals,
  getMyMeals,
  getAllCategories,
};
