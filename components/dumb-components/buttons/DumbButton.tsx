import styles from "@/styles/scss/Components.module.scss";
import { IconProps } from "@phosphor-icons/react";

type ButtonProps = {
	icon?: React.ReactElement<IconProps>;
	text?: string;
	onClick?: () => void;
	btnStyle: string;
	disable?: boolean;
};

export default function DumbButton({
	icon,
	text,
	onClick,
	btnStyle,
	disable,
}: ButtonProps) {
	return (
		<button disabled={disable} onClick={onClick} className={styles[btnStyle]}>
			{icon}
			{text}
		</button>
	);
}
