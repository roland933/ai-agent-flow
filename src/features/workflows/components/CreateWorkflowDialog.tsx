
import { useState } from "react";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { Button } from "@/features/ui/button/Button";
import FormField from "@/components/common/ui/form/FormField";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import type { CreateWorkflowData } from "../types/workflow";

type CreateWorkflowDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: CreateWorkflowData) => void | Promise<void>;
    isSubmitting?: boolean;
    error?: string | null;
};

const outputFormats: {
    value: CreateWorkflowData["outputFormat"];
    label: string;
    description: string;
}[] = [
        {
            value: "markdown",
            label: "Markdown",
            description: "Formatted document",
        },
        {
            value: "json",
            label: "JSON",
            description: "Structured data",
        },
        {
            value: "text",
            label: "Plain text",
            description: "Simple text output",
        },
    ];

export default function CreateWorkflowDialog({
    open,
    onOpenChange,
    onSubmit,
    isSubmitting = false,
    error,
}: CreateWorkflowDialogProps) {
    const [activeTab, setActiveTab] = useState("general");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const [outputName, setOutputName] = useState("");
    const [outputDescription, setOutputDescription] = useState("");
    const [outputFormat, setOutputFormat] =
        useState<CreateWorkflowData["outputFormat"]>("markdown");

    const handleSubmit = async () => {
        if (!name.trim() || !taskTitle.trim() || !outputName.trim() || isSubmitting) {
            return;
        }

        await onSubmit({
            name: name.trim(),
            description: description?.trim(),
            taskTitle: taskTitle.trim(),
            taskDescription: taskDescription?.trim(),
            outputName: outputName.trim(),
            outputDescription: outputDescription?.trim(),
            outputFormat,
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
            title="Create workflow"
            size="2xl"
            footer={
                <Button
                    title={isSubmitting ? "Creating..." : "Create workflow"}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                />
            }
        >
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
            >
                <TabsList className="mb-4 w-full">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="agents">Agents</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <div className="space-y-8 py-3">

                        {/* GENERAL */}
                        <section className="space-y-4">
                            <div>
                                <h3 className="text-base font-semibold text-white">
                                    General
                                </h3>
                                <p className="mt-1 text-sm text-slate-400">
                                    Basic information about your workflow.
                                </p>
                            </div>

                            <FormField
                                label="Workflow name"
                                value={name}
                                onChange={setName}
                                placeholder="e.g. Content research workflow"
                                required
                            />

                            <FormField
                                label="Description"
                                value={description}
                                onChange={setDescription}
                                placeholder="Describe what this workflow does..."
                                multiline
                                rows={3}
                            />
                        </section>

                        {error && (
                            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        <div className="border-t border-slate-800" />

                        {/* TASK */}
                        <section className="space-y-4">
                            <div>
                                <h3 className="text-base font-semibold text-white">
                                    Task
                                </h3>
                                <p className="mt-1 text-sm text-slate-400">
                                    Define the task shared by all assigned agents.
                                </p>
                            </div>

                            <FormField
                                label="Task title"
                                value={taskTitle}
                                onChange={setTaskTitle}
                                placeholder="e.g. Research a topic"
                                required
                            />

                            <FormField
                                label="Task description"
                                value={taskDescription}
                                onChange={setTaskDescription}
                                placeholder="Describe what the agents should accomplish..."
                                multiline
                                rows={4}
                            />
                        </section>

                        <div className="border-t border-slate-800" />

                        {/* OUTPUT */}
                        <section className="space-y-4">
                            <div>
                                <h3 className="text-base font-semibold text-white">
                                    Output
                                </h3>
                                <p className="mt-1 text-sm text-slate-400">
                                    Configure the expected final result.
                                </p>
                            </div>

                            <FormField
                                label="Output name"
                                value={outputName}
                                onChange={setOutputName}
                                placeholder="e.g. Research Report"
                                required
                            />

                            <FormField
                                label="Expected content"
                                value={outputDescription}
                                onChange={setOutputDescription}
                                placeholder="Describe the expected final output..."
                                multiline
                                rows={3}
                            />

                            {/* OUTPUT FORMAT */}
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-medium text-slate-200">
                                    Output format
                                </label>

                                <div className="grid grid-cols-3 gap-3">
                                    {outputFormats.map((format) => {
                                        const isSelected =
                                            outputFormat === format.value;

                                        return (
                                            <button
                                                key={format.value}
                                                type="button"
                                                onClick={() =>
                                                    setOutputFormat(format.value)
                                                }
                                                className={`hover:cursor-pointer rounded-xl border p-4 text-left transition-all ${isSelected
                                                    ? "border-purple-500 bg-purple-500/10"
                                                    : "border-slate-700 bg-[#121621] hover:border-slate-500"
                                                    }`}
                                            >
                                                <div className="mb-3 flex items-center justify-between">
                                                    <span
                                                        className={`text-sm font-medium ${isSelected
                                                            ? "text-purple-300"
                                                            : "text-slate-200"
                                                            }`}
                                                    >
                                                        {format.label}
                                                    </span>

                                                    <span
                                                        className={`flex size-4 items-center justify-center rounded-full border ${isSelected
                                                            ? "border-purple-500"
                                                            : "border-slate-500"
                                                            }`}
                                                    >
                                                        {isSelected && (
                                                            <span className="size-2 rounded-full bg-purple-500" />
                                                        )}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-slate-400">
                                                    {format.description}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                </TabsContent>

                <TabsContent value="agents">
                    <div className="min-h-[300px] py-4">
                        Agent settings
                    </div>
                </TabsContent>
            </Tabs>
        </Dialog>
    );
}
