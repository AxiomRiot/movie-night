export interface RecipeType {
  id: string;
  title: string;
  description: string;
  servings: number;
  prep: DurationType;
  cook: DurationType;
  total: DurationType;
  ingredients: string[];
  steps: string[];
  image: string;
};

export interface DurationType {
  days: number;
  hours: number;
  minutes: number;
}

export interface PatchType {
  patch: string;
  value: string;
}

export interface RecipeSummaryType {
  title: string;
  description: string;
  rating: number;
  image: string;
}

export interface RecipeSummaryList {
  recipeList: RecipeSummaryType[];
  total: number;
}
