import { useState, useEffect } from 'react';
import AddGameModal from './AddGameModal';

export default function Games() {
  // ✅ Static Data
  const dummyGames = [
    {
      id: 1,
      name: "Head & Tail",
      redirectUrl: "https://game1.com",
      code: "HT01",
      image: "https://www.cdmi.in/courses@2x/2D3D-Game-Design.webp",
    },
    {
      id: 2,
      name: "Spin Wheel",
      redirectUrl: "https://game2.com",
      code: "SW02",
      image: "https://www.cdmi.in/courses@2x/2D3D-Game-Design.webp",
    },
    {
      id: 3,
      name: "Lucky Dice",
      redirectUrl: "https://game3.com",
      code: "LD03",
      image: "https://www.cdmi.in/courses@2x/2D3D-Game-Design.webp",
    },
  ];

  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // ❌ API CALL DISABLED
    // fetchGames();

    // ✅ Use Static Data
    setGames(dummyGames);
    setLoading(false);
  }, []);

  // ❌ API function (commented)
  /*
  const fetchGames = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/games', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setGames(data.games || []);
    } catch (err) {
      setError('Failed to load games');
    } finally {
      setLoading(false);
    }
  };
  */

  const handleAddGame = (newGame) => {
    setGames([...games, { ...newGame, id: Date.now() }]);
    setShowModal(false);
  };

  const handleDeleteGame = async (id) => {
    if (!confirm('Delete this game?')) return;

    // ❌ API DELETE DISABLED
    /*
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/games/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (err) {
      alert('Failed to delete game');
    }
    */

    // ✅ Local delete
    setGames(games.filter(g => g.id !== id));
  };

  const filteredGames = games.filter(g =>
    g.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading games...</div>;

  return (
    <div className="games-container">
      <div className="games-header">
        <h2>Games Management</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Game
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <table className="games-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Game Name</th>
            <th>Redirect URL</th>
            <th>Code</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map(game => (
            <tr key={game.id}>
              <td>
                <img
                  src={game.image || ''}
                  alt={game.name}
                  className="game-image"
                  onError={(e) => (e.target.src = '')}
                />
              </td>
              <td>{game.name}</td>
              <td>{game.redirectUrl}</td>
              <td>{game.code}</td>
              <td><span className="status-badge">Active</span></td>
              <td>
                <button className="edit-btn">Edit</button>
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
          onAdd={handleAddGame}
        />
      )}
    </div>
  );
}