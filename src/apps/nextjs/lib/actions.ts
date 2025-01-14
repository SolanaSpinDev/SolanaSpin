'use server';

import {z} from 'zod';

import {forgotPasswordUser, registerUser} from "@/app/api/utils/api";
import {
    forgotPasswordFormSchema,
    authFormSchema,
    ForgotPasswordActionState,
    RegisterActionState
} from "@/lib/actions-utils"; // Import useRouter for redirection
import {BackendValidationError} from "@/lib/utils"; // Import useRouter for redirection

export const register = async (
    _: RegisterActionState,
    formData: FormData,
): Promise<RegisterActionState> => {
    console.log('formData')
    console.log(formData)
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
    console.log('formData')
    console.log(formData)
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

            //todo review this assumption of status
            // if (!res.status === 200) {
            //     const errorData = await res?.json();
            //     console.error('Backend responded with an error:', errorData);
            //     return {status: "email_exists", errors: [], backEndError: errorData.details.errors};
            // }

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