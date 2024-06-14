import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(email: string, username: string, verificationCode: string): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Mystery Message | Verification Code',
      react: VerificationEmail({ username, otp: verificationCode }),
    });
    return {success: true, message: "Verification email sent successfully"};
  } catch (error) {
    console.error("Error while sending verification email", error);
    return {success: false, message: "Failed to send verification email"};
  }
}