import Link from 'next/link';
import {Input} from "@nextui-org/input";
import {useEffect, useState} from "react";
import {IoEyeOffOutline, IoEyeOutline, IoInformationCircleOutline} from "react-icons/io5";
import {ZodIssue} from "zod";

interface ResetPasswordFormProps {
    action: (formData: FormData) => void;
    children: React.ReactNode;
    formValues: {
        password: string;
        confirmPassword: string;
    };
    errors: ZodIssue[];
    backendError?: string[]; // Make it optional
}

export function ResetPasswordForm({
                             action,
                             children,
                             formValues,
                             errors,
                             backendError,
                         }: ResetPasswordFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <form action={action} className="space-y-3">
            <div className="flex-1 rounded-lg bg-[#1d3155] px-6 pb-4 pt-8 opacity-95">
                <h1 className="mb-3 text-2xl">
                   Create new password
                </h1>
                {backendError && <div className="text-tiny text-danger">* {backendError}</div>}
                <div className="flex flex-col gap-4">
                    {/*password*/}
                    <div className="mt-4">
                        <div className="relative">
                            <IoInformationCircleOutline className="absolute -left-4 top-2"
                                                        title="We strongly suggest you should use a strong password"/>
                            <Input
                                id="password"
                                name="password"
                                className="max-w-xs"
                                isRequired
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                defaultValue={formValues.password}
                                required
                                autoFocus
                                variant="underlined"
                                color="primary"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <IoEyeOffOutline className="h-5 w-5 text-gray-500"/>
                                ) : (
                                    <IoEyeOutline className="h-5 w-5 text-gray-500"/>
                                )}
                            </button>
                        </div>
                    </div>
                    {/*confirm password*/}
                    <div className="mt-4">
                        <div className="relative">
                            <IoInformationCircleOutline className="absolute -left-4 top-2"
                                                        title="Passwords must match"/>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                className="max-w-xs "
                                isRequired
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                required
                                autoFocus
                                variant="underlined"
                                color="primary"
                                defaultValue={formValues.confirmPassword}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? (
                                    <IoEyeOffOutline className="h-5 w-5 text-gray-500"/>
                                ) : (
                                    <IoEyeOutline className="h-5 w-5 text-gray-500"/>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </form>
    );
}
