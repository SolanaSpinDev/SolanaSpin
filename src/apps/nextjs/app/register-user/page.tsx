'use client';
import {useEffect, useState, useActionState} from 'react';
import Head from "next/head";
import {signIn} from "next-auth/react";
import {useRouter} from 'next/navigation';
import {Panel} from "@/app/components/Authentication/Panel/Page";
import {AuthenticationLayout} from "@/app/components/Authentication/AuthenticationLayout/Page";
import {AuthForm} from '@/app/components/Authentication/AuthForm/Page';
import {SubmitButton} from "@/app/components/Authentication/SubmitButton/Page";
import {register} from '@/lib/actions';
import {RegisterActionState} from '@/lib/actions-utils';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
    const router = useRouter();
    const [isSuccessful, setIsSuccessful] = useState(false);
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
            if (state.status === 'user_exists') {
                let err = "An error has occurred";
                if (state?.backEndError) {
                    err = state.backEndError?.length > 1 ? state.backEndError?.join("\n") : state?.backEndError[0];
                }
                toast.error(err);
            } else if (state.status === 'failed') {
                toast.error('Failed to create account, please try again later');
            } else if (state.status === 'invalid_data') {
                let err: string = '';
                if (state.errors.length > 1) {
                    err = state.errors.map(error => error.message).join("\n");
                }
                if (state.errors.length === 1) {
                    err = state.errors[0].message
                }
                toast.error("Failed validating your submission!" + "\n" + err);
            } else if (state.status === 'success') {
                toast.success('Account created successfully');
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
        [state, router, formValues.email, formValues.password]
    )
    ;

    const handleSubmit = (formData: FormData): void => {
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
                <title>Register | Solanaspin</title>
            </Head>
            <Panel>
                <AuthForm action={handleSubmit}
                          formValues={formValues}
                          errors={state.errors}
                          backendError={state.backEndError}
                >
                    <SubmitButton isSuccessful={isSuccessful}>Sign Up</SubmitButton>
                </AuthForm>
            </Panel>
        </AuthenticationLayout>
    );
}