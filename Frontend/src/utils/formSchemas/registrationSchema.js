import { z } from "zod";

export const registrationSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Username is required at least 4 characters long!" }),
    firstname: z
        .string()
        .min(2, { message: "First name is required!" }),
    lastname: z
        .string()
        .min(2, { message: "Last name is required!" }),
    email: z
        .string()
        .email({ message: "Invalid email address!" })
        .max(100, "Email can't be more than 100 characters"),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(50, { message: "Password must not exceed 50 characters" })
        .refine(value => /[a-zA-Z]/.test(value), {
            message: "Password must contain at least one letter\n",
        })
        .refine(value => /\d/.test(value), {
            message: "Password must contain at least one digit\n",
        })
        .refine(value => !/\s/.test(value), {
            message: "Password must not contain whitespace\n",
        })
        .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
            message: "Password must contain at least one special character",
        }),
    accountType: z
        .string()
        .refine(value => ["Property Owner", "Traveler"].includes(value), {
            message: "Invalid account type",
        }),
});