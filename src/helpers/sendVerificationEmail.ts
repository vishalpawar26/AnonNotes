import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verificationCode: string
): Promise<ApiResponse> {
  const htmlCode: string = `
  <!DOCTYPE html>
  <html>
  <head>
  <title>Verification Code</title>
  </head>
  <body>

  <h2>Hello ${username},</h2>
  <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
  <h3>${verificationCode}</h3>
  <p>If you did not request this code, please ignore this email.</p>

  </body>
  </html>
  `;

  try {
    await transporter.sendMail({
      from: `"AnonNotes" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "AnonNotes | Verification Code",
      html: htmlCode,
    });
    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Error while sending verification email", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
