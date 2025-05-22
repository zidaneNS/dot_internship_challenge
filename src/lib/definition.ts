import { z } from "zod";

export const LoginFormSchema = z.object({
    user: z.string().min(1, "required")
});