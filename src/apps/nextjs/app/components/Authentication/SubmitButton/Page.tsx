'use client';

import { useFormStatus } from 'react-dom';
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
                <div className="animate-spin h-6 w-6 border-4 border-t-transparent border-gray-400 rounded-full"></div>
            )}

            <span aria-live="polite" className="sr-only" role="output">
        {pending || isSuccessful ? 'Loading' : 'Submit form'}
      </span>
        </Button>
    );
}
