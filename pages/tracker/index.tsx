import { useEffect, useState } from "react";
import styles from "@/styles/scss/Pages.module.scss";
import HeaderNavigation from "@/components/featured/layout/HeaderNavigation";
import IngredientList from "@/components/featured/lists/IngredientList";
import openIngredientStore from "@/indexedDB/ingredients/open";
import { useDispatch } from "react-redux";
import { compHydrated } from "@/redux/slices/listSlice";
import AddIngredient from "@/components/featured/forms/AddIngredient";

export default function Tracker() {
	const [loading, setLoading] = useState(true);
	const [ingreDB, setIngreDB] = useState<IDBDatabase | null>(null);
	const dispatch = useDispatch();

	// Updates the redux store to let the children know that the page has hydrated(mounted)
	// Get the IndexedDB Ingredient store for this page
	useEffect(() => {
		async function storeOpen() {
			const { db }: any = await openIngredientStore();
			setIngreDB(db);
		}
		storeOpen();
		setLoading(false);
		dispatch(compHydrated());
	}, [dispatch]);

	// Skeleton loading state
	if (loading === true) {
		return (
			<>
				<HeaderNavigation />
				<main className={styles.trackerMain}>
					<h1>Loading...</h1>
				</main>
			</>
		);
	}

	return (
		<>
			<HeaderNavigation />
			<main className={styles.trackerMain}>
				<AddIngredient ingreDB={ingreDB} />
				{/* Saved List of Ingredients */}
				<IngredientList ingreDB={ingreDB} />
			</main>
		</>
	);
}
