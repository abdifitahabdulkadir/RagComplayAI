"use server";

import ForgetPasswordTemplate from "@/emails/ForgetPassword";
import { Resend } from "resend";
import { prisma } from "../prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationOTPEmail({
  to,
  otp,
}: {
  to: string;
  otp: string;
}) {
  try {
    const result = await resend.emails.send({
      from: "updates@abdifitahabdulkadir.dev",
      to: [to],
      subject: "Your verification code",
      react: ForgetPasswordTemplate({ OTP: otp }),
    });
    if (!result.error) return { success: true };
  } catch (error) {
    console.log(error);
  }
}

export async function isUserExisted(email: string) {
  try {
    const checkEmailExisted = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!checkEmailExisted) return { success: false };

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
