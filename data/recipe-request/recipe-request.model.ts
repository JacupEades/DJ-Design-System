/**
 * Profile Model
 * This is a model for the profile of a user.
 * dietary restrictions.
 * cooking preferences.
 * cooking equipment.
 * favorite meals.
 * favorite desserts.
 * favorite spices.
 * favorite cuisine.
 */

export interface Ingredient {
  name:     string;
  location: string;
  status:   string;
}

export interface RecipeRequest {
  ingredients: Ingredient[];
  profile: Profile;
  recipeParams: RecipeParams;
}

export interface RecipeParams {
  mealType: MealType;
  maxDuration: Duration;
  numberOfServings: number;
  childFriendly: boolean;
  spicy: boolean;
}

export interface Profile {
  spiceCabinet:        string[];
  favoriteCuisines:    Cuisine[];
  nutrientPreferences: NutrientPreference[];
  experienceLevel:     ExperienceLevel;
  cookingEquipment:    CookingEquipment[];
}

export type MealType = 'dinner' | 'dessert' | 'snack' | 'drink' | 'sauce' | 'soup' | 'salad' | 'baked good';

export type Duration = 'less than 5 minutes' | '5 to 15 minutes' | '15 to 30 minutes' | '30 to 60 minutes' | 'more than 60 minutes';

export type Cuisine = 'American' | 'Italian' | 'Mexican' | 'Chinese' | 'Japanese' | 'Korean' | 'Vietnamese' | 'Thai' | 'Indian' | 'British' | 'French' | 'Greek' | 'Mediterranean' | 'Spanish' | 'Middle Eastern' | 'Caribbean' | 'Latin American' | 'African' | 'Other';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type NutrientPreference = 'low carb' | 'low fat' | 'low sodium' | 'low sugar' | 'high protein' | 'high fiber' | 'high iron' | 'high potassium' | 'high calcium' | 'high vitamin A' | 'high vitamin C';

export type CookingEquipment = 'instant pot' | 'air fryer' | 'slow cooker' | 'grill' | 'oven' | 'stove top' | 'microwave' | 'toaster oven' | 'blender' | 'food processor' | 'stand mixer' | 'hand mixer' | 'immersion blender' | 'waffle maker' | 'panini press' | 'rice cooker' | 'bread maker' | 'deep fryer' | 'steamer' | 'sous vide';
