type Props = {
	ingreDB: any;
	formData: any;
};

export default function addIngredient({ ingreDB, formData }: Props) {
	if (ingreDB === null) {
		console.log("ingreDB was null");
		return;
	}
	let tx = ingreDB.transaction("Ingredients", "readwrite");
	tx.oncomplete = (e: any) => {
		console.log("Transaction complete:", e);
	};
	tx.onerror = (err: any) => {
		console.warn(err);
	};
	let store = tx.objectStore("Ingredients");
	let requestGetAll = store.getAll();

	requestGetAll.onsuccess = (event: any) => {
		const allData = event.target.result;

		const sortedArray = allData.sort(
			(a: any, b: any) => a.listIndex - b.listIndex
		);
		let missingNumber;
		let highestListIndex;

		if (sortedArray && sortedArray.length > 0) {
			highestListIndex = sortedArray.length;
			for (let i = 1; i < sortedArray.length; i++) {
				if (sortedArray[i].listIndex !== i) {
					missingNumber = i;
					break;
				}
			}
			if (missingNumber === undefined && highestListIndex !== undefined) {
				formData.listIndex = highestListIndex;
			} else {
				formData.listIndex = missingNumber;
			}
		} else {
			formData.listIndex = 0;
		}

		let requestAdd = store.add(formData);
		requestAdd.onsuccess = (e: any) => {
			console.log("Successfully added Ingredient");
		};
		requestAdd.onerror = (err: any) => {
			console.log("Error in request to add Ingredient to DataBase");
		};
	};
}
