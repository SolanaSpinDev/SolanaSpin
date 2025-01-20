import {z, ZodIssue} from "zod";
import {Input} from "@heroui/input";
import {useBalance} from "@/app/context/BalanceContext";

interface WithdrawFormProps {
    action: (formData: FormData) => void;
    children: React.ReactNode;
    formValues: {
        address: string;
        amount: number;
    };
    amountErrors: z.ZodIssue[];
    errors: ZodIssue[];
    backendError?: string[]; // Make it optional
}

export function WithdrawForm({
                                 action,
                                 children,
                                 formValues,
                                 errors,
                                 amountErrors,
                                 backendError,
                             }: WithdrawFormProps) {
    const {balance} = useBalance();
    return (
        <form action={action} className="space-y-3">
            {errors && JSON.stringify(errors)}
            {amountErrors.length > 0 && <div>{amountErrors.map(error => (
                <div className="text-tiny text-danger" key={error.message}>*{error.message}</div>))}</div>}
            {backendError?.length > 0 &&
                <div>{backendError.map(error => (
                    <div className="text-tiny text-danger" key={error}>*{error}</div>))}</div>}
            {/*amount*/}
            <div className="flex flex-col gap-2">
                <div className="relative">
                    <Input
                        id="amount"
                        name="amount"
                        className="max-w-xs text-white"
                        classNames={{
                            label: "!text-white",
                        }}
                        label="Amount to withdraw"
                        type="number"
                        placeholder="0,00"
                        autoFocus
                        defaultValue={"" + formValues.amount}
                        variant="underlined"
                        color="primary"

                    />
                </div>
            </div>
            {/*address*/}
            <div className="flex flex-col gap-2">
                <div className="relative">
                    <Input
                        id="address"
                        name="address"
                        className="max-w-xs text-white"
                        classNames={{
                            label: "!text-white",
                        }}
                        label="Withdraw to"
                        type="text"
                        placeholder="Enter your SOL address"
                        autoFocus
                        defaultValue={formValues.address}
                        variant="underlined"
                        color="primary"
                    />
                </div>
            </div>
            {children}
        </form>
    )
}