import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const BackgroundContext = createContext();

export const BackgroundContextProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [token , setToken] = useState(null)
  const [lobbyGames, setLobbyGames] = useState(null)
const [statements, setStatements] = useState([]);
const [statementLoading, setStatementLoading] = useState(false);

const API_URL = `${import.meta.env.VITE_BASE_GAMES_URL}/game/lobby/v1/`;
useEffect(() => {
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    setToken(savedToken);
  }
}, []);
  // ✅ Fetch Games Function (reuse ke liye alag banaya)
const fetchGames = async () => {
  try {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      console.error("❌ No token found");
      return;
    }

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedToken}`,
      },
    });

    const result = await response.json();

    // ✅ Sirf log karo
    console.log("🎮 Games API Response:", result);
    setLobbyGames(result?.data)

  } catch (error) {
    console.error("❌ Error fetching games:", error);
  }
};

useEffect(() => {
  fetchGames();
}, [API_URL]);
useEffect(() => {
  if (token) {
    fetchGames();
  }
}, [token]);

const STATEMENT_API = `${import.meta.env.VITE_BASE_GAMES_URL}/player/txn`;


const fetchStatements = async () => {
  try {
    setStatementLoading(true);

    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      console.error("❌ No token found for statements");
      return;
    }

    const res = await fetch(STATEMENT_API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${savedToken}`,
      },
    });

    const data = await res.json();

    if (data.status === 1) {
      setStatements(data.data);
      console.log("📊 Statements:", data.data);
    } else {
      console.error("❌ Failed to fetch statements");
    }
  } catch (error) {
    console.error("❌ Statement API Error:", error);
  } finally {
    setStatementLoading(false);
  }
};
useEffect(() => {
  if (token) {
    fetchStatements();
  }
}, [token]);

  return (
    <BackgroundContext.Provider value={{ games, setGames ,token , setToken,lobbyGames,
    statements,
    statementLoading,
    fetchStatements,}}>
      {children}
    </BackgroundContext.Provider>
  );
};