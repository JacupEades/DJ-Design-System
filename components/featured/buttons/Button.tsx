import DumbButton from "@/components/dumb-components/buttons/DumbButton";
import { IconProps } from "@phosphor-icons/react";

type ButtonProps = {
	icon?: React.ReactElement<IconProps>;
	text?: string;
	onClick?: () => void;
	btnStyle: string;
};

export default function Button({ icon, text, onClick, btnStyle }: ButtonProps) {
	return (
		<DumbButton icon={icon} text={text} onClick={onClick} btnStyle={btnStyle} />
	);
}
