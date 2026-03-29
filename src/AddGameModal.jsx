import { useContext, useState } from "react";
import { BackgroundContext } from "./context/BackgroundContext";

export default function AddGameModal({ onClose }) {
  const { addGame } = useContext(BackgroundContext);

  const [formData, setFormData] = useState({
    name: "",
    redirectUrl: "",
    backendUrl: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.redirectUrl) {
      alert("Please fill required fields");
      return;
    }

    const success = await addGame(formData);

    if (success) {
      setFormData({
        name: "",
        redirectUrl: "",
        backendUrl: "",
        code: "",
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>🎮 Add New Game</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          
          <div className="form-group">
            <label>Game Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter game name"
            />
          </div>

          <div className="form-group">
            <label>Redirect URL</label>
            <input
              type="url"
              name="redirectUrl"
              value={formData.redirectUrl}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label>Backend URL</label>
            <input
              type="url"
              name="backendUrl"
              value={formData.backendUrl}
              onChange={handleChange}
              placeholder="https://backend.example.com"
            />
          </div>

          <div className="form-group">
            <label>Game Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="GAME001"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Game
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}