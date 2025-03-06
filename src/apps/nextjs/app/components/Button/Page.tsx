import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export function Button({ children, className, ...rest }: Readonly<ButtonProps>) {
    return (
        <button
            {...rest}
            className={clsx(
                'flex h-5 lg:h-10 items-center justify-center rounded-md bg-slate-50 px-4 text-xs lg:text-sm font-bold text-black transition-colors hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 active:bg-gray-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                className,
            )}
        >
            {children}
        </button>
    );
}
