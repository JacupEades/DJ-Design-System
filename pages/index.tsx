import Head from "next/head";
import styles from "@/styles/scss/Pages.module.scss";
import HeaderNavigation from "@/components/featured/layout/HeaderNavigation";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<Head>
				<title>Fridge Raider</title>
				<meta name="description" content="Your food made right, and fast!" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/icon-192x192.png" />
				<link rel="manifest" href="/manifest.json" />
			</Head>
			<HeaderNavigation />
			<main className={styles.homeMain}>
				<p className={styles.homeMessage}>Welcome to Fridge Raider!</p>
				<p className={styles.homeMessage}>
					Eliminate waste, eat healthy, save money.
				</p>
				<div>
					<h2>Smarter Food Management and Nutrition</h2>
					<ol>
						<li>Ingredient Tracking</li>
						<li>Nutrient Profiling</li>
						<li>Tailored Recipes</li>
						<li>Generalized Pricing Data</li>
					</ol>
				</div>
				<br />
				<br />
				<br />
				<br />
				<Link
					href="https://www.flaticon.com/free-icons/fridge"
					title="fridge icons">
					Fridge icon created by Freepik - Flaticon
				</Link>
			</main>
		</>
	);
}
