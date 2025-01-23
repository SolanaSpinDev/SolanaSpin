import {z} from "zod";
import {FormMessages} from "@/lib/texts-utils";

export interface WithdrawActionState {
    status:
        | "idle"
        | "in_progress"
        | "success"
        | "failed"
        | "invalid_data";
    errors?: z.ZodIssue[];
    backEndError?: string[];
}

export interface ResetPasswordActionState {
    status:
        | "idle"
        | "in_progress"
        | "success"
        | "failed"
        | "invalid_data";
    errors?: z.ZodIssue[];
    backEndError?: string[];
}

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
        | "invalid_data";
    errors?: z.ZodIssue[];
    backEndError?: string[];
}

export const registerFormSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(6, FormMessages.PasswordNotValidLength)
        .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
            message: FormMessages.PasswordNotValidMessage,
        }),
    confirmPassword: z.string().min(6, FormMessages.ConfirmPasswordNotValidLength),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: FormMessages.PasswordsNotMatch,
});

export const resetPasswordFormSchema = z.object({
    password: z.string()
        .min(6, FormMessages.ConfirmPasswordNotValidLength)
        .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
            message: FormMessages.PasswordNotValidMessage,
        }),
    confirmPassword: z.string().min(6, FormMessages.ConfirmPasswordNotValidLength),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: FormMessages.PasswordsNotMatch,
});

export const forgotPasswordFormSchema = z.object({email: z.string().email()})

//login
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(6, FormMessages.PasswordNotValidLength)
        .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
            message: FormMessages.PasswordNotValidMessage,
        }),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const withdrawFormSchema = z.object(
    {
        amount: z.number(),
        address: z.string(),
    })
