import React, { createContext, useState, useEffect } from "react";

export const BackgroundContext = createContext();

export const BackgroundContextProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  const API_URL = import.meta.env.VITE_BASE_GAMES_URL;
  const ADD_GAME_URL = import.meta.env.VITE_ADD_GAME_URL;

  // ✅ Fetch Games Function (reuse ke liye alag banaya)
  const fetchGames = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.status === 1 && Array.isArray(result.data)) {
        const formattedGames = result.data.map((game) => ({
          id: game.game_id,
          name: game.game_name,
          redirectUrl: game.redirect_url,
          code: game.game_code,
          isActive: game.is_active === 1,
        }));

        setGames(formattedGames);
      } else {
        setGames([]);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  // ✅ First Load
  useEffect(() => {
    fetchGames();
  }, [API_URL]);

  // ✅ ADD GAME API
const addGame = async (formData) => {
  try {
    const payload = {
      game_name: formData.name,
      redirect_url: formData.redirectUrl,
      backend_url: formData.backendUrl,
      game_code: formData.code,
    };

    const response = await fetch(import.meta.env.VITE_ADD_GAME_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.status === 1) {
      await fetchGames(); // ✅ refresh
      return true;
    } else {
      alert(result.message || "Failed to add game");
      return false;
    }
  } catch (error) {
    console.error("Add Game Error:", error);
    return false;
  }
};

  return (
    <BackgroundContext.Provider value={{ games, setGames, addGame }}>
      {children}
    </BackgroundContext.Provider>
  );
};