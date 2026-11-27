
import { useState } from "react";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { Button } from "@/features/ui/button/Button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

type CreateWorkflowDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: CreateWorkflowData) => void;
};

export type CreateWorkflowData = {
    name: string;
    description: string;
    taskTitle: string;
    taskDescription: string;
    outputName: string;
    outputDescription: string;
    outputFormat: "markdown" | "json" | "text";
};

export default function CreateWorkflowDialog({
    open,
    onOpenChange,
    onSubmit,
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

    const handleSubmit = () => {
        if (!name.trim() || !taskTitle.trim() || !outputName.trim()) {
            return;
        }

        onSubmit({
            name: name.trim(),
            description: description.trim(),
            taskTitle: taskTitle.trim(),
            taskDescription: taskDescription.trim(),
            outputName: outputName.trim(),
            outputDescription: outputDescription.trim(),
            outputFormat,
        });
    };

    const inputClassName =
        "w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-purple-500";

    const labelClassName = "text-sm font-medium text-slate-200 ";

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
            title="Create workflow"

            size="2xl"
            footer={
                <Button
                    title="Create workflow"
                    onClick={handleSubmit}
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

                        {/* GENERAL INFORMATION */}
                        <section className="space-y-4">
                            <div>
                                <h3 className="text-base font-semibold text-white">
                                    General
                                </h3>
                                <p className="mt-1 text-sm text-slate-400">
                                    Basic information about your workflow.
                                </p>
                            </div>

                            <div className="space-y-1.5">
                                <label className={labelClassName}>
                                    Workflow name
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Content research workflow"
                                    className={inputClassName}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className={labelClassName}>
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe what this workflow does..."
                                    rows={3}
                                    className={`${inputClassName} resize-none`}
                                />
                            </div>
                        </section>

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

                            <div className="space-y-1.5">
                                <label className={labelClassName}>
                                    Task title
                                </label>
                                <input
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    placeholder="e.g. Research a topic"
                                    className={inputClassName}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className={labelClassName}>
                                    Task description
                                </label>
                                <textarea
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                    placeholder="Describe what the agents should accomplish..."
                                    rows={4}
                                    className={`${inputClassName} resize-none`}
                                />
                            </div>
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

                            <div className="space-y-1.5">
                                <label className={labelClassName}>
                                    Output name
                                </label>
                                <input
                                    value={outputName}
                                    onChange={(e) => setOutputName(e.target.value)}
                                    placeholder="e.g. Research Report"
                                    className={inputClassName}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className={labelClassName}>
                                    Expected content
                                </label>
                                <textarea
                                    value={outputDescription}
                                    onChange={(e) => setOutputDescription(e.target.value)}
                                    placeholder="Describe the expected final output..."
                                    rows={3}
                                    className={`${inputClassName} resize-none`}
                                />
                            </div>


                            <div className="space-y-2">
                                <label className={labelClassName}>
                                    Output format
                                </label>

                                <div className="grid grid-cols-3 gap-3">
                                    {[
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
                                    ].map((format) => {
                                        const isSelected = outputFormat === format.value;

                                        return (
                                            <button
                                                key={format.value}
                                                type="button"
                                                onClick={() =>
                                                    setOutputFormat(
                                                        format.value as CreateWorkflowData["outputFormat"]
                                                    )
                                                }
                                                className={`rounded-xl border p-4 text-left transition-all ${isSelected
                                                        ? "border-purple-500 bg-purple-500/10"
                                                        : "border-slate-700 bg-slate-900 hover:border-slate-500"
                                                    }`}
                                            >
                                                <div className="mb-3 flex items-center justify-between">
                                                    <span
                                                        className={`text-sm font-medium ${isSelected ? "text-purple-300" : "text-slate-200"
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
