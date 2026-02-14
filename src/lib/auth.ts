import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";
const isProd = process.env.NODE_ENV === "production";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(
    prisma,

    {
      provider: "postgresql",
    },
  ),
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.APP_URL!],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
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
                  If the button doesn’t work, copy and paste this link into your
                  browser:
                </p>

           

                <p>
                  This link will expire for security reasons.
                </p>

                <p>
                  — The Team
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="email-footer">
                © 2026 Your App. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
        });
      } catch (err: any) {}
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  advanced: {
    useSecureCookies: isProd,
    defaultCookieAttributes: {
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    },

    crossSubDomainCookies: {
      enabled: isProd,
    },
  },
});
