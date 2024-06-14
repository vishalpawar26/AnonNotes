import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Message cannot be less than of 10 characters" })
    .max(300, { message: "Message cannot be greter then of 300 characters" }),
});
