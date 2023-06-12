import styles from "@/styles/scss/Components.module.scss";

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

export default function DumbTextField({
	label,
	placeholder,
	setValue,
	value,
	styleMain,
	styleLabel,
	styleInput,
	enterPressed,
}: Props) {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			enterPressed && enterPressed();
		}
	};

	return (
		<div className={styleMain && styles[styleMain]}>
			<label className={styleLabel && styles[styleLabel]}>{label}</label>
			<input
				type="text"
				placeholder={placeholder}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				className={styleInput && styles[styleInput]}
				value={value}
			/>
		</div>
	);
}
