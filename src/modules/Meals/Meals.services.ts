import { Meals } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createMeals = async (meal: any) => {
  const result = await prisma.meals.create({
    data: meal,
  });
  return result;
}

const updateMeals = async (id: string, updatedData: any) => {
  const result = await prisma.meals.update({
    where: {
      id,
    },
    data: updatedData,
  });
  return result;
}


const deleteMeals = async (id: string) => {
  const result = await prisma.meals.delete({
    where: {
      id,
    },
  });
  return result;
}

export const MealsServices = {
  createMeals,
  updateMeals,
  deleteMeals,
}