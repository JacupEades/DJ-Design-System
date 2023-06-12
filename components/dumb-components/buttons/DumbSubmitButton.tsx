import styles from "@/styles/scss/Components.module.scss";
import { IconProps } from "@phosphor-icons/react";

type ButtonProps = {
	icon?: React.ReactElement<IconProps>;
	text?: string;
	onClick?: () => void;
	btnStyle: string;
	disabled?: boolean;
};

export default function DumbSubmitButton({
	icon,
	text,
	onClick,
	btnStyle,
	disabled,
}: ButtonProps) {
	return (
		<button
			type="submit"
			onClick={onClick}
			className={styles[btnStyle]}
			disabled={disabled}>
			{icon}
			{text}
		</button>
	);
}
