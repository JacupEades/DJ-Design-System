import pageS from "@/styles/scss/Pages.module.scss";
import HeaderNavigation from "@/components/featured/layout/HeaderNavigation";
import sampleRequestBody from "@/data/recipe-request/recipe-request.example.json";
import { useEffect, useState } from "react";
import DumpButton from "@/components/dumb-components/buttons/DumbButton";

export default function Recipe() {
	const [recipe, setRecipe] = useState(null);

	useEffect(() => {
		console.log("recipe", recipe);
	}, [recipe]);

	const handleCreateRecipeOld = () => {
		console.log("sampleRequestBody", sampleRequestBody);

		const Options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(sampleRequestBody),
		};

		fetch(`/api/generate-recipe`, Options)
			.then((response) => {
				console.log("response", response);
				return response.json();
			})
			.then((data) => {
				console.log("data ===>", data);
				// document.getElementsByClassName("recipe")[0].innerHTML =
				// 	data.recipe.choices[0].message.content;
				setRecipe(data);
			});
	};

	const OldTSX = () => {
		return (
			<>
				<p className={pageS.recipeTitle}>Recipe Page</p>
				<DumpButton
					btnStyle={"recipeBtn"}
					text={"Generate Recipe"}
					onClick={() => handleCreateRecipeOld()}
					disable={true}
				/>
				<div className={pageS.recipeResult}>
					{recipe !== null ? JSON.stringify(recipe) : ""}
				</div>
			</>
		);
	};
	// New Comps to be moved after approval
	const InputChip = ({ text, value }: any) => {
		return (
			<div
				className={pageS.inputChip}
				onClick={() => {
					console.log(value);
				}}>
				<p>{text}</p>
			</div>
		);
	};

	const UserOutputOption = ({ text, value }: any) => {
		return (
			<div
				className={pageS.userRecipeSelectBtn}
				onClick={() => {
					console.log(value);
				}}>
				<p>{text}</p>
			</div>
		);
	};

	const AIResponseOption = ({ text, value }: any) => {
		return (
			<div className={pageS.aiResponseOption}>
				<p>{text}</p>
			</div>
		);
	};

	const handleCreateRecipe = () => {
		console.log("KALE IS THE ONLY THING YOU SHOULD EAT TUBBY!");
	};

	return (
		<>
			<HeaderNavigation />
			<main className={pageS.recipeMain}>
				{/* GRID */}
				<div className={pageS.recipeGrid}>
					{/* Input */}
					<div className={pageS.recipeGridInput}>
						<h4>Recipe criteria:</h4>
						{/* Time */}
						<div className={pageS.recipeOption}>
							<h6>Time</h6>
							<div className={pageS.chipMain}>
								<InputChip text={"0-15min"} value={0} />
								<InputChip text={"15-30min"} value={1} />
								<InputChip text={"30min-1hr"} value={2} />
								<InputChip text={"1hr+"} value={3} />
							</div>
						</div>
						{/* Servings */}
						<div className={pageS.recipeOption}>
							<h6>Servings</h6>
							<div className={pageS.chipMain}>
								<InputChip text={"1-2"} value={0} />
								<InputChip text={"3-5"} value={1} />
								<InputChip text={"6-9"} value={2} />
								<InputChip text={"10+"} value={3} />
							</div>
						</div>
						{/* Flavors */}
						<div className={pageS.recipeOption}>
							<h6>Flavors</h6>
							<div className={pageS.chipMain}>
								<InputChip text={"Sweet"} value={0} />
								<InputChip text={"Salty"} value={1} />
								<InputChip text={"Savory"} value={2} />
								<InputChip text={"Spicy"} value={3} />
								<InputChip text={"Sour"} value={4} />
								<InputChip text={"Bitter"} value={5} />
							</div>
						</div>
						{/* Cuisine Type */}
						<div className={pageS.recipeOption}>
							<h6>Cuisine</h6>
							<div className={pageS.chipMain}>
								<InputChip text={"Indian"} value={0} />
								<InputChip text={"Japanese"} value={1} />
								<InputChip text={"Mexican"} value={2} />
								<InputChip text={"Chinese"} value={3} />
								<InputChip text={"Thai"} value={4} />
								<InputChip text={"Greek"} value={5} />
							</div>
						</div>
						{/* Food Type */}
						<div className={pageS.recipeOption}>
							<h6>Meal Type</h6>
							<div className={pageS.chipMain}>
								<InputChip text={"Snack"} value={0} />
								<InputChip text={"Main Course"} value={1} />
								<InputChip text={"Soup"} value={2} />
								<InputChip text={"Dessert"} value={3} />
							</div>
						</div>
						{/* Floating Button */}
						<div className={pageS.generateRecipeBtn}>
							<DumpButton
								btnStyle={"generateRecipe"}
								text={"Generate Recipe"}
								onClick={() => handleCreateRecipe()}
								disable={false}
							/>
						</div>
					</div>
					{/* Output */}
					<div className={pageS.recipeGridOutput}>
						<h4>Recipes to choose from:</h4>
						{/* Chat Box */}
						<div className={pageS.aiRecipeMain}>
							<AIResponseOption text={"Butter-fly srimp"} value={1} />
							<AIResponseOption text={"Tacos"} value={2} />
							<AIResponseOption text={"Strumboli"} value={3} />
							<AIResponseOption text={"Kale Chips"} value={4} />
						</div>
						{/* User options */}
						<div className={pageS.userRecipeSelectMain}>
							<UserOutputOption text={"I want {value.1}"} value={1} />
							<UserOutputOption text={"I want {value.2}"} value={2} />
							<UserOutputOption text={"I want {value.3}"} value={3} />
							<UserOutputOption text={"I want {value.4}"} value={4} />
							<UserOutputOption text={"Give me new to choose from"} value={0} />
						</div>
					</div>
				</div>
				<OldTSX />
			</main>
		</>
	);
}
