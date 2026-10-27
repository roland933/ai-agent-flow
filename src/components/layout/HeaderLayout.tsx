import type { ReactNode } from "react"

type HeaderLayoutProps = {
    title: string,
    subTitle?: string,
    children?: ReactNode
    icon?: ReactNode
}

export function HeaderLayout({ title, subTitle, icon, children }: HeaderLayoutProps) {
    return (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                {icon && (
                    <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-300">
                        {icon}
                    </div>

                )}
                <div>
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    {subTitle && (
                        <p className="mt-1 text-sm text-slate-400">
                            {subTitle}
                        </p>
                    )}

                </div>
            </div>

            {children}
        </div>
    )
}