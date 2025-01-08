'use client';

import { AuthForm } from '@/app/components/AuthForm/Page';
// import { SubmitButton } from '@/app/ui/custom/submit-button';
import {useEffect, useState} from 'react';
// import {useActionState} from 'react';

export default function Page(){
    const [email, setEmail] = useState('');
    const handleSubmit = (formData: FormData) => {
        setEmail(formData.get('email') as string);
        // formAction(formData);
    };

    return (
        <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
            <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
                lorem register
                <AuthForm action={handleSubmit} defaultEmail={email}>
                {/*    <SubmitButton isSuccessful={isSuccessful}>Sign Up</SubmitButton>*/}
                </AuthForm>
            </div>
        </div>
    );
}