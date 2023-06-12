import styles from "@/styles/scss/Components.module.scss";
import Link from "next/link";
import { Shrimp } from "@phosphor-icons/react";

type Props = {
	linkObj: Array<{ linkRef: URL | string; linkTitle: string }>;
};

export default function DumbHeaderNavigation({ linkObj }: Props) {
	return (
		<nav className={styles.headerMain}>
			{/* left */}
			<Shrimp size={42} weight="duotone" />
			{/* middle */}
			<div>
				{linkObj.map((obj: any, i: any) => {
					return (
						<Link key={i} href={obj.linkRef} className={styles.headerLink}>
							{obj.linkTitle}
						</Link>
					);
				})}
			</div>
			{/* right */}
			<div>
				<p>v0.0.6</p>
			</div>
		</nav>
	);
}
