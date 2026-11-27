import type { ReactNode } from "react"

type EmptyStateProps = {
    icon?: ReactNode,
    title: string,
    subtitle?: string,
}

export function EmptyState({ title = "No data yet", subtitle, icon }: EmptyStateProps) {

    return (
        <div className="rounded-2xl border border-dashed border-[#303444] py-12 text-center">
            {icon}

            <p className="text-xl font-medium text-[#F1F2F7]">{title}</p>
            {subtitle && (
                <p className="mt-1 text-md text-[#9299AA]">{subtitle}</p>
            )}

        </div>
    )
}