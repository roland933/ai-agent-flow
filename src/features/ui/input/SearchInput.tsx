
import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

type SearchInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({
  label,
  placeholder,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <Label className="text-sm font-medium text-slate-300">
          {label}
        </Label>
      )}

      <InputGroup className="w-full border-white/[0.08] bg-white/[0.025] ">
        <InputGroupInput
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder ? `${placeholder}...` : "Search..."}
        />

        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
