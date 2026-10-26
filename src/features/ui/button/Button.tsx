import { Button as UIButton } from "@/components/ui/button";
import type { ReactNode } from "react";

type AgenButtonProps = {
onClick: () => void
icon?:ReactNode
title:string,

}


export function Button({onClick,icon,title}:AgenButtonProps) {
    return (
        <UIButton
          onClick={onClick}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm hover:bg-violet-500 hover:cursor-pointer"
        >
          {icon}
         
          {title}
         
        </UIButton>
    )
}