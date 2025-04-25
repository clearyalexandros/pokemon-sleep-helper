import { useState } from 'react';
import { recipes } from './recipes';
import type { Recipe, Ingredient } from './types';

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
    { name: 'Large Leek', icon: '🌿', quantity: 0 },
    { name: 'Tasty Mushroom', icon: '🍄‍🟫', quantity: 0 },
    { name: 'Fancy Egg', icon: '🥚', quantity: 0 },
    { name: 'Bean Sausage', icon: '🌭', quantity: 0 },
    { name: 'Pure Oil', icon: '🛢️', quantity: 0 },
    { name: 'Soothing Cacao', icon: '🍫', quantity: 0 },
  ]);

  const [recipeMatches, setRecipeMatches] = useState<Recipe[]>([]);
  const [almostRecipes, setAlmostRecipes] = useState<{ 
    recipe: Recipe; 
    missing: string[];
    missingDetails: {
      name: string;
      needed: number;
      have: number;
      missing: number;
    }[] 
  }[]>([]);
  const [filter, setFilter] = useState<'All' | 'Curry' | 'Salad' | 'Dessert'>('All');

  const adjustIngredientQuantity = (ingredientName: string, amount: number) => {
    setInventory(prevInventory => {
      const updatedInventory = prevInventory.map(ingredient =>
        ingredient.name === ingredientName
          ? { ...ingredient, quantity: Math.max(0, ingredient.quantity + amount) }
          : ingredient
      );
      findBestRecipe(updatedInventory);
      return updatedInventory;
    });
  };

  const resetAllQuantities = () => {
    const resetInventory = inventory.map(ingredient => ({ ...ingredient, quantity: 0 }));
    setInventory(resetInventory);
    setRecipeMatches([]);
    setAlmostRecipes([]);
  };

  const getMissingIngredients = (recipe: Recipe, inv: Ingredient[] = inventory) => {
    return Object.entries(recipe.requiredIngredients)
      .map(([name, needed]) => {
        const have = inv.find(i => i.name === name)?.quantity || 0;
        return {
          name,
          needed,
          have,
          missing: Math.max(0, needed - have)
        };
      })
      .filter(ing => ing.missing > 0);
  };

  const findBestRecipe = (inv: Ingredient[] = inventory) => {
    const recipeSuggestions = recipes.map(recipe => {
      const missingIngredients = getMissingIngredients(recipe, inv);
      return {
        recipe,
        missing: missingIngredients.map(ing => ing.name),
        missingDetails: missingIngredients
      };
    });

    const matchedRecipes = recipeSuggestions
      .filter(suggestion => suggestion.missing.length === 0)
      .map(suggestion => suggestion.recipe);

    const almostMatches = recipeSuggestions
      .filter(suggestion => suggestion.missing.length > 0)
      .slice(0, 5);

    setRecipeMatches(matchedRecipes);
    setAlmostRecipes(almostMatches);
  };

  const filteredRecipes = filter === 'All'
    ? recipes
    : recipes.filter(r => r.dishType === filter);

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <header className="bg-red-600 text-white py-6 shadow-lg w-full">
        <div className="container mx-auto flex items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-pokemon">
            Pokémon Sleep Recipe Helper
          </h1>
          <span className="ml-4 text-3xl">🍛🥗🍨</span>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Ingredients</h2>
            <button
              onClick={resetAllQuantities}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Reset All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {inventory.map(ingredient => (
              <div key={ingredient.name} className="flex items-center bg-gray-100 p-3 rounded-lg">
                <span className="text-2xl mr-3">{ingredient.icon}</span>
                <span className="flex-grow font-medium">{ingredient.name}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => adjustIngredientQuantity(ingredient.name, -1)}
                    className="bg-red-400 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
                  >-</button>
                  <span className="mx-3 w-8 text-center">{ingredient.quantity}</span>
                  <button
                    onClick={() => adjustIngredientQuantity(ingredient.name, 1)}
                    className="bg-green-400 hover:bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
                  >+</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            {['All', 'Curry', 'Salad', 'Dessert'].map(type => (
              <button
                key={type}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setFilter(type as any)}
                className={`px-4 py-2 rounded-lg transition duration-200 ${
                  filter === type
                    ? type === 'Curry' ? 'bg-red-500 text-white'
                    : type === 'Salad' ? 'bg-green-500 text-white'
                    : type === 'Dessert' ? 'bg-purple-500 text-white'
                    : 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {type === 'Curry' && '🍛 '}
                {type === 'Salad' && '🥗 '}
                {type === 'Dessert' && '🍨 '}
                {type} Recipes
              </button>
            ))}
          </div>
        </section>

        {recipeMatches.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold mb-4">You Can Make These Recipes!</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipeMatches.map(recipe => (
                <div
                  key={recipe.name}
                  className="bg-green-50 border-l-4 border-green-400 p-4 rounded shadow"
                >
                  <h4 className="text-xl font-bold mb-1">{recipe.icon} {recipe.name}</h4>
                  <p className="text-gray-700 mb-2">{recipe.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(recipe.requiredIngredients).map(([name, quantity]) => {
                      const have = inventory.find(i => i.name === name)?.quantity || 0;
                      return (
                        <span
                          key={name}
                          className="px-2 py-1 rounded bg-green-100 text-green-800 text-sm"
                        >
                          {name}: {have}/{quantity}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {almostRecipes.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Almost Makeable Recipes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {almostRecipes.map(({ recipe, missingDetails }) => (
                <div key={recipe.name} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <div className="flex items-start">
                    <span className="text-3xl mr-3">{recipe.icon}</span>
                    <div>
                      <h4 className="font-bold text-lg">{recipe.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{recipe.description}</p>
                      <div className="text-sm">
                        <p className="text-red-500 font-medium">
                          Missing {missingDetails.length} ingredient(s):
                        </p>
                        <ul className="list-disc pl-5">
                          {missingDetails.map(({ name, needed, have }) => (
                            <li key={name}>
                              {name}: Need {needed} (have {have})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-4">All Recipes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRecipes.map(recipe => {
              const missingIngredients = getMissingIngredients(recipe);
              const hasAllIngredients = missingIngredients.length === 0;

              return (
                <div
                  key={recipe.name}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                  onClick={() => {
                    findBestRecipe();
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start mb-2">
                      <span className="text-3xl mr-3">{recipe.icon}</span>
                      <div>
                        <h4 className="font-bold">{recipe.name}</h4>
                        <p className="text-sm text-gray-600">{recipe.dishType}</p>
                      </div>
                    </div>
                    <div className="mt-auto pt-2">
                      {hasAllIngredients ? (
                        <p className="text-xs text-green-500 font-medium">
                          ✓ You have all ingredients!
                        </p>
                      ) : (
                        <>
                          <p className="text-xs font-medium mb-1">
                            <span className="text-red-500">
                              Missing {missingIngredients.length} ingredient(s)
                            </span>
                            <span className="text-gray-400 ml-1">
                              ({Object.keys(recipe.requiredIngredients).length - missingIngredients.length}/
                              {Object.keys(recipe.requiredIngredients).length})
                            </span>
                          </p>
                          <ul className="text-xs space-y-1">
                            {missingIngredients.map(({ name, missing }) => (
                              <li key={name} className="flex justify-between">
                                <span>{name}:</span>
                                <span className="text-red-500">{missing} more needed</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
