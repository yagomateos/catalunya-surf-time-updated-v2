import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { auth, db } from '@/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from '@/components/ui/use-toast';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (spotId: string) => void;
  removeFavorite: (spotId: string) => void;
  isFavorite: (spotId: string) => boolean;
  loading: boolean;
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (currentUser) {
        const userFavoritesRef = doc(db, 'favorites', currentUser.uid);
        try {
          const docSnap = await getDoc(userFavoritesRef);
          const firestoreFavorites = docSnap.exists() ? docSnap.data().spotIds : [];
          setFavorites(firestoreFavorites);
        } catch (error) {
          console.error("Error fetching Firestore favorites:", error);
          toast({ title: "Error al cargar favoritos", description: (error as Error).message, variant: "destructive" });
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addFavorite = useCallback(async (spotId: string) => {
    if (!user || favorites.includes(spotId)) return;

    const oldFavorites = [...favorites];
    const newFavorites = [...favorites, spotId];
    setFavorites(newFavorites); // Optimistic update

    try {
      await setDoc(doc(db, 'favorites', user.uid), { spotIds: newFavorites });
    } catch (error) {
      console.error("Failed to add favorite to Firestore:", error);
      toast({ 
        title: "Error al guardar favorito", 
        description: "No se pudo guardar el cambio. Revisa tus reglas de seguridad de Firestore.", 
        variant: "destructive" 
      });
      setFavorites(oldFavorites); // Revert UI on error
    }
  }, [user, favorites, db]);

  const removeFavorite = useCallback(async (spotId: string) => {
    if (!user) return;

    const oldFavorites = [...favorites];
    const newFavorites = favorites.filter((id) => id !== spotId);
    setFavorites(newFavorites); // Optimistic update

    try {
      await setDoc(doc(db, 'favorites', user.uid), { spotIds: newFavorites });
    } catch (error) {
      console.error("Failed to remove favorite from Firestore:", error);
      toast({ 
        title: "Error al guardar favorito", 
        description: "No se pudo guardar el cambio. Revisa tus reglas de seguridad de Firestore.", 
        variant: "destructive" 
      });
      setFavorites(oldFavorites); // Revert UI on error
    }
  }, [user, favorites, db]);

  const isFavorite = useCallback((spotId: string) => {
    return favorites.includes(spotId);
  }, [favorites]);

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    loading,
    user,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};