'use client';
import {useEffect, useState, useActionState} from 'react';
import Head from "next/head";
import {signIn} from "next-auth/react";
import {useRouter} from 'next/navigation';
import {Panel} from "@/app/components/Authentication/Panel/Page";
import {UserLayout} from "@/app/components/UserLayout/Page";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from 'react-hook-form';
import {useBalance} from '@/app/context/BalanceContext';
import {
    loginSchema,
    LoginFormInputs,
} from "@/lib/actions-utils";
import {zodResolver} from '@hookform/resolvers/zod';
import {Input} from "@heroui/input";
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {Button} from "@/app/components/Button/Page";

export default function Page() {
    const router = useRouter();
    const {getBalance} = useBalance();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });
    const [isLoading, setIsLoading] = useState(false);
    const {data: session, status} = useSession();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        if (isLoggingIn && status === 'authenticated') {
            getBalance().then(() => {
                router.push("/");
                setIsLoggingIn(false);
            });
        }
    }, [status, isLoggingIn, getBalance, router]);


    const onSubmit = async (data: LoginFormInputs) => {
        setIsLoggingIn(true);

        setIsLoading(true);
        const res = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        setIsLoading(false);

        if (res?.error) {
            setIsLoggingIn(false);
            toast.error(res.error);
        } else {
            toast.success('Logged in successfully!', {
                onClose: () => {
                    router.push('/');
                },
                autoClose: 400,
            });
        }
    };

    return (
        <UserLayout>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Head>
                <title>Login | Solanaspin</title>
            </Head>
            <Panel>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="flex-1 rounded-lg bg-secondary px-6 pb-4 pt-8 opacity-95">
                        <h1 className="mb-3 text-2xl text-white">
                            Login to your account
                        </h1>
                        <div className="flex flex-col gap-4">
                            {/*email*/}
                            <div className="flex flex-col gap-2">
                                <div className="relative">
                                    <Input
                                        id="email"
                                        name="email"
                                        isRequired
                                        className="max-w-xs text-white"
                                        classNames={{
                                            label: "!text-white", // ← force label color to white
                                        }}
                                        label="Email"
                                        type="email"
                                        placeholder="user@acme.com"
                                        autoComplete="email"
                                        required
                                        autoFocus
                                        defaultValue={formValues.email}
                                        variant="underlined"
                                        color="primary"
                                        {...register('email')}
                                    />
                                </div>
                            </div>
                            {/*password*/}
                            <div className="mt-4">
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        className="max-w-xs text-white"
                                        classNames={{
                                            label: "!text-white",
                                        }}
                                        isRequired
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        defaultValue={formValues.password}
                                        required
                                        autoFocus
                                        variant="underlined"
                                        color="primary"
                                        {...register('password')}
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
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={`aria-disabled:cursor-not-allowed aria-disabled:opacity-50 mt-4 w-full ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-slate-50 hover:bg-gray-300'
                            }`}
                        >
                            {isLoading ? <div
                                className="animate-spin h-6 w-6 border-4 border-t-transparent border-gray-400 rounded-full"></div> : 'Login'}
                        </Button>
                        <p className="text-center text-sm text-gray-400 mt-4 dark:text-zinc-400">
                            {'Don\'t have an account ? '}
                            <Link
                                href="/register-user"
                                className="font-semibold text-indigo-400 hover:underline dark:black"
                            >
                                Register
                            </Link>
                            {' instead.'}
                        </p>
                        <p className="text-center text-sm text-gray-400 mt-4 dark:text-zinc-400">
                            {'Forgot your credentials? '}
                            <Link
                                href="/forgot-password"
                                className="font-semibold text-indigo-400 hover:underline dark:black"
                            >
                                Forgot password
                            </Link>
                        </p>
                    </div>
                </form>
            </Panel>
        </UserLayout>
    );
}