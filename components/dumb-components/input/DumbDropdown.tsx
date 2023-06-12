import styles from "@/styles/scss/Components.module.scss";
import { CaretDown } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

interface Option {
	value: string;
	label: string;
}

interface DropdownProps {
	options: Option[];
	setValue: (value: string) => void;
	formValue: string;
}

export default function DumbDropdown({
	options,
	setValue,
	formValue,
}: DropdownProps) {
	const defaultOption = {
		value: "",
		label: "Select an option",
	};
	const [selectedOption, setSelectedOption] = useState(defaultOption);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setValue(selectedOption.value);
	}, [selectedOption, setValue, formValue]);

	const handleOptionSelect = (option: Option) => {
		setSelectedOption(option);
		setIsOpen(false);
	};
	const iconStyles = {
		transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
		transition: "transform 0.25s ease-in-out",
	};

	const buttonOpen = {
		borderRadius: isOpen ? "0.5rem 0.5rem 0 0 " : "0.5rem",
		transition: isOpen ? "border-radius 0.1s" : "border-radius 0.25s 0.2s",
	};
	const dropdownStyles = {
		maxHeight: isOpen ? `${options.length * 46}px` : "0",
	};

	return (
		<div className={styles.dropdownMain}>
			<button
				style={buttonOpen}
				className={styles.dropdownToggle}
				onClick={() => setIsOpen(!isOpen)}>
				{selectedOption.label}
				<CaretDown size={16} style={iconStyles} />
			</button>
			<ul style={dropdownStyles}>
				{options.map((option) => (
					<li key={option.value} onClick={() => handleOptionSelect(option)}>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
}
