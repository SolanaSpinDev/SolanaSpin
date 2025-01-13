import {z} from "zod";

export interface RegisterActionState {
    status:
        | "idle"
        | "in_progress"
        | "success"
        | "failed"
        | "user_exists"
        | "invalid_data";
    errors?: z.ZodIssue[];
    backEndError?: string[];
}

export interface ForgotPasswordActionState {
    status:
        | "idle"
        | "in_progress"
        | "success"
        | "failed"
        | "email_exists"
        | "invalid_data";
    errors?: z.ZodIssue[];
    backEndError?: string[];
}

export const authFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string().min(3).max(20).regex(/^[A-Za-z]+$/, "username should contain only letters"),
    phoneNumber: z.string(),
    email: z.string().email(),
    password: z.string()
        .min(6, "Password must be at least 6 characters.")
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            "Password must contain at least one letter and one number."
        ),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters."),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
});

export const forgotPasswordFormSchema = z.object({email: z.string().email()})