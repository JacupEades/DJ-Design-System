export default function openIngredientStore() {
	return new Promise((resolve, reject) => {
		let db = null;
		let objectStore: any = null;
		let DBOpenReq: any = null;

		DBOpenReq = indexedDB.open("Ingredients", 1);

		DBOpenReq.addEventListener("error", (err: any) => {
			console.warn(err);
			reject(err);
		});

		DBOpenReq.addEventListener("success", (e: any) => {
			db = e.target.result;
			resolve({ db, objectStore, DBOpenReq });
		});

		DBOpenReq.addEventListener("upgradeneeded", (e: any) => {
			db = e.target.result;
			let oldVersion = e.oldVersion;
			let newVersion = e.newVersion || db.version;
			console.log("DB updated from version", oldVersion, "to", newVersion);
			console.log("upgrade", db);
			if (!db.objectStoreNames.contains("Ingredients")) {
				objectStore = db.createObjectStore("Ingredients", {
					keyPath: "name",
				});
				resolve({ db, objectStore, DBOpenReq });
			}
		});
	});
}
