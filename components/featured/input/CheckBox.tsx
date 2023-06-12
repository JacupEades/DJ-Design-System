import DumbCheckBox from "@/components/dumb-components/input/DumbCheckBox";

type Props = {
	checked: boolean;
	toggleCheck: (checked: boolean) => void;
	className: string;
	label?: string;
};

export default function CheckBox({
	checked,
	toggleCheck,
	className,
	label,
}: Props) {
	return (
		<DumbCheckBox
			checked={checked}
			toggleCheck={toggleCheck}
			className={className}
			label={label}
		/>
	);
}
