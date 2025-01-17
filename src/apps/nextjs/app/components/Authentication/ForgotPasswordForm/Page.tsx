import Link from 'next/link';
import {Input} from "@heroui/input";
import {useEffect} from "react";
import {ZodIssue} from "zod";

interface ForgotFormProps {
    action: (formData: FormData) => void;
    children: React.ReactNode;
    formValues: {
        email: string;
    };
    errors?: ZodIssue[];
    backendError?: string[]; // Make it optional
}

export function ForgotPasswordForm({
                                       action,
                                       children,
                                       formValues,
                                       backendError,
                                   }: ForgotFormProps) {
    return (
        <form action={action} className="space-y-3">
            <div className="flex-1 rounded-lg bg-[#1d3155] px-6 pb-4 pt-8 opacity-95">
                <h1 className="mb-3 text-2xl">
                    Forgot password
                </h1>
                {backendError && <div className="text-tiny text-danger">* {backendError}</div>}
                <div className="flex flex-col gap-4">
                    {/*email*/}
                    <div className="flex flex-col gap-2">
                        <div className="relative">
                            <Input
                                id="email"
                                name="email"
                                isRequired
                                className="max-w-xs"
                                label="Email"
                                type="email"
                                placeholder="user@acme.com"
                                autoComplete="email"
                                required
                                autoFocus
                                defaultValue={formValues.email}
                                variant="underlined"
                                color="primary"
                            />
                        </div>
                    </div>
                </div>
                {children}
                <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
                    {'Already have an account? '}
                    <Link
                        href="/login"
                        className="font-semibold text-indigo-400 hover:underline dark:black"
                    >
                        Sign in
                    </Link>
                    {' instead.'}
                </p>
            </div>
        </form>
    );
}
