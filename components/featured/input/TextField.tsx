import { useState } from "react";
import DumbTextField from "@/components/dumb-components/input/DumbTextField";

type Props = {
	label?: string;
	placeholder: string;
	setValue: (value: string) => void;
	value: string;
	styleMain?: string;
	styleLabel?: string;
	styleInput?: string;
	enterPressed?: () => void;
};

export default function TextField({
	label,
	placeholder,
	setValue,
	value,
	styleMain,
	styleLabel,
	styleInput,
	enterPressed,
}: Props) {
	return (
		<DumbTextField
			label={label}
			placeholder={placeholder}
			setValue={setValue}
			value={value}
			styleMain={styleMain}
			styleLabel={styleLabel}
			styleInput={styleInput}
			enterPressed={enterPressed}
		/>
	);
}
