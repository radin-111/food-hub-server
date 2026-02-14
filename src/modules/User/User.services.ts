import { prisma } from "../../lib/prisma";
import { UserRoles } from "../../middlewares/auth";

const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      providerProfiles: true,
    },
  });

  return user;
};
const updateUserProfile = async (
  userId: string,
  userData: any,
  role: string,
) => {
  if (role === UserRoles.PROVIDER) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: userData.name,
        image: userData.image,
        phone: userData.phone,
        providerProfiles: {
          update: {
            restaurantName: userData.providerProfiles.restaurantName,
            address: userData.providerProfiles.address,
            city: userData.providerProfiles.city,
            country: userData.providerProfiles.country,
            postalCode: userData.providerProfiles.postalCode,
            phoneNumber: userData.providerProfiles.phoneNumber,
            website: userData.providerProfiles.website,
            description: userData.providerProfiles.description,
          },
        },
      },
    });
    return user;
  } else {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: userData.image,
        name: userData.name,
        phone: userData.phone,
      },
    });
    return user;
  }
};

export const userServices = {
  getUserProfile,
  updateUserProfile,
};
