// src/app.ts
import express from "express";
import cors from "cors";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum OrderStatus {\n  PENDING\n  PLACED\n  PREPARING\n  READY\n  CANCELLED\n  DELIVERED\n}\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role             Role              @default(CUSTOMER)\n  phone            String?\n  status           String?           @default("ACTIVE")\n  providerProfiles ProviderProfiles?\n  orders           Orders[]\n  reviews          Reviews[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nenum ProviderStatus {\n  ACTIVE\n  INACTIVE\n  PENDING\n}\n\nmodel ProviderProfiles {\n  id             String         @id @default(uuid())\n  userId         String         @unique\n  user           User           @relation(fields: [userId], references: [id], onDelete: Cascade)\n  restaurantName String\n  address        String\n  city           String\n  country        String\n  postalCode     String\n  isActive       ProviderStatus @default(PENDING)\n  phoneNumber    String\n  website        String?\n  description    String\n  rating         Float?         @default(0.0)\n  createdAt      DateTime       @default(now())\n  updatedAt      DateTime       @updatedAt\n  meals          Meals[]\n  orders         Orders[]\n  reviews        Reviews[]\n\n  @@map("provider_profiles")\n}\n\nmodel Meals {\n  id          String           @id @default(uuid())\n  name        String\n  providerId  String\n  image       String\n  provider    ProviderProfiles @relation(fields: [providerId], references: [id])\n  description String\n  price       Float\n  category    Category         @relation(fields: [categoryId], references: [id])\n  categoryId  String\n  createdAt   DateTime         @default(now())\n  updatedAt   DateTime         @updatedAt\n  orders      Orders[]\n  reviews     Reviews[]\n\n  @@map("meals")\n}\n\nmodel Orders {\n  id         String           @id @default(uuid())\n  userId     String\n  user       User             @relation(fields: [userId], references: [id])\n  providerId String\n  provider   ProviderProfiles @relation(fields: [providerId], references: [id])\n  mealId     String\n  meal       Meals            @relation(fields: [mealId], references: [id])\n  quantity   Int\n  totalPrice Float\n  status     OrderStatus      @default(PENDING)\n  createdAt  DateTime         @default(now())\n  updatedAt  DateTime         @updatedAt\n  reviews    Reviews[]\n\n  @@map("orders")\n}\n\nmodel Reviews {\n  id                 String            @id @default(uuid())\n  userId             String\n  user               User              @relation(fields: [userId], references: [id])\n  mealId             String\n  meal               Meals             @relation(fields: [mealId], references: [id])\n  orderId            String\n  order              Orders            @relation(fields: [orderId], references: [id])\n  rating             Int\n  comment            String?\n  createdAt          DateTime          @default(now())\n  updatedAt          DateTime          @updatedAt\n  providerProfiles   ProviderProfiles? @relation(fields: [providerProfilesId], references: [id])\n  providerProfilesId String?\n\n  @@map("reviews")\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  cuisineType String\n  meals       Meals[]\n\n  @@map("category")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"enum","type":"Role"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"providerProfiles","kind":"object","type":"ProviderProfiles","relationName":"ProviderProfilesToUser"},{"name":"orders","kind":"object","type":"Orders","relationName":"OrdersToUser"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"ReviewsToUser"}],"dbName":"user"},"ProviderProfiles":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfilesToUser"},{"name":"restaurantName","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"country","kind":"scalar","type":"String"},{"name":"postalCode","kind":"scalar","type":"String"},{"name":"isActive","kind":"enum","type":"ProviderStatus"},{"name":"phoneNumber","kind":"scalar","type":"String"},{"name":"website","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meals","relationName":"MealsToProviderProfiles"},{"name":"orders","kind":"object","type":"Orders","relationName":"OrdersToProviderProfiles"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"ProviderProfilesToReviews"}],"dbName":"provider_profiles"},"Meals":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfiles","relationName":"MealsToProviderProfiles"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeals"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orders","kind":"object","type":"Orders","relationName":"MealsToOrders"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"MealsToReviews"}],"dbName":"meals"},"Orders":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrdersToUser"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfiles","relationName":"OrdersToProviderProfiles"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meals","relationName":"MealsToOrders"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"totalPrice","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"OrdersToReviews"}],"dbName":"orders"},"Reviews":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewsToUser"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meals","relationName":"MealsToReviews"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Orders","relationName":"OrdersToReviews"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"providerProfiles","kind":"object","type":"ProviderProfiles","relationName":"ProviderProfilesToReviews"},{"name":"providerProfilesId","kind":"scalar","type":"String"}],"dbName":"reviews"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cuisineType","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meals","relationName":"CategoryToMeals"}],"dbName":"category"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  PROVIDER: "PROVIDER",
  ADMIN: "ADMIN"
};
var ProviderStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING: "PENDING"
};

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app.ts
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
var isProd = process.env.NODE_ENV === "production";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(
    prisma,
    {
      provider: "postgresql"
      // or "mysql", "postgresql", ...etc
    }
  ),
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.APP_URL],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        await transporter.sendMail({
          from: "FoodHub <contact@foodhub.com>",
          to: user.email,
          subject: "Verify your email",
          html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
    <style>
      /* Reset */
      body {
        margin: 0;
        padding: 0;
        background-color: #f9fafb;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Helvetica, Arial, sans-serif;
      }

      table {
        border-spacing: 0;
        width: 100%;
      }

      img {
        border: 0;
      }

      a {
        text-decoration: none;
      }

      /* Container */
      .email-wrapper {
        width: 100%;
        background-color: #f9fafb;
        padding: 24px 0;
      }

      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }

      /* Header */
      .email-header {
        background: linear-gradient(135deg, #f97316, #ef4444);
        color: #ffffff;
        text-align: center;
        padding: 24px;
      }

      .email-header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
      }

      /* Body */
      .email-body {
        padding: 32px;
        color: #374151;
        line-height: 1.6;
        font-size: 16px;
      }

      .email-body p {
        margin: 0 0 16px;
      }

      /* Button */
      .btn-wrapper {
        text-align: center;
        margin: 32px 0;
      }

      .btn {
        display: inline-block;
        background: linear-gradient(135deg, #f97316, #ef4444);
        color: #ffffff !important;
        padding: 14px 28px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
      }

      /* Footer */
      .email-footer {
        text-align: center;
        font-size: 13px;
        color: #6b7280;
        padding: 24px;
        background-color: #f9fafb;
      }

      /* Mobile */
      @media (max-width: 600px) {
        .email-body {
          padding: 24px 20px;
        }

        .email-header h1 {
          font-size: 20px;
        }
      }
    </style>
  </head>

  <body>
    <table class="email-wrapper">
      <tr>
        <td align="center">
          <table class="email-container">
            <!-- Header -->
            <tr>
              <td class="email-header">
                <h1>Verify Your Email</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="email-body">
                <p>Hi ${user.name},</p>

                <p>
                  Thanks for signing up! Please confirm your email address by
                  clicking the button below.
                </p>

                <div class="btn-wrapper">
                  <a href="${verificationUrl}" class="btn">
                    Verify Email
                  </a>
                </div>

                <p>
                  If the button doesn\u2019t work, copy and paste this link into your
                  browser:
                </p>

           

                <p>
                  This link will expire for security reasons.
                </p>

                <p>
                  \u2014 The Team
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="email-footer">
                \xA9 2026 Your App. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
        });
      } catch (err) {
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  },
  advanced: {
    useSecureCookies: isProd,
    defaultCookieAttributes: {
      sameSite: isProd ? "none" : "lax",
      secure: isProd
      // domain: isProd ? "food-hub-client-alpha.vercel.app" : undefined,
    },
    crossSubDomainCookies: {
      enabled: isProd
    }
  }
});

// src/modules/ProviderProfiles/ProviderProfiles.routes.ts
import { Router } from "express";

// src/modules/ProviderProfiles/ProviderProfiles.services.ts
var getAllProviderProfiles = async (page) => {
  const totalPages = Math.ceil(
    await prisma.providerProfiles.count({
      where: {
        isActive: ProviderStatus.ACTIVE
      }
    }) / 15
  ) || 1;
  const result = await prisma.providerProfiles.findMany({
    take: 15,
    skip: (page - 1) * 15,
    where: {
      isActive: ProviderStatus.ACTIVE
    }
  });
  return { result, totalPages };
};
var createProviderProfiles = async (profileData, userId) => {
  const result = await prisma.providerProfiles.create({
    data: {
      ...profileData,
      userId
    }
  });
  return result;
};
var updateProviderProfiles = async (id, data, userId) => {
  const providerProfile = await prisma.providerProfiles.findUnique({
    where: {
      id
    },
    select: {
      id: true
    }
  });
  const result = await prisma.providerProfiles.update({
    where: {
      id: providerProfile?.id
    },
    data
  });
  return result;
};
var getProviderProfilesRequest = async (page) => {
  const totalPages = Math.ceil(
    await prisma.providerProfiles.count({
      where: {
        isActive: ProviderStatus.PENDING
      }
    }) / 15
  ) || 1;
  const result = await prisma.providerProfiles.findMany({
    take: 15,
    skip: (page - 1) * 15,
    where: {
      isActive: ProviderStatus.PENDING
    }
  });
  return { result, totalPages };
};
var updateProviderProfilesRequest = async (id, data) => {
  const userID = await prisma.providerProfiles.findUnique({
    where: {
      id
    },
    select: {
      userId: true
    }
  });
  if (data.isActive === ProviderStatus.ACTIVE) {
    await prisma.user.update({
      where: {
        id: userID?.userId
      },
      data: {
        role: Role.PROVIDER
      }
    });
  }
  const result = await prisma.providerProfiles.update({
    where: {
      id
    },
    data
  });
  return result;
};
var providerProfilesServices = {
  createProviderProfiles,
  getAllProviderProfiles,
  updateProviderProfiles,
  updateProviderProfilesRequest,
  getProviderProfilesRequest
};

// src/modules/ProviderProfiles/ProviderProfiles.controller.ts
var getAllProviderProfiles2 = async (req, res) => {
  const { page } = req.query;
  const result = await providerProfilesServices.getAllProviderProfiles(Number(page) || 1);
  try {
    res.status(201).json({
      success: true,
      message: "Provider profiles retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var getProviderProfilesRequest2 = async (req, res) => {
  const { page } = req.query;
  const result = await providerProfilesServices.getProviderProfilesRequest(Number(page) || 1);
  try {
    res.status(201).json({
      success: true,
      message: "Provider profiles request retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var createProviderProfiles2 = async (req, res) => {
  const providerProfile = req.body;
  const result = await providerProfilesServices.createProviderProfiles(providerProfile, req?.user?.id);
  try {
    res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var updateProviderProfiles2 = async (req, res) => {
  const { id } = req.params;
  const providerProfile = req.body;
  const result = await providerProfilesServices.updateProviderProfiles(id, providerProfile, req?.user?.id);
  try {
    res.status(201).json({
      success: true,
      message: "Provider profile updated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var updateProviderProfilesRequest2 = async (req, res) => {
  const { id } = req.params;
  const providerProfile = req.body;
  const result = await providerProfilesServices.updateProviderProfilesRequest(id, providerProfile);
  try {
    res.status(201).json({
      success: true,
      message: "Provider profile request updated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var ProviderProfilesController = {
  createProviderProfiles: createProviderProfiles2,
  getAllProviderProfiles: getAllProviderProfiles2,
  updateProviderProfilesRequest: updateProviderProfilesRequest2,
  updateProviderProfiles: updateProviderProfiles2,
  getProviderProfilesRequest: getProviderProfilesRequest2
};

// src/middlewares/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required. Please verfiy your email!"
        });
      }
      if (roles.length && !roles.includes(session.user.role)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (req.user.role === "PROVIDER" /* PROVIDER */) {
        const provider = await prisma.providerProfiles.findUnique({
          where: {
            userId: req.user.id
          }
        });
        req.user.providerId = provider?.id;
      }
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized!",
        error: err.message
      });
    }
  };
};
var auth_default = auth2;

// src/modules/ProviderProfiles/ProviderProfiles.routes.ts
var router = Router();
router.post(
  "/",
  auth_default("CUSTOMER" /* CUSTOMER */),
  ProviderProfilesController.createProviderProfiles
);
router.get("/requests", auth_default("ADMIN" /* ADMIN */), ProviderProfilesController.getProviderProfilesRequest);
router.patch(
  "/:id",
  auth_default("PROVIDER" /* PROVIDER */),
  ProviderProfilesController.updateProviderProfiles
);
router.patch(
  "/requests/:id",
  auth_default("ADMIN" /* ADMIN */),
  ProviderProfilesController.updateProviderProfilesRequest
);
router.get(
  "/",
  auth_default("ADMIN" /* ADMIN */),
  ProviderProfilesController.getAllProviderProfiles
);
var ProviderProfilesRoutes = router;

// src/modules/Users/Users.routes.ts
import { Router as Router2 } from "express";

// src/modules/Users/Users.services.ts
var getAllUsers = async (page) => {
  const users = await prisma.user.findMany({
    take: 15,
    skip: (page - 1) * 15,
    select: {
      id: true,
      email: true,
      role: true
    }
  });
  const totalUsers = await prisma.user.count();
  const totalPages = Math.ceil(totalUsers / 15);
  return {
    users,
    totalPages
  };
};
var updateUserRole = async (id, role) => {
  const result = await prisma.user.update({
    where: {
      id
    },
    data: {
      role
    }
  });
  return result;
};
var verifyEmail = async (token) => {
  const result = await auth.api.verifyEmail({
    query: {
      token
    }
  });
  return result;
};
var userServices = {
  getAllUsers,
  updateUserRole,
  verifyEmail
};

// src/modules/Users/Users.controller.ts
var getAllUsers2 = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const result = await userServices.getAllUsers(page);
  try {
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
var updateUserRole2 = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await userServices.updateUserRole(id, role);
  try {
    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
var verifyEmail2 = async (req, res) => {
  const { token } = req.body;
  const result = await userServices.verifyEmail(token);
  try {
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
var userControllers = {
  getAllUsers: getAllUsers2,
  updateUserRole: updateUserRole2,
  verifyEmail: verifyEmail2
};

// src/modules/Users/Users.routes.ts
var router2 = Router2();
router2.post("/verify-email", userControllers.verifyEmail);
router2.get("/", auth_default("ADMIN" /* ADMIN */), userControllers.getAllUsers);
router2.patch("/:id/role", auth_default("ADMIN" /* ADMIN */), userControllers.updateUserRole);
var UsersRoutes = router2;

// src/modules/Meals/Meals.routes.ts
import { Router as Router3 } from "express";

// src/modules/Meals/Meals.services.ts
var createMeals = async (meal) => {
  const result = await prisma.meals.create({
    data: meal
  });
  return result;
};
var updateMeals = async (id, updatedData) => {
  const result = await prisma.meals.update({
    where: {
      id
    },
    data: updatedData
  });
  return result;
};
var deleteMeals = async (id) => {
  const result = await prisma.meals.delete({
    where: {
      id
    }
  });
  return result;
};
var getAllMeals = async () => {
  const result = await prisma.meals.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
      image: true,
      description: true
    }
  });
  return result;
};
var getAllCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};
var createCategories = async (category) => {
  const result = await prisma.category.create({
    data: { ...category }
  });
  return result;
};
var updateCategories = async (id, updatedData) => {
  const result = await prisma.category.update({
    where: {
      id
    },
    data: updatedData
  });
  return result;
};
var MealsServices = {
  createMeals,
  createCategories,
  updateMeals,
  updateCategories,
  deleteMeals,
  getAllMeals,
  getAllCategories
};

// src/modules/Meals/Meals.controller.ts
var createMeals2 = async (req, res) => {
  const meal = req.body;
  try {
    const result = await MealsServices.createMeals(meal);
    res.status(201).json({
      success: true,
      message: "Meals created successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var updateMeals2 = async (req, res) => {
  const { id } = req.params;
  const meal = req.body;
  try {
    const result = await MealsServices.updateMeals(id, meal);
    res.status(201).json({
      success: true,
      message: "Meals updated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var deleteMeals2 = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await MealsServices.deleteMeals(id);
    res.status(201).json({
      success: true,
      message: "Meals deleted successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var getAllMeals2 = async (req, res) => {
  try {
    const result = await MealsServices.getAllMeals();
    res.status(201).json({
      success: true,
      message: "Meals fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var getAllCategories2 = async (req, res) => {
  try {
    const result = await MealsServices.getAllCategories();
    res.status(201).json({
      success: true,
      message: "Categories fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var createCategories2 = async (req, res) => {
  const category = req.body;
  try {
    const result = await MealsServices.createCategories(category);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var updateCategories2 = async (req, res) => {
  const { id } = req.params;
  const category = req.body;
  try {
    const result = await MealsServices.updateCategories(id, category);
    res.status(201).json({
      success: true,
      message: "Category updated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};
var MealsController = {
  createMeals: createMeals2,
  createCategories: createCategories2,
  getAllCategories: getAllCategories2,
  updateMeals: updateMeals2,
  deleteMeals: deleteMeals2,
  updateCategories: updateCategories2,
  getAllMeals: getAllMeals2
};

// src/modules/Meals/Meals.routes.ts
var router3 = Router3();
router3.get("/", MealsController.getAllMeals);
router3.post("/", MealsController.createMeals);
router3.patch("/:id", MealsController.updateMeals);
router3.delete("/:id", MealsController.deleteMeals);
router3.get("/categories", auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), MealsController.getAllCategories);
router3.post("/categories", auth_default("ADMIN" /* ADMIN */), MealsController.createCategories);
router3.patch("/categories/:id", auth_default("ADMIN" /* ADMIN */), MealsController.updateCategories);
var MealsRoutes = router3;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true
  })
);
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/provider", ProviderProfilesRoutes);
app.use("/users", UsersRoutes);
app.use("/meals", MealsRoutes);
app.get("/", (req, res) => {
  res.send("We are cooking foods.");
});
var app_default = app;

// src/server.ts
var port = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    app_default.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
