'use client';
import {useEffect, useState, useActionState} from 'react';
import Head from "next/head";
import {useRouter} from 'next/navigation';
import {Panel} from "@/app/components/Authentication/Panel/Page";
import {AuthenticationLayout} from "@/app/components/Authentication/AuthenticationLayout/Page";
import {SubmitButton} from "@/app/components/Authentication/SubmitButton/Page";
import {forgotPassword} from '@/lib/actions';
import {ForgotPasswordActionState} from '@/lib/actions-utils';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ForgotPasswordForm} from "@/app/components/Authentication/ForgotPasswordForm/Page";

export default function Page() {
    const router = useRouter();
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [formValues, setFormValues] = useState({
        email: '',
    });
    const [state, formAction] = useActionState<ForgotPasswordActionState, FormData>(
        forgotPassword,
        {
            status: 'idle',
        }
    );

    useEffect(() => {
            if (state.status === 'failed') {
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
                console.log('here i need to redirect the user to login page')
                toast.success('Email sent', {
                    onClose: () => {
                        //todo update the route with new login path
                        router.push('/api/auth/signin')
                    },
                    autoClose: 1000,
                });
                setIsSuccessful(true);
                router.refresh();
            }
        }
        ,
        [state, router, formValues.email]
    )
    ;

    const handleSubmit = (formData: FormData): void => {
        setFormValues({
            email: formData.get('email') as string || '',
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
                <ForgotPasswordForm
                    action={handleSubmit}
                    formValues={formValues}
                    errors={state.errors}
                    backendError={state.backEndError}
                >
                    <SubmitButton isSuccessful={isSuccessful}>Sign Up</SubmitButton>
                </ForgotPasswordForm>
            </Panel>
        </AuthenticationLayout>
    );
}