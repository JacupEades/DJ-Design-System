import SubmitButton from "@/components/featured/buttons/SubmitButton";
import CheckBox from "@/components/featured/input/CheckBox";
import Dropdown from "@/components/featured/input/Dropdown";
import TextField from "@/components/featured/input/TextField";
import addIngredient from "@/indexedDB/ingredients/addIngredient";
import updateIngredient from "@/indexedDB/ingredients/updateIngredient";
import { refetchCall } from "@/redux/slices/listSlice";
import styles from "@/styles/scss/Forms.module.scss";
import { Plus } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
	ingreDB: any;
};

export default function AddIngredient({ ingreDB }: Props) {
	// List of ingredients
	const [ingreDBState, setIngreDBState] = useState<IDBDatabase | null>(null);
	// Index State
	const [listIndex, setlistIndex] = useState(0);
	// Name State
	const [ingrName, setIngrName] = useState("");
	// Amount State
	const [plentyChecked, setPlentyChecked] = useState(true);
	const [lowChecked, setLowChecked] = useState(false);
	const [inactiveChecked, setInactiveChecked] = useState(false);
	// Location State
	const [location, setLocation] = useState("");
	// Form Data
	const [formData, setFormData] = useState({
		listIndex: listIndex,
		name: "",
		location: "",
		status: "Plenty",
	});
	const { list } = useSelector((state: any) => ({
		...state,
	}));
	// global vars
	const dispatch = useDispatch();
	let key: any = null;
	// global functions
	const formReset = () => {
		setIngrName("");
		setLocation("");
		handleCheckedPlenty();
	};

	useEffect(() => {
		setIngreDBState(ingreDB);
	}, [ingreDB]);

	// FormData update on change useEffect
	useEffect(() => {
		// status check
		let ingrStatus = "";
		if (plentyChecked === true) {
			ingrStatus = "Plenty";
		}
		if (lowChecked === true) {
			ingrStatus = "Low";
		}
		if (inactiveChecked === true) {
			ingrStatus = "Inactive";
		}
		setFormData({
			listIndex: 0,
			name: ingrName,
			location: location,
			status: ingrStatus,
		});
	}, [inactiveChecked, ingrName, location, lowChecked, plentyChecked]);

	// Check the form state in Dev ENV
	// useEffect(() => {
	// 	console.log("formData", formData);
	// 	console.log(list.listData);
	// }, [formData, list.listData]);

	const handleCheckedPlenty = () => {
		setPlentyChecked(true);
		setLowChecked(false);
		setInactiveChecked(false);
	};
	const handleCheckedLow = () => {
		setPlentyChecked(false);
		setLowChecked(true);
		setInactiveChecked(false);
	};
	const handleCheckedInactive = () => {
		setPlentyChecked(false);
		setLowChecked(false);
		setInactiveChecked(true);
	};

	// form validation for text field and location
	let formIsFilled = false;
	const formValidation = () => {
		const formChecks = formData.name === "" || formData.location === "";
		if (formChecks) {
			console.log("formData location from submit --->", formData.location);
			window.alert("Please include a name and location to submit form.");
			return (formIsFilled = false);
		} else {
			return (formIsFilled = true);
		}
	};

	// ADD INDEXEDDB
	const handleAdd = () => {
		addIngredient({ ingreDB: ingreDBState, formData });
		dispatch(refetchCall());
		formReset();
	};

	// UPDATE INDEXEDDB
	const handleUpdate = () => {
		updateIngredient({ ingreDB: ingreDBState, formData });
		dispatch(refetchCall());
		formReset();
	};

	const handleSubmit = () => {
		formValidation();
		if (formValidation() === false) {
			return;
		}
		const keyCheck = async (array: any[], dbKey: string) => {
			for (let i = 0; i < array.length; i++) {
				if (array[i].name === dbKey) {
					return (key = true);
				}
			}
			return (key = null);
		};
		keyCheck(list.listData, formData.name);

		if (key) {
			handleUpdate();
		} else {
			handleAdd();
		}
	};
	// event listener for enter key on the input field
	return (
		<div className={styles.addIngreMain}>
			<h2 className={styles.addIngreTitle}>Add Ingredient</h2>
			<TextField
				placeholder={"Ingredient"}
				setValue={setIngrName}
				value={ingrName}
				styleMain={"textFieldMain"}
				styleLabel={"textFieldLabel"}
				styleInput={"textFieldInput"}
				enterPressed={handleSubmit}
			/>
			<div className={styles.addIngreCenterCols}>
				{/* Amount */}
				<div className={styles.addIngreAmount}>
					<p className={styles.addIngreColTitle}>Amount</p>
					<div className={styles.addIngreChecks}>
						<CheckBox
							checked={plentyChecked}
							toggleCheck={handleCheckedPlenty}
							className={"checkBoxMainGreen"}
							label={"Plenty"}
						/>
						<CheckBox
							checked={lowChecked}
							toggleCheck={handleCheckedLow}
							className={"checkBoxMainRed"}
							label={"Low"}
						/>
						<CheckBox
							checked={inactiveChecked}
							toggleCheck={handleCheckedInactive}
							className={"checkBoxMainGrey"}
							label={"Inactive"}
						/>
					</div>
				</div>
				{/* Selection, Dropdown, Location */}
				<div className={styles.addIngreLocation}>
					<p className={styles.addIngreColTitle}>Location</p>
					<Dropdown
						options={[
							{ value: "Pantry", label: "Pantry" },
							{ value: "Fridge", label: "Fridge" },
							{ value: "Freezer", label: "Freezer" },
						]}
						setValue={setLocation}
						formValue={location}
					/>
				</div>
			</div>
			<SubmitButton
				icon={<Plus size={32} />}
				onClick={() => handleSubmit()}
				btnStyle={"formSubmitBtn"}
				disabled={ingrName === "" || formData.location === ""}
			/>
		</div>
	);
}
