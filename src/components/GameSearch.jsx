import { useContext, useState, useEffect } from "react";
import { BackgroundContext } from "../context/BackgroundContext";
import gameImg from "../assets/image01Head.webp";
import { ChevronDown } from "lucide-react";

export default function GameSearch() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("popular");
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { lobbyGames } = useContext(BackgroundContext);

  // ✅ Stop loading when data comes
  useEffect(() => {
    if (lobbyGames) {
      setLoading(false);
    }
  }, [lobbyGames]);

  // ✅ Filter games
  const filteredGames = lobbyGames?.filter((game) =>
    game.game_name.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Handle Click
  const handleGameClick = (game) => {
    const token = localStorage.getItem("token");

    const url = `${game.frontend_url}/?id=${encodeURIComponent(
      token
    )}&game_code=${game.game_code}`;

    setSelectedGame(url);
  };

  return (
    <div className="w-full px-3 sm:px-4 py-6">

      {/* 🔥 FULL SCREEN GAME */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black z-50">
          <button
            onClick={() => setSelectedGame(null)}
            className="absolute top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-full"
          >
            ✕ Close
          </button>

          <iframe
            src={selectedGame}
            title="Game"
            className="w-full h-full border-none"
            allowFullScreen
          />
        </div>
      )}

      {/* 🔍 SEARCH + FILTER */}
      <div className="w-full max-w-7xl mx-auto flex items-center gap-3 flex-wrap justify-center">
        <input
          type="text"
          placeholder="🔍 Search games..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-[#0b1035] text-white px-6 py-3 rounded-full border border-white/10 outline-none"
        />

        <div className="relative w-[200px]">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="w-full appearance-none bg-[#0b1035] text-white px-4 py-3 pr-10 rounded-full border border-white/10 focus:outline-none"
      >
        <option value="popular">🔥 Most Popular</option>
        <option value="new">🆕 New</option>
        <option value="top">⭐ Top Rated</option>
      </select>

      {/* Arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/70">
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
    </div>
      </div>

      {/* 🎮 GAME SECTION */}
      <div className="mt-6 max-w-7xl mx-auto">

        {/* 🔄 LOADING */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-40 sm:h-44 lg:h-[20rem] bg-gray-700 animate-pulse rounded-xl"
              />
            ))}
          </div>
        )}

        {/* ❌ NO GAMES FOUND */}
        {!loading && filteredGames?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-white text-lg font-semibold">
              😕 No Games Found
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Try searching something else
            </p>
          </div>
        )}

        {/* 🎯 GAME GRID */}
        {!loading && filteredGames?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

            {filteredGames.map((game, i) => (
              <div
                key={i}
                onClick={() => handleGameClick(game)}
                className="relative cursor-pointer rounded-xl overflow-hidden group"
              >
                {/* 🖼 STATIC IMAGE */}
                <img
                  src={gameImg}
                  alt={game.game_name}
                  className="w-full h-32 sm:h-40 md:h-44 lg:h-[20rem] object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* 🔥 OVERLAY */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-300"></div>

                {/* 🔥 TITLE + PLAY */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition text-center px-2">
                  
                  <p className="text-white font-semibold text-sm mb-2">
                    {game.game_name}
                  </p>

                  <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
                    ▶ Play
                  </span>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}