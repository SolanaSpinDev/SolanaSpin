import {WithdrawForm} from "@/app/components/Wallet/WithdrawForm";
import {SubmitButton} from "@/app/components/Authentication/SubmitButton/Page";
import React, {useActionState, useState} from "react";
import {RegisterActionState, WithdrawActionState} from "@/lib/actions-utils";
import {withdraw} from "@/lib/actions";
import {useBalance} from "@/app/context/BalanceContext";
import {setState} from "jest-circus";
import {z} from "zod";

export const Withdraw = () => {
    const [isSuccessful, setIsSuccessful] = useState(false);
    const {balance} = useBalance();
    const [amountErrors, setAmountErrors] = useState<z.ZodIssue[]>([]);
    const [formValues, setFormValues] = useState({
        amount: null,
        address: '',
    });

    const [state, formAction] = useActionState<WithdrawActionState, FormData>(
        withdraw,
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
            // 3. update local errors
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