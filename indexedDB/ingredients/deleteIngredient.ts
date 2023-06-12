type Props = {
	ingreDB: any;
	key: string;
};

export default function deleteIngredient({ ingreDB, key }: Props) {
	// Typscript catch for ingreDB being null
	if (ingreDB === null) {
		console.log("ingreDB was null");
		return;
	}
	let tx = ingreDB.transaction("Ingredients", "readwrite");
	tx.oncomplete = (e: any) => {
		console.log("Transaction comeplete:", e);
	};
	tx.onerror = (err: any) => {
		console.warn(err);
	};
	let store = tx.objectStore("Ingredients");
	let request = store.delete(key);
	request.onsuccess = (e: any) => {
		console.log("successfully deleted Ingredient:", key);
	};
	request.onerror = (err: any) => {
		console.log("error in request to deleted Ingredient to DataBase");
		console.log(err);
	};
}
