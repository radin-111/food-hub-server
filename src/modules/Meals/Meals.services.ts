import { Meals } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMeals = async (meal: any) => {
  const result = await prisma.meals.create({
    data: meal,
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

const getAllMeals = async () => {
  const result = await prisma.meals.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
      image: true,
      description: true,
    },
  });
  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const createCategories = async (category: any) => {
  const result = await prisma.category.create({
    data: {...category},
  });
  return result;
};

export const MealsServices = {
  createMeals,
  createCategories,
  updateMeals,
  deleteMeals,
  getAllMeals,
  getAllCategories,
};
