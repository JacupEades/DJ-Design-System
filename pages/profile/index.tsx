import styles from "@/styles/scss/Pages.module.scss";
import HeaderNavigation from "@/components/featured/layout/HeaderNavigation";

export default function Profile() {
	return (
		<>
			<HeaderNavigation />
			<main className={styles.profileMain}>
				<h1 className={styles.profileMessage}>Profile Page</h1>
			</main>
		</>
	);
}
