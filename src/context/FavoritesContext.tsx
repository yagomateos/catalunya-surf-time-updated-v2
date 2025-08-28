import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const FAVORITES_KEY = 'surf-app-favorites';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (spotId: string) => void;
  removeFavorite: (spotId: string) => void;
  isFavorite: (spotId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error reading favorites from localStorage', error);
    }
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    try {
      setFavorites(newFavorites);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage', error);
    }
  };

  const addFavorite = (spotId: string) => {
    if (!favorites.includes(spotId)) {
      saveFavorites([...favorites, spotId]);
    }
  };

  const removeFavorite = (spotId: string) => {
    saveFavorites(favorites.filter((id) => id !== spotId));
  };

  const isFavorite = (spotId: string) => {
    return favorites.includes(spotId);
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
};
