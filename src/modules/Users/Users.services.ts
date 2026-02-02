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

export const userServices={
    getAllUsers
}