type Props = {
	ingreDB: any;
	moveData: any;
	direction: string;
};

export default function moveIngredientDown({
	ingreDB,
	moveData,
	direction,
}: Props) {
	if (ingreDB === null) {
		console.log("ingreDB was null");
		return;
	}

	let tx = ingreDB.transaction("Ingredients", "readwrite");
	let store = tx.objectStore("Ingredients");
	const getAllRequest = store.getAll();
	getAllRequest.onsuccess = (event: any) => {
		const array = event.target.result;
		const sortedArray = array.sort(
			(a: any, b: any) => a.listIndex - b.listIndex
		);
		const nudgingObj = sortedArray.find(
			(obj: any) => obj.listIndex === moveData.listIndex
		);
		let nudgedObj;
		if (direction === "up") {
			nudgedObj = sortedArray.find(
				(obj: any) => obj.listIndex === moveData.listIndex - 1
			);
		} else {
			nudgedObj = sortedArray.find(
				(obj: any) => obj.listIndex === moveData.listIndex + 1
			);
		}

		const moveDirection =
			direction === "up"
				? {
						text: "top",
						nudgeing: nudgingObj.listIndex - 1,
						nudged: nudgingObj.listIndex + 1,
				  }
				: {
						text: "bottom",
						nudgeing: nudgingObj.listIndex + 1,
						nudged: nudgingObj.listIndex - 1,
				  };
		if (!nudgedObj) {
			console.log(`This is the ${moveDirection.text} of the movable list.`);
			return;
		}

		const newNudgingObj = {
			listIndex: moveDirection.nudgeing,
			name: nudgingObj.name,
			location: nudgingObj.location,
			status: nudgingObj.status,
		};

		const newNudgedObj = {
			listIndex: moveDirection.nudged,
			name: nudgedObj.name,
			location: nudgedObj.location,
			status: nudgedObj.status,
		};

		sortedArray.splice(nudgedObj.listIndex, 1, newNudgingObj);

		sortedArray.splice(nudgingObj.listIndex, 1, newNudgedObj);
		sortedArray.forEach((obj: any, i: number) => {
			obj.listIndex = i;

			const updateRequest = store.put(obj);
			updateRequest.onerror = function (event: any) {
				console.log("Error moving object:", event.target.error);
			};
		});
	};
}
