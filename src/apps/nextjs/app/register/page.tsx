'use client';
import {useEffect, useState, useActionState} from 'react';
import Head from "next/head";
import {signIn} from "next-auth/react";
import {useRouter} from 'next/navigation';
import {Panel} from "@/app/components/Authentication/Panel/Page";
import {AuthenticationLayout} from "@/app/components/Authentication/AuthenticationLayout/Page";
import {AuthForm} from '@/app/components/Authentication/AuthForm/Page';
import {SubmitButton} from "@/app/components/Authentication/SubmitButton/Page";
import {register, RegisterActionState} from '@/lib/actions';

export default function Page() {
    const router = useRouter();
    const [isSuccessful, setIsSuccessful] = useState(false);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState(''); // Add password state
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [state, formAction] = useActionState<RegisterActionState, FormData>(
        register,
        {
            status: 'idle',
        }
    );

    useEffect(() => {
            //todo update the toast message here
            console.log(state)
            if (state.status === 'user_exists') {
                // toast.error(state.backEndError);
            } else if (state.status === 'failed') {
                // toast.error('Failed to create account');
            } else if (state.status === 'invalid_data') {
                // toast.error('Registration failed', ToasterConfig )
                // toast.error('Failed validating your submission!');
            } else if (state.status === 'success') {
                // toast.success('Account created successfully');
                signIn('credentials', {
                    redirect: false,
                    email: formValues.email,
                    password: formValues.password,
                }).then((signInResult) => {
                    if (signInResult?.error) {
                        console.error("Sign-in Error:", signInResult.error);
                        // todo set an error state to display to the user
                    } else {
                        router.push('/');
                    }
                });
                setIsSuccessful(true);
                router.refresh();
            }
        }
        ,
        [state, router]
    )
    ;

    const handleSubmit = (formData: FormData) => {
        setFormValues({
            firstName: formData.get('firstName') as string || '',
            lastName: formData.get('lastName') as string || '',
            username: formData.get('username') as string || '',
            phoneNumber: formData.get('phoneNumber') as string || '',
            email: formData.get('email') as string || '',
            password: formData.get('password') as string || '',
            confirmPassword: formData.get('confirmPassword') as string || '',
        });
        formAction(formData);
    };

    return (
        <AuthenticationLayout>
            <Head>
                <title>Register | Solanaspin</title>
            </Head>
            <Panel>
                <AuthForm action={handleSubmit} formValues={formValues} errors={state.errors}
                          backendError={state.backEndError}>
                    <SubmitButton isSuccessful={isSuccessful}>Sign Up</SubmitButton>
                </AuthForm>
            </Panel>
        </AuthenticationLayout>
    );
}