import { NextApiRequest, NextApiResponse } from "next";
import { generateRecipe } from "./openai";

export default async function generateRecipeAPI(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const requestBody = req.body;

	if (
		!requestBody.ingredients ||
		!requestBody.profile ||
		!requestBody.recipeParams
	) {
		res.status(400).json({ error: "Missing ingredients and profile" });
	} else {
		try {
			const recipe = await generateRecipe({
				ingredients: requestBody.ingredients,
				profile: requestBody.profile,
				recipeParams: requestBody.recipeParams,
			});
			console.log("Recipe generated:", recipe);
			res.status(200).json({ recipe });
		} catch (error) {
			res.status(500).json({ error: "Error generating recipe" });
		}
	}
}
