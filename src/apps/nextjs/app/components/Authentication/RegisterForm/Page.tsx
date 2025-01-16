import Link from 'next/link';
import {Input} from "@nextui-org/input";
import {useEffect, useState} from "react";
import {IoEyeOffOutline, IoEyeOutline, IoInformationCircleOutline} from "react-icons/io5";
import {ZodIssue} from "zod";

interface AuthFormProps {
    action: (formData: FormData) => void;
    children: React.ReactNode;
    formValues: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    };
    errors: ZodIssue[];
    backendError?: string[]; // Make it optional
}

export function RegisterForm({
                             action,
                             children,
                             formValues,
                             errors,
                             backendError,
                         }: AuthFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {

        //todo inspect if we need these errors
    }, [errors, formValues]);

    return (
        <form action={action} className="space-y-3">
            <div className="flex-1 rounded-lg bg-[#1d3155] px-6 pb-4 pt-8 opacity-95">
                <h1 className="mb-3 text-2xl text-white">
                    Create an account.
                </h1>
                {backendError?.length > 0 &&
                    <div>{backendError.map(error => (
                        <div className="text-tiny text-danger" key={error}>*{error}</div>))}</div>}
                <div className="flex flex-col gap-4">
                    {/*email*/}
                    <div className="flex flex-col gap-2">
                        <div className="relative">
                            <Input
                                id="email"
                                name="email"
                                isRequired
                                className="max-w-xs text-white"
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
                    {/*firstName*/}
                    <div className="flex flex-col gap-2">
                        <div className="relative">
                            <Input
                                id="firstName"
                                name="firstName"
                                className="max-w-xs text-white"
                                label="First Name"
                                type="text"
                                placeholder="First Name"
                                autoFocus
                                defaultValue={formValues.firstName}
                                variant="underlined"
                                color="primary"

                            />
                        </div>
                    </div>
                    {/*lastName*/}
                    <div className="flex flex-col gap-2">
                        <div className="relative">
                            <Input
                                id="lastName"
                                name="lastName"
                                className="max-w-xs text-white"
                                label="Last Name"
                                type="text"
                                placeholder="Last Name"
                                autoFocus
                                defaultValue={formValues.lastName}
                                variant="underlined"
                                color="primary"

                            />
                        </div>
                    </div>
                    {/*username*/}
                    <div className="flex flex-col gap-2">
                        <div className="relative">
                            <Input
                                id="username"
                                name="username"
                                isRequired
                                className="max-w-xs text-white"
                                label="Username"
                                type="text"
                                placeholder="Last Name"
                                variant="underlined"
                                required
                                autoFocus
                                color="primary"
                                defaultValue={formValues.username}
                                // @ts-expect-error mismatched type
                                minLength="2"
                                // @ts-expect-error mismatched type
                                maxLength="30"
                            />
                        </div>
                    </div>
                    {/*password*/}
                    <div className="mt-4">
                        <div className="relative">
                            <IoInformationCircleOutline className="absolute -left-4 top-2"
                                                        title="We strongly suggest you should use a strong password"/>
                            <Input
                                id="password"
                                name="password"
                                className="max-w-xs  text-white"
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
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-white"
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
                                className="max-w-xs text-white"
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
