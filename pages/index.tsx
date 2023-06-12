import Head from "next/head";
import styles from "@/styles/scss/Home.module.scss";

export default function Home() {
	return (
		<>
			<Head>
				<title>DJ Design System</title>
				<meta name="description" content="Look at all these tokens!" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/icon-192x192.png" />
				<link rel="manifest" href="/manifest.json" />
			</Head>
			<main className={styles.homeMain}>
				<h1>Home Page</h1>
			</main>
		</>
	);
}
