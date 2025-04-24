import { useState } from 'react';

// Define the possible ingredients with emoji icons and quantity
type Ingredient = {
  name: string; // generic name to match ingredients
  icon: string;
  quantity: number; // Store the quantity of the ingredient
};

// Recipe interface with the number of ingredients needed (and specific quantities)
interface Recipe {
  name: string;
  dishType: 'Curry' | 'Salad' | 'Dessert';
  requiredIngredients: { [key: string]: number }; // specific ingredients and their quantities required
  description: string;
  icon: string; // icon for the recipe
}

const App = () => {
  const [inventory, setInventory] = useState<Ingredient[]>([
    { name: 'Fancy Apple', icon: '🍏', quantity: 0 },
    { name: 'Soft Potato', icon: '🥔', quantity: 0 },
    { name: 'Snoozy Tomato', icon: '🍅', quantity: 0 },
    { name: 'Honey', icon: '🍯', quantity: 0 },
    { name: 'Fiery Herb', icon: '🌶️', quantity: 0 },
    { name: 'Moomoo Milk', icon: '🥛', quantity: 0 },
    { name: 'Warming Ginger', icon: '🍠', quantity: 0 },
    { name: 'Slowpoke Tail', icon: '🐌', quantity: 0 },
    { name: 'Greengrass Soybeans', icon: '🌱', quantity: 0 },
    { name: 'Greengrass Corn', icon: '🌽', quantity: 0 },
    { name: 'Rousing Coffee', icon: '☕', quantity: 0 },
    // Add more ingredients as needed...
  ]);

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [almostRecipes, setAlmostRecipes] = useState<Recipe[]>([]); // for almost-makeable suggestions

  // Sample recipes from the new ingredient set
  const recipes: Recipe[] = [
    {
      name: 'Fancy Apple Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Fancy Apple': 7 },
      description: 'A special curry made from Fancy Apples!',
      icon: '🍛',
    },
    {
      name: 'Grilled Tail Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Slowpoke Tail': 8, 'Fiery Herb': 25 },
      description: 'A spicy and savory curry with Slowpoke Tail.',
      icon: '🍲',
    },
    {
      name: 'Solar Power Tomato Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Snoozy Tomato': 10, 'Fiery Herb': 5 },
      description: 'A curry full of flavor with Solar Power from Snoozy Tomatoes.',
      icon: '🍛',
    },
    {
      name: 'Dream Eater Butter Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Soft Potato': 18, 'Snoozy Tomato': 15, 'Soothing Cacao': 12, 'Moomoo Milk': 10 },
      description: 'A creamy and rich curry with a touch of Dream Eater flavor.',
      icon: '🍛',
    },
    {
      name: 'Spicy Leek Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Large Leek': 14, 'Warming Ginger': 10, 'Fiery Herb': 8 },
      description: 'A spicy curry made with Leeks and a touch of Ginger.',
      icon: '🍲',
    },
    {
      name: 'Bean Sausage Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Bean Sausage': 20, 'Greengrass Soybeans': 10 },
      description: 'A hearty curry made with bean sausage and soybeans.',
      icon: '🍛',
    },
    {
      name: 'Spicy Leek and Corn Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Large Leek': 5, 'Greengrass Corn': 7 },
      description: 'A refreshing salad made with Leeks and sweet Corn.',
      icon: '🥗',
    },
    {
      name: 'Honeyed Cacao Dessert',
      dishType: 'Dessert',
      requiredIngredients: { 'Honey': 5, 'Soothing Cacao': 7 },
      description: 'A sweet dessert with Honey and Cacao.',
      icon: '🍨',
    },
    {
      name: 'Rousing Coffee Drink',
      dishType: 'Dessert',
      requiredIngredients: { 'Rousing Coffee': 10, 'Honey': 3 },
      description: 'A strong and sweet coffee drink.',
      icon: '☕',
    },
    // Add more recipes as needed...
  ];

  // Function to adjust ingredient quantities and suggest a recipe automatically
  const adjustIngredientQuantity = (ingredientName: string, amount: number) => {
    setInventory((prevInventory) => {
      const updatedInventory = prevInventory.map((ingredient) =>
        ingredient.name === ingredientName
          ? { ...ingredient, quantity: Math.max(0, ingredient.quantity + amount) } // Prevent negative quantities
          : ingredient
      );

      // Automatically suggest recipes after adjusting the quantity
      findBestRecipe(updatedInventory);

      return updatedInventory;
    });
  };

  // Function to find the best matching recipe
  const findBestRecipe = (updatedInventory: Ingredient[]) => {
    // Find the best match recipe
    const matchedRecipe = recipes.find(recipe =>
      Object.entries(recipe.requiredIngredients).every(
        ([ingredientName, quantity]) =>
          updatedInventory.some(item => item.name === ingredientName && item.quantity >= quantity)
      )
    );

    // Find almost-makeable recipes (recipes that miss only 1 ingredient or are close)
    const almostMatches = recipes.filter(recipe => {
      const matchedCount = Object.entries(recipe.requiredIngredients).filter(([ingredientName, quantity]) =>
        updatedInventory.some(item => item.name === ingredientName && item.quantity >= quantity)
      ).length;
      return matchedCount === Object.keys(recipe.requiredIngredients).length - 1;
    });

    setRecipe(matchedRecipe || null);
    setAlmostRecipes(almostMatches);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Pokémon Sleep Recipe Helper</h1>
      
      <div className="mb-4">
        <h2 className="text-xl">Select Ingredients and Quantities:</h2>
        <div className="flex flex-wrap mt-2">
          {inventory.map((ingredient) => (
            <div key={ingredient.name} className="flex items-center space-x-4 mt-2 mr-4">
              <span>{ingredient.icon} {ingredient.name}</span>
              <button
                onClick={() => adjustIngredientQuantity(ingredient.name, 1)}
                className="bg-green-300 px-2 py-1 rounded"
              >
                +
              </button>
              <span>{ingredient.quantity}</span>
              <button
                onClick={() => adjustIngredientQuantity(ingredient.name, -1)}
                className="bg-red-300 px-2 py-1 rounded"
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>

      {recipe && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">{recipe.icon} {recipe.name} - {recipe.dishType}</h3>
          <p>{recipe.description}</p>
        </div>
      )}

      {!recipe && inventory.some(item => item.quantity > 0) && (
        <p className="mt-4 text-gray-600">No recipe found with your ingredients.</p>
      )}

      {almostRecipes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Almost Makeable Recipes:</h3>
          <ul>
            {almostRecipes.map((recipe) => (
              <li key={recipe.name} className="mt-2">
                <span>{recipe.icon} {recipe.name} - {recipe.dishType}</span>
                <p>{recipe.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
