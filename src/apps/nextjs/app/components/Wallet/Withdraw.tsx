import {WithdrawForm} from "@/app/components/Wallet/WithdrawForm";
import {SubmitButton} from "@/app/components/Authentication/SubmitButton/Page";
import React, {useActionState, useEffect, useState} from "react";
import {WithdrawActionState} from "@/lib/actions-utils";
import {withdraw} from "@/lib/actions";
import {useBalance} from "@/app/context/BalanceContext";
import {z} from "zod";
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";

export const Withdraw = () => {
    const [isSuccessful, setIsSuccessful] = useState(false);
    const {balance, getBalance} = useBalance();
    const [amountErrors, setAmountErrors] = useState<z.ZodIssue[]>([]);
    const [formValues, setFormValues] = useState({
        amount: null,
        address: '',
    });
    const {data: session, status: sessionStatus} = useSession();
    const [state, formAction] = useActionState<WithdrawActionState, FormData>(
        async (formData, state) => {
            if (session) {
                return withdraw(formData, state, session.tokens?.token);
            } else {
                throw new Error("No session available");
            }
        },
        {
            status: 'idle',
        }
    );
    const handleSubmit = (formData: FormData): void => {
        const amountEntry = formData.get("amount");
        let amount = 0;

        if (typeof amountEntry === "string") {
            amount = Number(amountEntry) || 0;
        }

        if (amount > balance) {
            setAmountErrors([
                {
                    code: "custom",
                    message: "You cannot withdraw more than your balance",
                    path: ["amount"],
                },
            ]);
            return;
        } else {
            setAmountErrors([])
        }

        setFormValues({
            amount,
            address: (formData.get("address") as string) || "",
        });

        formAction(formData);
    };
    useEffect(() => {
        if (state.status === 'success') {
            toast.success('Your request has been submitted');
            getBalance().then((r) => r);
        } else if (state.status === 'failed') {
            toast.error("An error has occurred, please try again later");
        }
    }, [state]);
    return (
        <WithdrawForm action={handleSubmit}
                      formValues={formValues}
                      errors={state.errors}
                      amountErrors={amountErrors}
                      backendError={state.backEndError}
        >
            <SubmitButton isSuccessful={isSuccessful}>Withdraw</SubmitButton>
        </WithdrawForm>
    )
}