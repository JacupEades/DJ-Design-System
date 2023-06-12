import styles from "@/styles/scss/Components.module.scss";
import { Check } from "@phosphor-icons/react";

type Props = {
	checked: boolean;
	toggleCheck: (checked: boolean) => void;
	className: string;
	label?: string;
};

export default function DumbCheckBox({
	checked,
	toggleCheck,
	className,
	label,
}: Props) {
	return (
		<div className={styles.checkBoxMain}>
			{label !== undefined ? (
				<p className={styles.checkBoxLabel}>{label}</p>
			) : (
				<></>
			)}
			<div className={styles[className]}>
				{checked ? (
					<>
						<button onClick={() => toggleCheck(!checked)}>
							<Check size={32} />
						</button>
					</>
				) : (
					<>
						<button onClick={() => toggleCheck(!checked)} />
					</>
				)}
			</div>
		</div>
	);
}
