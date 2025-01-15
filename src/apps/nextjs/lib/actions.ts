'use server';

import {z} from 'zod';
import {forgotPasswordUser, registerUser, resetPasswordUser} from "@/app/api/utils/api";
import {
    forgotPasswordFormSchema,
    authFormSchema,
    ForgotPasswordActionState,
    RegisterActionState, ResetPasswordActionState, resetPasswordFormSchema
} from "@/lib/actions-utils";
import {BackendValidationError} from "@/lib/utils";

export const register = async (
    _: RegisterActionState,
    formData: FormData,
): Promise<RegisterActionState> => {
    try {
        const validatedData = authFormSchema.safeParse({
            email: formData.get("email") ?? undefined,
            firstName: formData.get('firstName') ?? undefined,
            lastName: formData.get('lastName') ?? undefined,
            username: formData.get('username') ?? undefined,
            phoneNumber: formData.get('phoneNumber') ?? undefined,
            password: formData.get("password") ?? undefined,
            confirmPassword: formData.get('confirmPassword') ?? undefined,
        });

        if (!validatedData.success) {
            console.error("Validation Errors:", validatedData.error?.errors);
            return {status: "invalid_data", errors: validatedData.error?.errors};
        }
        const payload = {...validatedData.data};
        delete payload.confirmPassword;

        try {
            const res = await registerUser(payload);

            //todo review this assumption of userId
            if (!res.userId) {
                const errorData = await res?.json();
                console.error('Backend responded with an error:', errorData);
                return {status: "user_exists", errors: [], backEndError: errorData?.details?.errors};
            }

            return {status: "success"};
        } catch (error) {
            if (error instanceof BackendValidationError) {
                throw error;
            }
            console.error("Network or unexpected error:", error);
            throw new BackendValidationError('Network or unexpected error occurred.', {});
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            const fieldErrors: Record<string, string> = {};
            error.errors.forEach((err) => {
                if (err.path.length > 0) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            return {status: "invalid_data"};
        }

        console.error("Registration Failed:", error);
        return {status: "failed"};
    }
};

export const forgotPassword = async (
    _: ForgotPasswordActionState,
    formData: FormData,
): Promise<ForgotPasswordActionState> => {
    try {
        const validatedData = forgotPasswordFormSchema.safeParse({
            email: formData.get("email") ?? undefined,
        });

        if (!validatedData.success) {
            console.error("Validation Errors:", validatedData.error.errors);
            return {status: "invalid_data", errors: validatedData.error.errors};
        }
        const payload = {...validatedData.data};

        try {
            const res = await forgotPasswordUser(payload);

            if (!(res.status === 200)) {
                const errorData = await res?.json();
                console.error('Backend responded with an error:', errorData);
                return {status: "failed", errors: [], backEndError: errorData.details.detail};
            }
            return {status: "success"};
        } catch (error) {
            if (error instanceof BackendValidationError) {
                throw error;
            }
            console.error("Network or unexpected error:", error);
            throw new BackendValidationError('Network or unexpected error occurred.', {});
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            const fieldErrors: Record<string, string> = {};
            error.errors.forEach((err) => {
                if (err.path.length > 0) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            return {status: "invalid_data"};
        }

        console.error("Registration Failed:", error);
        return {status: "failed"};
    }
}

export const resetPassword = async (
    _: ResetPasswordActionState,
    formData: FormData,
): Promise<ResetPasswordActionState> => {

    try {
        const validatedData = resetPasswordFormSchema.safeParse({
            password: formData.get("password") ?? undefined,
            confirmPassword: formData.get('confirmPassword') ?? undefined,
        });

        if (!validatedData.success) {
            console.error("Validation Errors:", validatedData.error?.errors);
            return {status: "invalid_data", errors: validatedData.error?.errors};
        }
        const payload = {
            ...validatedData.data,
            token: formData.get('token') as string,
            email: formData.get('email') as string,
        };
        delete payload.confirmPassword;

        try {
            const res = await resetPasswordUser(payload);

            if (!(res.status === 200)) {
                const errorData = await res?.json();
                console.error('Backend responded with an error:', errorData);
                return {status: "failed", errors: [], backEndError: errorData.details.detail};
            }

            return {status: "success"};
        } catch (error) {
            if (error instanceof BackendValidationError) {
                throw error;
            }
            console.error("Network or unexpected error:", error);
            throw new BackendValidationError('Network or unexpected error occurred.', {});
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            const fieldErrors: Record<string, string> = {};
            error.errors.forEach((err) => {
                if (err.path.length > 0) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            return {status: "invalid_data"};
        }

        console.error("Registration Failed:", error);
        return {status: "failed"};
    }
};