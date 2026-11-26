
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
    const [outputFormat, setOutputFormat] = useState("markdown");
    
    const handleSubmit = () => {
        if (!name.trim() || !taskTitle.trim()) {
            return;
        }

        onSubmit({
            name: name.trim(),
            description: description.trim(),
            taskTitle: taskTitle.trim(),
            taskDescription: taskDescription.trim(),
            outputName: outputName.trim(),
            outputDescription: outputDescription.trim(),
            outputFormat: outputFormat as CreateWorkflowData["outputFormat"],
        });
    };
    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
            title="Create workflow"
            description="Configure your workflow."
            size="xl"
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
                <TabsList className="w-full">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="task">Task</TabsTrigger>
                    <TabsTrigger value="output">Output</TabsTrigger>
                    <TabsTrigger value="agents">Agents</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <div className="space-y-4 py-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-200">
                                Workflow name
                            </label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Content research workflow"
                                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-200">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what this workflow does..."
                                rows={4}
                                className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="task">
                    <div className="space-y-4 py-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-200">
                                Task title
                            </label>

                            <input
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                placeholder="e.g. Research a topic"
                                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-200">
                                Task description
                            </label>

                            <textarea
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                placeholder="Describe what the agents should accomplish..."
                                rows={5}
                                className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="output">
                    <div className="space-y-4 py-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-200">
                                Output name
                            </label>

                            <input
                                value={outputName}
                                onChange={(e) => setOutputName(e.target.value)}
                                placeholder="e.g. Research Report"
                                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-200">
                                Expected content
                            </label>

                            <textarea
                                value={outputDescription}
                                onChange={(e) => setOutputDescription(e.target.value)}
                                placeholder="Describe the expected final output..."
                                rows={4}
                                className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-200">
                                Output format
                            </label>

                            <select
                                value={outputFormat}
                                onChange={(e) => setOutputFormat(e.target.value)}
                                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
                            >
                                <option value="markdown">Markdown</option>
                                <option value="json">JSON</option>
                                <option value="text">Plain Text</option>
                            </select>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="agents">
                    <div className="py-4">
                        Agent settings
                    </div>
                </TabsContent>
            </Tabs>
        </Dialog>
    );
}
