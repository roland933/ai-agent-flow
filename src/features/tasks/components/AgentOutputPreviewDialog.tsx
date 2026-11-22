
import { Dialog } from "@/features/ui/dialog/Dialog";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
import { useRef } from "react";
import { Download } from "lucide-react";
import { Button } from "@/features/ui/button/Button";


type AgentOutputPreviewDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    agentName: string;
    assignmentTitle: string;
    output: string;
};

export function AgentOutputPreviewDialog({
    open,
    onOpenChange,
    agentName,
    assignmentTitle,
    output,
}: AgentOutputPreviewDialogProps) {
     const contentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
            if (!contentRef.current) return;
                const options = {
                margin: [15, 12, 15, 12],
                filename: `${assignmentTitle.replace(/\s+/g, "-")}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                    onclone: (clonedDocument) => {
                    clonedDocument.querySelectorAll("*").forEach((element) => {
                        const htmlElement = element as HTMLElement;

                        htmlElement.style.color = "#334155";
                        htmlElement.style.backgroundColor = "transparent";
                        htmlElement.style.borderColor = "#e2e8f0";
                    });
                    },
                },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait",
                },
                pagebreak: {
                    mode: ["css", "legacy"],
                    avoid: ["h3", "h4"],
                },
                };

            await html2pdf()
                .set(options)
                .from(contentRef.current)
                .save();
            };
    return (
       
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
            title="Output Preview"
            description={`${agentName} · ${assignmentTitle}`}
            size="xl"
        >
            <div className="flex justify-end">

            <Button
                variant="secondary"
                title="  Download PDF"
                icon={<Download size={16} />}
                onClick={handleDownloadPDF}
                />
  
 
</div>
            <div className="max-h-[70vh] overflow-y-auto rounded-lg bg-slate-100 p-6 sm:p-10"  >
                <article
                    ref={contentRef}
                    className="
                        prose prose-slate
                        mx-auto max-w-4xl
                        text-slate-900
                       
                    "
                >
                    <ReactMarkdown
                        components={{
                            h3: ({ children }) => (
                                <h3 className="mb-4 mt-8 border-b border-slate-200 pb-3 text-2xl font-semibold text-slate-900">
                                    {children}
                                </h3>
                            ),

                            h4: ({ children }) => (
                                <h4 className="mb-3 mt-6 text-lg font-semibold text-slate-800">
                                    {children}
                                </h4>
                            ),

                            p: ({ children }) => (
                                <p className="my-3 text-base leading-7 text-slate-700">
                                    {children}
                                </p>
                            ),

                            ul: ({ children }) => (
                                <ul className="my-4 list-disc space-y-1 pl-6 text-slate-700">
                                    {children}
                                </ul>
                            ),

                            li: ({ children }) => (
                                 <li className="pl-1 text-sm leading-6 text-slate-700">
                                    {children}
                                </li>
                            ),

                            table: ({ children }) => (
                                <div className="my-6 w-full overflow-x-auto rounded-lg border border-slate-200">
                                    <table className="w-full border-collapse text-sm">
                                    {children}
                                    </table>
                                </div>
                                

                                ),

                            thead: ({ children }) => (
                                <thead className="bg-slate-100 text-slate-700">
                                    {children}
                                </thead>
                            ),

                            th: ({ children }) => (
                                    <th className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                                        {children}
                                    </th>
                            ),

                            tbody: ({ children }) => (
                                <tbody className="divide-y divide-slate-200">
                                    {children}
                                </tbody>
                                ),

                                tr: ({ children }) => (
                                <tr className="transition-colors hover:bg-slate-50">
                                    {children}
                                </tr>
                                ),

                                td: ({ children }) => (
                                <td className="px-4 py-3 align-top text-slate-700">
                                    {children}
                                </td>
                                ),
                                

                                
                        }}
                    >
                        {output}
                    </ReactMarkdown>
                </article>
            </div>
        </Dialog>
    );
}
