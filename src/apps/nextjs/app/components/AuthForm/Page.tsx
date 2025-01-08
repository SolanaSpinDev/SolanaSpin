import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function AuthForm({
                             action,
                             children,
                             defaultEmail = '',
                         }: Readonly<{
    action: never;
    children: React.ReactNode;
    defaultEmail?: string;
}>) {
    return (
        <form action={action} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`mb-3 text-2xl`}>
                    Create an account.
                </h1>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="email"
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    >
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            type="email"
                            placeholder="user@acme.com"
                            autoComplete="email"
                            required
                            autoFocus
                            defaultValue={defaultEmail}
                        />
                        <AtSymbolIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                </div>

                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            minLength={6}
                        />
                        <KeyIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                </div>

                {children}
                <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
                    {'Already have an account? '}
                    <Link
                        href="/login"
                        className="font-semibold text-gray-800 hover:underline dark:black"
                    >
                        Sign in
                    </Link>
                    {' instead.'}
                </p>
            </div>
        </form>
    );
}
