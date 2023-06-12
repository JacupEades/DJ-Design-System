type Props = {
	ingreDB: any;
};

export default function getAllIngredients({ ingreDB }: Props) {
	let fullList = null;
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
	let request = store.getAll();
	request.onsuccess = (e: any) => {
		const request = e.target;
		console.log("successfully added Ingredient");
		fullList = request.result;
		return fullList;
	};
	request.onerror = (err: any) => {
		console.log("error in request to add Ingredient to DataBase");
	};
}
