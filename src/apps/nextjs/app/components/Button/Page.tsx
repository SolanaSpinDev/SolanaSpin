import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export function Button({ children, className, ...rest }: Readonly<ButtonProps>) {
    return (
        <button
            {...rest}
            className={clsx(
                'flex h-5 lg:h-10 items-center justify-center rounded-md bg-blue-800 px-4 text-xs lg:text-sm font-medium text-white transition-colors hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                className,
            )}
        >
            {children}
        </button>
    );
}
