import DumbSubmitButton from "@/components/dumb-components/buttons/DumbSubmitButton";
import { IconProps } from "@phosphor-icons/react";

type ButtonProps = {
	icon?: React.ReactElement<IconProps>;
	text?: string;
	onClick?: () => void;
	btnStyle: string;
	disabled?: boolean;
};

export default function SubmitButton({
	icon,
	text,
	onClick,
	btnStyle,
	disabled,
}: ButtonProps) {
	return (
		<DumbSubmitButton
			icon={icon}
			text={text}
			onClick={onClick}
			btnStyle={btnStyle}
			disabled={disabled}
		/>
	);
}
