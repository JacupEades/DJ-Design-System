type Props = {
	ingreDB: any;
	formData: any;
};

export default function updateIngredient({ ingreDB, formData }: Props) {
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
	let request = store.put(formData);
	request.onsuccess = (e: any) => {
		console.log("successfully updateed Ingredient");
	};
	request.onerror = (err: any) => {
		console.log("error in request to update Ingredient to DataBase");
		console.log(err);
	};
}
