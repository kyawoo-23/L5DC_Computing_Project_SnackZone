import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectBoxProps {
  placeholder: string;
  name: string;
  options: {
    label: string;
    value: string;
    selected?: boolean;
  }[];
}

export default function SelectBox({
  placeholder,
  name,
  options,
}: SelectBoxProps) {
  return (
    <Select
      name={name}
      defaultValue={options.find((option) => option.selected)?.value || ""}
    >
      <SelectTrigger className='w-full form-input'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, idx) => (
          <SelectItem
            key={idx}
            value={option.value}
            className='focus:bg-slate-400'
            defaultChecked={option.selected ? true : false}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
