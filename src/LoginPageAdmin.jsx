import { useState } from 'react';

export default function LoginPageAdmin({ onLogin }) {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Static Users
  const users = [
    {
      id: 1,
      email: "admin@example.com",
      password: "password123",
      role: "Admin",
      name: "Admin User"
    },
    {
      id: 2,
      email: "operator@example.com",
      password: "password123",
      role: "Operator",
      name: "Operator User"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // ⏳ Fake delay (optional for UI feel)
    setTimeout(() => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      // ✅ Store in localStorage (same as backend)
      localStorage.setItem('token', 'dummy-token-123');
      localStorage.setItem('user', JSON.stringify(user));

      onLogin(user);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-content">
          <h1>Game Zone</h1>
          <p>Admin Management System</p>
          <div className="features">
            <div className="feature">✓ Dashboard Analytics</div>
            <div className="feature">✓ Games Management</div>
            <div className="feature">✓ Operator Control</div>
            <div className="feature">✓ Advanced Reports</div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Admin Login</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Admin: admin@example.com / password123</p>
            <p>Operator: operator@example.com / password123</p>
          </div>
        </form>
      </div>
    </div>
  );
}