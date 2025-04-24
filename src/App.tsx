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
    // Curry
    {
      name: 'Fancy Apple Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Fancy Apple': 7 },
      description: 'A special curry made from Fancy Apples!',
      icon: '🍛'
    },
    {
      name: 'Grilled Tail Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Slowpoke Tail': 8, 'Fiery Herb': 25 },
      description: 'A spicy and savory curry with Slowpoke Tail.',
      icon: '🍲'
    },
    {
      name: 'Solar Power Tomato Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Snoozy Tomato': 10, 'Fiery Herb': 5 },
      description: 'A curry full of flavor with Solar Power from Snoozy Tomatoes.',
      icon: '🍛'
    },
    {
      name: 'Dream Eater Butter Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Soft Potato': 18, 'Snoozy Tomato': 15, 'Soothing Cacao': 12, 'Moomoo Milk': 10 },
      description: 'A creamy and rich curry with a touch of Dream Eater flavor.',
      icon: '🍛'
    },
    {
      name: 'Spicy Leek Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Large Leek': 14, 'Warming Ginger': 10, 'Fiery Herb': 8 },
      description: 'A spicy curry made with Leeks and a touch of Ginger.',
      icon: '🍲'
    },
    {
      name: 'Spore Mushroom Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Tasty Mushroom': 14, 'Soft Potato': 9 },
      description: 'A hearty mushroom curry with soft potatoes.',
      icon: '🍛'
    },
    {
      name: 'Egg Bomb Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Honey': 12, 'Fancy Apple': 11, 'Fancy Egg': 8, 'Soft Potato': 4 },
      description: 'An explosive curry with eggs and apples.',
      icon: '🍛'
    },
    {
      name: 'Hearty Cheeseburger Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Moomoo Milk': 8, 'Bean Sausage': 8 },
      description: 'A cheeseburger-inspired curry that fills you up.',
      icon: '🍛'
    },
    {
      name: 'Soft Potato Chowder',
      dishType: 'Curry',
      requiredIngredients: { 'Moomoo Milk': 10, 'Soft Potato': 8, 'Tasty Mushroom': 4 },
      description: 'A creamy potato chowder with mushrooms.',
      icon: '🍛'
    },
    {
      name: 'Simple Chowder',
      dishType: 'Curry',
      requiredIngredients: { 'Moomoo Milk': 7 },
      description: 'A basic but comforting milk chowder.',
      icon: '🍛'
    },
    {
      name: 'Beanburger Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Bean Sausage': 7 },
      description: 'A simple curry made with bean sausages.',
      icon: '🍛'
    },
    {
      name: 'Mild Honey Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Honey': 7 },
      description: 'A sweet and mild honey-flavored curry.',
      icon: '🍛'
    },
    {
      name: 'Drought Katsu Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Bean Sausage': 10, 'Pure Oil': 5 },
      description: 'A katsu-style curry with bean sausage.',
      icon: '🍛'
    },
    {
      name: 'Melty Omelette Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Fancy Egg': 10, 'Snoozy Tomato': 6 },
      description: 'A curry with a melty omelette topping.',
      icon: '🍛'
    },
    {
      name: 'Bulk Up Bean Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Greengrass Soybeans': 12, 'Bean Sausage': 6, 'Fiery Herb': 4, 'Fancy Egg': 4 },
      description: 'A protein-packed curry to bulk you up.',
      icon: '🍛'
    },
    {
      name: 'Ninja Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Greengrass Soybeans': 24, 'Bean Sausage': 9, 'Large Leek': 12, 'Tasty Mushroom': 5 },
      description: 'A stealthy, powerful curry favored by ninjas.',
      icon: '🍛'
    },
    {
      name: 'Limber Corn Stew',
      dishType: 'Curry',
      requiredIngredients: { 'Greengrass Corn': 14, 'Moomoo Milk': 8, 'Soft Potato': 8 },
      description: 'A flexible corn stew that keeps you limber.',
      icon: '🍛'
    },
    {
      name: 'Inferno Corn Keema Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Fiery Herb': 27, 'Bean Sausage': 24, 'Greengrass Corn': 14, 'Warming Ginger': 12 },
      description: 'An extremely spicy corn and keema curry.',
      icon: '🍲'
    },
    {
      name: 'Dizzy Punch Spicy Curry',
      dishType: 'Curry',
      requiredIngredients: { 'Rousing Coffee': 11, 'Fiery Herb': 11, 'Honey': 11 },
      description: 'A curry that packs a punch with coffee and spice.',
      icon: '🍛'
    },
    {
      name: 'Hidden Power Perk-Up Stew',
      dishType: 'Curry',
      requiredIngredients: { 'Greengrass Soybeans': 28, 'Snoozy Tomato': 25, 'Tasty Mushroom': 23, 'Rousing Coffee': 16 },
      description: 'A stew that reveals your hidden potential.',
      icon: '🍛'
    },
    
    // Salads
    {
      name: 'Slowpoke Tail Pepper Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Slowpoke Tail': 10, 'Fiery Herb': 10, 'Pure Oil': 15 },
      description: 'A peppery salad featuring Slowpoke Tail.',
      icon: '🥗'
    },
    {
      name: 'Spore Mushroom Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Tasty Mushroom': 17, 'Snoozy Tomato': 8, 'Pure Oil': 8 },
      description: 'A salad with spore-bearing mushrooms.',
      icon: '🥗'
    },
    {
      name: 'Snow Cloak Caesar Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Moomoo Milk': 10, 'Bean Sausage': 6 },
      description: 'A Caesar salad with a snowy milk dressing.',
      icon: '🥗'
    },
    {
      name: 'Gluttony Potato Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Soft Potato': 14, 'Fancy Egg': 9, 'Bean Sausage': 7, 'Fancy Apple': 6 },
      description: 'A potato salad that satisfies even the biggest appetites.',
      icon: '🥗'
    },
    {
      name: 'Water Veil Tofu Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Greengrass Soybeans': 15, 'Snoozy Tomato': 9 },
      description: 'A refreshing tofu salad with a water veil.',
      icon: '🥗'
    },
    {
      name: 'Superpower Extreme Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Bean Sausage': 9, 'Warming Ginger': 6, 'Fancy Egg': 5, 'Soft Potato': 3 },
      description: 'A salad that gives you extreme superpowers.',
      icon: '🥗'
    },
    {
      name: 'Bean Ham Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Bean Sausage': 8 },
      description: 'A simple salad with bean ham.',
      icon: '🥗'
    },
    {
      name: 'Snoozy Tomato Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Snoozy Tomato': 8 },
      description: 'A salad made with snoozy tomatoes.',
      icon: '🥗'
    },
    {
      name: 'Moomoo Caprese Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Moomoo Milk': 12, 'Snoozy Tomato': 6, 'Pure Oil': 5 },
      description: 'A caprese salad with moomoo milk.',
      icon: '🥗'
    },
    {
      name: 'Contrary Chocolate Meat Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Soothing Cacao': 14, 'Bean Sausage': 9 },
      description: 'A contrary combination of chocolate and meat.',
      icon: '🥗'
    },
    {
      name: 'Overheat Ginger Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Fiery Herb': 17, 'Warming Ginger': 10, 'Snoozy Tomato': 8 },
      description: 'A salad that might make you overheat!',
      icon: '🥗'
    },
    {
      name: 'Fancy Apple Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Fancy Apple': 8 },
      description: 'A simple salad made with fancy apples.',
      icon: '🥗'
    },
    {
      name: 'Immunity Leek Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Large Leek': 10, 'Warming Ginger': 5 },
      description: 'A salad that boosts your immunity.',
      icon: '🥗'
    },
    {
      name: 'Dazzling Apple Cheese Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Fancy Apple': 15, 'Moomoo Milk': 5, 'Pure Oil': 3 },
      description: 'A dazzling salad with apples and cheese.',
      icon: '🥗'
    },
    {
      name: 'Ninja Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Large Leek': 15, 'Greengrass Soybeans': 19, 'Tasty Mushroom': 12, 'Warming Ginger': 11 },
      description: 'A salad favored by stealthy ninjas.',
      icon: '🥗'
    },
    {
      name: 'Heat Wave Tofu Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Greengrass Soybeans': 10, 'Fiery Herb': 6 },
      description: 'A tofu salad that brings the heat.',
      icon: '🥗'
    },
    {
      name: 'Greengrass Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Pure Oil': 22, 'Greengrass Corn': 17, 'Snoozy Tomato': 14, 'Soft Potato': 9 },
      description: 'A salad made with fresh Greengrass ingredients.',
      icon: '🥗'
    },
    {
      name: 'Calm Mind Fruit Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Fancy Apple': 21, 'Honey': 16, 'Greengrass Corn': 12 },
      description: 'A fruit salad that calms your mind.',
      icon: '🥗'
    },
    {
      name: 'Fury Attack Corn Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Greengrass Corn': 9, 'Pure Oil': 8 },
      description: 'A corn salad that fuels your fury attacks.',
      icon: '🥗'
    },
    {
      name: 'Cross Chop Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Fancy Egg': 20, 'Bean Sausage': 15, 'Greengrass Corn': 11, 'Snoozy Tomato': 10 },
      description: 'A salad that helps you cross chop your opponents.',
      icon: '🥗'
    },
    {
      name: 'Defiant Coffee-Dressed Salad',
      dishType: 'Salad',
      requiredIngredients: { 'Rousing Coffee': 28, 'Bean Sausage': 28, 'Pure Oil': 22, 'Soft Potato': 22 },
      description: 'A defiant salad with coffee dressing.',
      icon: '🥗'
    },
    
    // Desserts
    {
      name: 'Fluffy Sweet Potatoes',
      dishType: 'Dessert',
      requiredIngredients: { 'Soft Potato': 9, 'Moomoo Milk': 5 },
      description: 'Fluffy sweet potatoes in creamy milk.',
      icon: '🍨'
    },
    {
      name: 'Steadfast Ginger Cookies',
      dishType: 'Dessert',
      requiredIngredients: { 'Honey': 14, 'Warming Ginger': 12, 'Soothing Cacao': 5, 'Fancy Egg': 4 },
      description: 'Cookies that make you steadfast with ginger.',
      icon: '🍪'
    },
    {
      name: 'Fancy Apple Juice',
      dishType: 'Dessert',
      requiredIngredients: { 'Fancy Apple': 8 },
      description: 'Juice made from fancy apples.',
      icon: '🧃'
    },
    {
      name: 'Craft Soda Pop',
      dishType: 'Dessert',
      requiredIngredients: { 'Honey': 9 },
      description: 'A craft soda pop sweetened with honey.',
      icon: '🥤'
    },
    {
      name: 'Ember Ginger Tea',
      dishType: 'Dessert',
      requiredIngredients: { 'Warming Ginger': 9, 'Fancy Apple': 7 },
      description: 'A warming tea with ember-like ginger.',
      icon: '🍵'
    },
    {
      name: "Jigglypuff's Fruity Flan",
      dishType: 'Dessert',
      requiredIngredients: { 'Honey': 20, 'Fancy Egg': 15, 'Moomoo Milk': 10, 'Fancy Apple': 10 },
      description: "Jigglypuff's signature fruity flan dessert.",
      icon: '🍮'
    },
    {
      name: 'Lovely Kiss Smoothie',
      dishType: 'Dessert',
      requiredIngredients: { 'Fancy Apple': 11, 'Moomoo Milk': 9, 'Honey': 7, 'Soothing Cacao': 8 },
      description: 'A smoothie so good it feels like a lovely kiss.',
      icon: '🥤'
    },
    {
      name: 'Lucky Chant Apple Pie',
      dishType: 'Dessert',
      requiredIngredients: { 'Fancy Apple': 12, 'Moomoo Milk': 4 },
      description: 'An apple pie that brings good luck.',
      icon: '🥧'
    },
    {
      name: "Neroli's Restorative Tea",
      dishType: 'Dessert',
      requiredIngredients: { 'Warming Ginger': 11, 'Fancy Apple': 15, 'Tasty Mushroom': 9 },
      description: "Neroli's special tea that restores your energy.",
      icon: '🍵'
    },
    {
      name: 'Sweet Scent Chocolate Cake',
      dishType: 'Dessert',
      requiredIngredients: { 'Honey': 9, 'Soothing Cacao': 8, 'Moomoo Milk': 7 },
      description: 'A chocolate cake with a sweet scent.',
      icon: '🍰'
    },
    {
      name: 'Warm Moomoo Milk',
      dishType: 'Dessert',
      requiredIngredients: { 'Moomoo Milk': 7 },
      description: 'Simple warm moomoo milk.',
      icon: '🥛'
    },
    {
      name: 'Cloud Nine Soy Cake',
      dishType: 'Dessert',
      requiredIngredients: { 'Fancy Egg': 8, 'Greengrass Soybeans': 7 },
      description: 'A soy cake that puts you on cloud nine.',
      icon: '🍰'
    },
    {
      name: 'Hustle Protein Smoothie',
      dishType: 'Dessert',
      requiredIngredients: { 'Greengrass Soybeans': 15, 'Soothing Cacao': 8 },
      description: 'A protein-packed smoothie for hustling.',
      icon: '🥤'
    },
    {
      name: 'Stalwart Vegetable Juice',
      dishType: 'Dessert',
      requiredIngredients: { 'Snoozy Tomato': 9, 'Fancy Apple': 7 },
      description: 'A vegetable juice that makes you stalwart.',
      icon: '🧃'
    },
    {
      name: 'Big Malasada',
      dishType: 'Dessert',
      requiredIngredients: { 'Pure Oil': 10, 'Moomoo Milk': 7, 'Honey': 6 },
      description: 'A big, delicious malasada donut.',
      icon: '🍩'
    },
    {
      name: 'Huge Power Soy Donuts',
      dishType: 'Dessert',
      requiredIngredients: { 'Pure Oil': 12, 'Greengrass Soybeans': 16, 'Soothing Cacao': 7 },
      description: 'Donuts that give you huge power.',
      icon: '🍩'
    },
    {
      name: 'Explosion Popcorn',
      dishType: 'Dessert',
      requiredIngredients: { 'Greengrass Corn': 15, 'Pure Oil': 14, 'Moomoo Milk': 7 },
      description: 'Popcorn that explodes with flavor.',
      icon: '🍿'
    },
    {
      name: 'Teatime Corn Scones',
      dishType: 'Dessert',
      requiredIngredients: { 'Fancy Apple': 20, 'Warming Ginger': 20, 'Greengrass Corn': 18, 'Moomoo Milk': 9 },
      description: 'Perfect scones for teatime.',
      icon: '🥮'
    },
    {
      name: 'Petal Dance Chocolate Tart',
      dishType: 'Dessert',
      requiredIngredients: { 'Fancy Apple': 11, 'Soothing Cacao': 11 },
      description: 'A chocolate tart that makes you want to dance.',
      icon: '🍫'
    },
    {
      name: 'Flower Gift Macarons',
      dishType: 'Dessert',
      requiredIngredients: { 'Soothing Cacao': 25, 'Fancy Egg': 25, 'Honey': 17, 'Moomoo Milk': 10 },
      description: 'Delicate macarons that are like a flower gift.',
      icon: '🧁'
    },
    {
      name: 'Early Bird Coffee Jelly',
      dishType: 'Dessert',
      requiredIngredients: { 'Rousing Coffee': 16, 'Moomoo Milk': 14, 'Honey': 12 },
      description: 'Coffee jelly for early birds.',
      icon: '☕'
    },
    {
      name: 'Zing Zap Spiced Cola',
      dishType: 'Dessert',
      requiredIngredients: { 'Fancy Apple': 35, 'Warming Ginger': 20, 'Large Leek': 20, 'Rousing Coffee': 12 },
      description: 'A spiced cola with zing zap energy.',
      icon: '🥤'
    },
    {
      name: 'Mold Breaker Corn Tiramisu',
      dishType: 'Dessert',
      requiredIngredients: { 'Rousing Coffee': 14, 'Greengrass Corn': 14, 'Moomoo Milk': 12 },
      description: 'A tiramisu that breaks the mold with corn.',
      icon: '🍰'
    },
    {
      name: 'Clodsire Eclair',
      dishType: 'Dessert',
      requiredIngredients: { 'Soothing Cacao': 30, 'Moomoo Milk': 26, 'Rousing Coffee': 24, 'Honey': 22 },
      description: 'A rich eclair inspired by Clodsire.',
      icon: '🧁'
    }
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
