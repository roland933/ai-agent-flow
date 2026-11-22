import html2pdf from "html2pdf.js";


export const useDownloadPdf = (contentRef,fileName)  => {


     const handleDownloadPDF = async () => {
            if (!contentRef.current) return;
                const options = {
                margin: [15, 12, 15, 12],
                filename: `${fileName.replace(/\s+/g, "-")}.pdf`,
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
                    avoid: ["h3", "h4", "li"],
                },
                };

            await html2pdf()
                .set(options)
                .from(contentRef.current)
                .save();
            };




     return {
        handleDownloadPDF
     }

}