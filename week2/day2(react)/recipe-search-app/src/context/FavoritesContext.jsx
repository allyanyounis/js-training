import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FavoritesContext = createContext();

// Creates a Context object through which components can access shared Favorites data.

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const addFavorite = (recipe) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (item) => item.idMeal === recipe.idMeal
      );

      if (alreadyFavorite) {
        return currentFavorites;
      }

      return [...currentFavorites, recipe];
      //Creates a new array containing all existing favorites plus the new recipe.


//       First: User adds Chicken Curry
// recipe = "Chicken Curry";
// currentFavorites = [];


// Here:
// - recipe is the new recipe the user wants to add.
// - currentFavorites is currently empty.
// After adding it:
// currentFavorites = ["Chicken Curry"];


// Chicken Curry is now a favorite.
// Second: User adds Beef Burger
// recipe = "Beef Burger";
// currentFavorites = ["Chicken Curry"];
    });
  };

  const removeFavorite = (recipeId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((recipe) => recipe.idMeal !== recipeId)
    );
  };

  const isFavorite = (recipeId) => {
    return favorites.some((recipe) => recipe.idMeal === recipeId);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export { FavoritesContext, FavoritesProvider };