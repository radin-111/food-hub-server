import { ProviderProfiles } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createProviderProfiles = async(data:ProviderProfiles)=> {
    const result = await prisma.providerProfiles.create({
        data
    })
    return result;
}

export const providerProfilesServices = {
    createProviderProfiles
}