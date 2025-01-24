'use client';

import {useEffect, useState, useActionState} from 'react';
import Head from "next/head";
import {useRouter} from 'next/navigation';
import {Panel} from "@/app/components/Authentication/Panel/Page";
import {AuthenticationLayout} from "@/app/components/Authentication/AuthenticationLayout/Page";
import {SubmitButton} from "@/app/components/Authentication/SubmitButton/Page";
import {resetPassword} from '@/lib/actions';
import {ResetPasswordActionState} from '@/lib/actions-utils';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ResetPasswordForm} from "@/app/components/Authentication/ResetPasswordForm/Page";
import {useSearchParams} from "next/navigation";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [formValues, setFormValues] = useState({
        password: '',
        confirmPassword: '',
    });
    const [state, formAction] = useActionState<ResetPasswordActionState, FormData>(
        resetPassword,
        {
            status: 'idle',
        }
    );

    useEffect(() => {
            if (state.status === 'failed') {
                toast.error('Failed to reset password, please try again later');
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
                console.log('s a facut reset de pass cu success')
                console.log('here i need to redirect the user to login page')
                toast.success('Reset password successfully', {
                    onClose: () => {
                        //todo update the route with new login path
                        router.push('/api/auth/signin')
                    },
                    autoClose: 1000,
                });
                setIsSuccessful(true);
                router.refresh();
            }
        }, [state, router, formValues.password]
    );

    const handleSubmit = (formData: FormData): void => {
        const password = formData.get('password') as string || '';
        const confirmPassword = formData.get('confirmPassword') as string || '';
        setFormValues({password, confirmPassword});

        if (token) {
            formData.append('token', token);
        }
        if (email) {
            formData.append('email', email);
        }

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
                <title>Reset Password | Solanaspin</title>
            </Head>
            <Panel>
                <ResetPasswordForm
                    action={handleSubmit}
                    formValues={formValues}
                    errors={state.errors}
                    backendError={state.backEndError}
                >
                    <SubmitButton isSuccessful={isSuccessful}>Submit password</SubmitButton>
                </ResetPasswordForm>
            </Panel>
        </AuthenticationLayout>
    );
}