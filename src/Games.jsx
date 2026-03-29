import { useState, useContext } from "react";
import AddGameModal from "./AddGameModal";
import { BackgroundContext } from "./context/BackgroundContext";
import EditGameModal from "./EditGameModal";

export default function Games() {
  const { games, setGames, loading } = useContext(BackgroundContext);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editGame, setEditGame] = useState(null);

  const handleAddGame = (newGame) => {
    const gameToAdd = {
      ...newGame,
      id: Date.now(),
      isActive: true,
    };
    setGames([...games, gameToAdd]);
    setShowModal(false);
  };

  const handleUpdateGame = (updatedGame) => {
    setGames((prev) =>
      prev.map((g) => (g.id === updatedGame.id ? updatedGame : g))
    );
    setEditGame(null);
  };

  const handleDeleteGame = (id) => {
    setGames(games.filter((g) => g.id !== id));
  };

  const toggleActive = (id) => {
    setGames((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, isActive: !g.isActive } : g
      )
    );
  };

  const filteredGames = games.filter((g) =>
    g.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (!games.length) return <div className="loading">No games available...</div>;

  return (
    <div className="container">
      <div className="header">
        <h2>Games Management</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Game
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
            <th>Code</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredGames.map((game) => (
            <tr key={game.id}>
              <td>{game.name}</td>
              <td>
                <a href={game.redirectUrl} target="_blank">
                  {game.redirectUrl}
                </a>
              </td>
              <td>{game.code}</td>

             <td>
  <label className="switch">
    <input
      type="checkbox"
      checked={game.isActive}
      onChange={() => toggleActive(game.id)}
    />
    <span className="slider"></span>
  </label>
</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => setEditGame(game)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteGame(game.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddGameModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddGame}
        />
      )}

      {editGame && (
        <EditGameModal
          editData={editGame}
          onClose={() => setEditGame(null)}
          onSubmit={handleUpdateGame}
        />
      )}
    </div>
  );
}