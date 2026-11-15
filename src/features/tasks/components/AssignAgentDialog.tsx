
import { useState } from "react";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { Button } from "@/features/ui/button/Button";
import AgentSelect from "@/components/common/ui/AgentSelect";

import type { Task } from "../types/task";

type AssignAgentDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task: Task | null;
    onSubmit: (data: {
        agentId: number;
        title: string;
        description: string;
    }) => void;
};

export function AssignAgentDialog({
    open,
    onOpenChange,
    task,
    onSubmit,
}: AssignAgentDialogProps) {
    const [agentId, setAgentId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const handleSubmit = () => {
        if (!agentId || !title.trim()) return;

        onSubmit({
            agentId: Number(agentId),
            title: title.trim(),
            description: description.trim(),
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
            title="Assign an agent"
            description="Assign an agent to work on this task."
            size="md"
            footer={
                <>
                    <Button
                        title="Cancel"
                        variant="secondary"
                        onClick={() => onOpenChange(false)}
                    />
                    <Button
                        title="Assign agent"
                        onClick={handleSubmit}
                        disabled={!agentId || !title.trim()}
                    />
                </>
            }
        >
            <div className="space-y-4">

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-200">
                        Task title
                    </label>
                    <input
                        value={task?.title ?? ""}
                        disabled
                        placeholder="e.g. Research the topic"
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                    />
                </div>

                <AgentSelect
                    value={agentId}
                    onChange={setAgentId}
                />

                  


                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-200">
                        Assignment title
                    </label>
                    <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="e.g. Research the topic"
                        className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-200">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Describe what the agent should do..."
                        rows={4}
                        className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                    />
                </div>
            </div>
        </Dialog>
    );
}
