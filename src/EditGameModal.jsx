import { useState } from 'react';

export default function EditGameModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    redirectUrl: '',
    backedUrl: '',
    code: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.redirectUrl) {
      alert('Please fill all fields');
      return;
    }
    onAdd(formData);
    setFormData({ name: '', redirectUrl: '', backedUrl: '', code: '' });
    setImage(null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Game</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Game Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter game name"
              required
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
              required
            />
          </div>

          <div className="form-group">
            <label>Backed URL</label>
            <input
              type="url"
              name="backedUrl"
              value={formData.backedUrl}
              onChange={handleChange}
              placeholder="https://backed.example.com"
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

          <div className="form-group">
            <label>Game Image</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="image-input"
              />
              {image ? (
                <div className="image-preview">
                  ✓ {image.name}
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="remove-image"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label htmlFor="image-input" className="upload-label">
                  📷 Click to upload image
                </label>
              )}
            </div>
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
