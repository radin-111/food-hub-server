import { auth as betterAuth } from "../lib/auth";
import { type Request, type Response, type NextFunction } from "express";
import { useRoles } from "../types/userRoles";
import { prisma } from "../lib/prisma";
export enum UserRoles {
  CUSTOMER = "CUSTOMER",
  PROVIDER = "PROVIDER",
  ADMIN = "ADMIN",
}
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        providerId?: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get user session
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required. Please verfiy your email!",
        });
      }

      if (roles.length && !roles.includes(session.user.role)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
      };

      if (req.user.role === useRoles.PROVIDER) {
        const provider = await prisma.providerProfiles.findUnique({
          where: {
            userId: req.user.id,
          },
        });
        req.user.providerId = provider?.id;
      }
      next();
    } catch (err: any) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized!",
        error: err.message,
      });
    }
  };
};

export default auth;
