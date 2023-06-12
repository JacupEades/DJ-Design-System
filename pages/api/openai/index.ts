import {
	Configuration,
	CreateChatCompletionRequest,
	CreateCompletionRequest,
	OpenAIApi,
} from "openai";
import { RecipeRequest } from "@/data/recipe-request/recipe-request.model";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
	organization: "org-c42BjxE43kbiMzwCgKpAAp7w",
	apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

const config: CreateCompletionRequest = {
	model: "text-davinci-003",
	prompt: "Hello!",
	max_tokens: 1000,
	temperature: 0.7,
	top_p: 1,
	presence_penalty: 0,
	frequency_penalty: 0,
	n: 1,
	stream: false,
	stop: ["/n"],
};

const chatConfig: CreateChatCompletionRequest = {
	model: "gpt-3.5-turbo",
	messages: [{ role: "user", content: "Hello" }],
	max_tokens: 1000,
	temperature: 0.9,
	stream: false,
	stop: ["/n"],
};

const generatePrompt = (req: RecipeRequest) => {
	const { ingredients, profile, recipeParams } = req;
	let prompt = `Pretend you are a ${profile.experienceLevel} level chef on a cooking game show.`;
	prompt += `You are challenged to create a ${recipeParams.mealType} recipe that serves ${recipeParams.numberOfServings} people.`;
	prompt += `You have ${recipeParams.maxDuration} to cook.`;
	if (recipeParams.childFriendly) {
		prompt += `The recipe should be child friendly.`;
	}
	prompt += `You are limited to any subset of the following ingredients: ${ingredients
		.map((ingredient) =>
			ingredient.status === "freezer"
				? "frozen " + ingredient.name
				: ingredient.name
		)
		.join(
			", "
		)}. Assume that the following spices and flavorings are available: salt, pepper, ${profile.spiceCabinet.join(
		", "
	)}. You may not use any unlisted ingredients.`;
	if (profile.nutrientPreferences.length > 0) {
		prompt += `The following nutrient preferences should be considered when choosing the ingredients to work with: ${profile.nutrientPreferences.join(
			", "
		)}.`;
	}
	prompt += `You have the following kitchen equipment to work with: ${profile.cookingEquipment.join(
		", "
	)}.`;
	prompt += `The judge you are cooking for likes the following cuisines: ${profile.favoriteCuisines.join(
		", "
	)}.`;
	prompt += `The recipe can ${recipeParams.spicy ? "be" : "not be"} spicy.`;
	prompt += `The format of the recipe should be as follows:
  1. Title
  2. Ingredients
  3. Spices and flavorings
  4. Instructions`;
	console.log(prompt);
	return prompt;
};

export const generateRecipe = async (req: RecipeRequest) => {
	const prompt = generatePrompt(req);

	try {
		const response = await openai.createChatCompletion({
			...chatConfig,
			messages: [{ role: "user", content: prompt }],
		});
		console.log("OpenAI API response:", response);
		return response.data;
	} catch (error) {
		console.error("Error calling OpenAI API:", error);
		throw error;
	}
};
