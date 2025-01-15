import Link from 'next/link';
import {Input} from "@nextui-org/input";
import {useEffect, useState} from "react";
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";
import {ZodIssue} from "zod";

interface LoginFormProps {
    action: (formData: FormData) => void;
    children: React.ReactNode;
    formValues: {
        email: string;
        password: string;
    };
    errors: ZodIssue[];
    backendError?: string[]; // Make it optional
}

export function LoginForm({
                              action,
                              children,
                              formValues,
                              errors,
                              backendError,
                          }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        //todo inspect if we need these errors
    }, [errors, formValues]);

    return (
        <form action={action} className="space-y-3">
            <div className="flex-1 rounded-lg bg-[#1d3155] px-6 pb-4 pt-8 opacity-95">
                <h1 className="mb-3 text-2xl">
                    Login to your account
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
                    {/*password*/}
                    <div className="mt-4">
                        <div className="relative">
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
                </div>
                {children}
                <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
                    {'Forgot your credentials? '}
                    <Link
                        href="/register-user"
                        className="font-semibold text-indigo-400 hover:underline dark:black"
                    >
                        Register
                    </Link>
                    {' instead.'}
                </p>
            </div>
        </form>
    );
}
