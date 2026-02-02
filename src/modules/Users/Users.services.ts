import { Role } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async (page: number) => {
    const users = await prisma.user.findMany(
        {
            take:15,
            skip:(page-1)*15,
            
            select:{
                id:true,
                email:true,
                role:true,
                
            }
        }
    );
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

export const userServices={
    getAllUsers,
    updateUserRole,
}