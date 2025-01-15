'use client';

import { useFormStatus } from 'react-dom';

// import { LoaderIcon } from '@/components/custom/icons';

import { Button } from '@/app/components/Button/Page';

export function SubmitButton({
                                 children,
                                 isSuccessful,
                             }: Readonly<{
    children: React.ReactNode;
    isSuccessful: boolean;
}>) {
    const { pending } = useFormStatus();

    return (
        //todo this has been altered compared to the ai-chatbot example - aria-disabled={isPending}
        <Button
            className="mt-4 w-full relative"
        >
            {children}

            {(pending || isSuccessful) && (
                <span className="animate-spin absolute right-4">
         Loading...
        </span>
            )}

            <span aria-live="polite" className="sr-only" role="output">
        {pending || isSuccessful ? 'Loading' : 'Submit form'}
      </span>
        </Button>
    );
}
