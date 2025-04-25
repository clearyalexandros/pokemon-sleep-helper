// Define the possible ingredients with emoji icons and quantity
export type Ingredient = {
    name: string; // generic name to match ingredients
    icon: string;
    quantity: number; // Store the quantity of the ingredient
  };
  
  // Recipe interface with the number of ingredients needed (and specific quantities)
  export interface Recipe {
    name: string;
    dishType: 'Curry' | 'Salad' | 'Dessert';
    requiredIngredients: { [key: string]: number }; // specific ingredients and their quantities required
    description: string;
    icon: string; // icon for the recipe
  }