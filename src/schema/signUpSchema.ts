import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username cannot be less than 2 characters")
  .max(20, "Username cannot be greater than 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username cannot contain any special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password cannot be less than 6 characters" }),
});
