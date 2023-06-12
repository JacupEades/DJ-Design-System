import DumbDropdown from "@/components/dumb-components/input/DumbDropdown";

interface Option {
	value: string;
	label: string;
}

interface DropdownProps {
	options: Option[];
	setValue: (value: string) => void;
	formValue: string;
}

export default function Dropown({
	options,
	setValue,
	formValue,
}: DropdownProps) {
	return (
		<DumbDropdown options={options} setValue={setValue} formValue={formValue} />
	);
}
