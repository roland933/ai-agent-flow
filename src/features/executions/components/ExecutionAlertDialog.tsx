
import { Dialog } from "@/features/ui/dialog/Dialog";
import { Button } from "@/features/ui/button/Button";

type ExecutionAlertDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
};

export default function ExecutionAlertDialog({
    open,
    onOpenChange,
    title,
    description,
}: ExecutionAlertDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            size="sm"
            footer={
                <Button
                    title="Got it"
                    onClick={() => onOpenChange(false)}
                />
            }
        />


    );
}
