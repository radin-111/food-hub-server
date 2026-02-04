import {
  Meals,
  ProviderProfiles,
  ProviderStatus,
  Role,
} from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllProviderProfiles = async (page: number) => {
  const totalPages =
    Math.ceil(
      (await prisma.providerProfiles.count({
        where: {
          isActive: ProviderStatus.ACTIVE,
        },
      })) / 15,
    ) || 1;
  const result = await prisma.providerProfiles.findMany({
    take: 15,
    skip: (page - 1) * 15,
    where: {
      isActive: ProviderStatus.ACTIVE,
    },
  });
  return { result, totalPages };
};
const createProviderProfiles = async (
  profileData: Omit<ProviderProfiles, "createdAt" | "updatedAt" | "id">,
  userId: string,
) => {
  const result = await prisma.providerProfiles.create({
    data: {
      ...profileData,
      userId: userId,
    },
  });
  return result;
};

const updateProviderProfiles = async (
  id: string,
  data: ProviderProfiles,
  userId: string,
) => {
  const providerProfile = await prisma.providerProfiles.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  const result = await prisma.providerProfiles.update({
    where: {
      id: providerProfile?.id,
    },
    data,
  });
  return result;
};

const getProviderProfilesRequest = async (page: number) => {
  const totalPages =
    Math.ceil(
      (await prisma.providerProfiles.count({
        where: {
          isActive: ProviderStatus.PENDING,
        },
      })) / 15,
    ) || 1;
  const result = await prisma.providerProfiles.findMany({
    take: 15,
    skip: (page - 1) * 15,
    where: {
      isActive: ProviderStatus.PENDING,
    },
  });
  return { result, totalPages };
};

const updateProviderProfilesRequest = async (
  id: string,
  data: ProviderProfiles,
) => {
  const userID = await prisma.providerProfiles.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });

  
    if(data.isActive===ProviderStatus.ACTIVE){
      await prisma.user.update({
        where: {
          id: userID?.userId,
        },
        data: {
          role: Role.PROVIDER,
        },
      });
    }
 
  const result = await prisma.providerProfiles.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const providerProfilesServices = {
  createProviderProfiles,
  getAllProviderProfiles,
  updateProviderProfiles,
  updateProviderProfilesRequest,
  getProviderProfilesRequest,
};
