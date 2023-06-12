import deleteIngredient from "@/indexedDB/ingredients/deleteIngredient";
import updateIngredient from "@/indexedDB/ingredients/updateIngredient";
import { loadList, refetchCall, refetched } from "@/redux/slices/listSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/scss/Components.module.scss";
import {
	AlignBottomSimple,
	Books,
	CaretDown,
	CaretUp,
	Snowflake,
	X,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import moveIngredientListIndex from "@/indexedDB/ingredients/moveIngredientListIndex";

type Props = {
	ingreDB: any;
};

type Ingredient = {
	listIndex: number;
	name: string;
	location: string;
	status: string;
};

export default function IngredientList({ ingreDB }: Props) {
	const [ingredientList, setIngredientList] = useState([]);
	const { list } = useSelector((state: any) => ({
		...state,
	}));
	const dispatch = useDispatch();
	let listStyle = "ingredientListItem";

	useEffect(() => {
		setIngredientList(list.listData);
	}, [list.listData]);

	const toggleStatus = (data: any) => {
		const { listIndex, name, location, status } = data;
		let togStatus;
		switch (status) {
			case "Plenty":
				togStatus = "Low";
				break;
			case "Low":
				togStatus = "Inactive";
				break;
			case "Inactive":
				togStatus = "Plenty";
				break;
			default:
				togStatus = `Error in toggleStatus`;
				break;
		}
		return {
			listIndex,
			name,
			location,
			status: togStatus,
		};
	};

	const handleStatusChange = (liData: any) => {
		const newStatus = toggleStatus(liData);
		updateIngredient({ ingreDB: ingreDB, formData: newStatus });
		dispatch(refetchCall());
	};
	const handleRemoveLi = (LiKey: string) => {
		deleteIngredient({ ingreDB: ingreDB, key: LiKey });
		dispatch(refetchCall());
	};

	const handleMoveUp = ({ listIndex, name, location, status }: Ingredient) => {
		const moveData = { listIndex, name, location, status };
		moveIngredientListIndex({
			ingreDB: ingreDB,
			moveData: moveData,
			direction: "up",
		});
		dispatch(refetchCall());
	};

	const handleMoveDown = ({
		listIndex,
		name,
		location,
		status,
	}: Ingredient) => {
		const moveData = { listIndex, name, location, status };
		moveIngredientListIndex({
			ingreDB: ingreDB,
			moveData: moveData,
			direction: "down",
		});
		dispatch(refetchCall());
	};

	const buildList = async () => {
		try {
			dispatch(refetched());
			const tx: any = await makeTX("Ingredients", "readonly");
			const store = tx.objectStore("Ingredients");
			const getReq = store.getAll();
			getReq.onsuccess = (e: any) => {
				const request = e.target;
				dispatch(loadList({ listData: request.result }));
				// setDataReady(true);
			};
			getReq.onerror = (err: any) => {
				console.warn(err);
			};
		} catch (err) {
			console.log("objectStore Loading");
		}
	};

	const makeTX = (storeName: any, mode: any) => {
		if (ingreDB === null) {
			return;
		}
		return new Promise((resolve, reject) => {
			const tx = ingreDB.transaction(storeName, mode);
			tx.onerror = (err: any) => {
				reject(err);
			};
			resolve(tx);
		});
	};

	useEffect(() => {
		// This should reduce the amount of times build list runs.
		if (
			ingredientList === null ||
			ingredientList.length === 0 ||
			list.refetch === true
		) {
			buildList();
		}
		// Use effect wants to depend on build list but it can't because I needs to be called after init.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ingreDB, list.refetch]);

	const statusColor = (status: string) => {
		switch (status) {
			case "Plenty":
				return "statusPlenty";
			case "Low":
				return "statusLow";
			case "Inactive":
				return "statusInactive";
			default:
				return "";
		}
	};

	const loactionIcon = (status: string) => {
		switch (status) {
			case "Pantry":
				return (
					<Books size={32} color="brown" className={styles.listSpecialIcon} />
				);
			case "Fridge":
				return (
					<AlignBottomSimple
						size={32}
						color="silver"
						className={styles.listSpecialIcon}
					/>
				);
			case "Freezer":
				return (
					<Snowflake
						size={32}
						color="lightblue"
						className={styles.listSpecialIcon}
					/>
				);
			default:
				return <></>;
		}
	};

	return (
		<>
			<div className={styles.ingredientListMain}>
				<div className={styles.ingredientListHeading}>
					<p data-label=""></p>
					<p data-label="Name"></p>
					<p data-label="Location"></p>
					<p data-label="Status"></p>
					<p data-label="Remove"></p>
				</div>
				{ingredientList &&
					ingredientList
						.slice()
						.sort((ingredientA: Ingredient, ingredientB: Ingredient) => {
							// if (
							// 	ingredientA.status === "Inactive" &&
							// 	ingredientB.status !== "Inactive"
							// ) {
							// 	return 1;
							// } else if (
							// 	ingredientA.status !== "Inactive" &&
							// 	ingredientB.status === "Inactive"
							// ) {
							// 	return -1;
							// } else {
							// }
							if (ingredientA.listIndex < ingredientB.listIndex) {
								return -1;
							} else if (ingredientA.listIndex > ingredientB.listIndex) {
								return 1;
							} else {
								return 0;
							}
						})
						.map(
							(
								{ listIndex, name, location, status }: Ingredient,
								i: number
							) => {
								const specialIcon = loactionIcon(location);
								const statusStyle = statusColor(status);
								return (
									<div
										key={i}
										className={
											status === "Inactive"
												? `${styles.ingredientListItem} ${styles[listStyle]} ${styles.inactive}`
												: `${styles.ingredientListItem} ${styles[listStyle]}`
										}>
										<div className={styles.moveIndexBtnMain}>
											<button
												// disabled={status === "Inactive"}
												className={
													status === ""
														? `${styles.moveIndexInactive} ${styles.moveIndexDown}`
														: styles.moveIndexUp
												}
												onClick={() =>
													handleMoveUp({ listIndex, name, location, status })
												}>
												<CaretUp size={32} color="grey" />
											</button>
											<button
												// disabled={status === "Inactive"}
												className={
													status === ""
														? `${styles.moveIndexInactive} ${styles.moveIndexDown}`
														: styles.moveIndexDown
												}
												onClick={() =>
													handleMoveDown({ listIndex, name, location, status })
												}>
												<CaretDown size={32} color="grey" />
											</button>
										</div>
										<p className={styles.ingredientListName}>{name}</p>
										<div className={styles.ingredientListLocation}>
											{specialIcon}
											<p>{location}</p>
										</div>
										<div className={styles[statusStyle]}>
											<button
												onClick={() =>
													handleStatusChange({
														listIndex,
														name,
														location,
														status,
													})
												}></button>
										</div>
										<div className={styles.ingredientListDeleteBtn}>
											<button onClick={() => handleRemoveLi(name)}>
												<X size={32} />
											</button>
										</div>
									</div>
								);
							}
						)}
			</div>
		</>
	);
}
