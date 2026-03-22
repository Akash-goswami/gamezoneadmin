import { useState, useEffect } from 'react';
import LoginPageAdmin from './LoginPageAdmin';
import Dashboard from './Dashboard';
import Games from './Games';
import Operators from './Operators';
import Report from './Report';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  // ✅ FIX: Role-based access
  const isAdmin = user?.role === 'Admin';

  if (!isLoggedIn) {
    return <LoginPageAdmin onLogin={handleLogin} />;
  }

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="logo">
          <h2>⚙️ Game Zone</h2>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            📊 Dashboard
          </button>

          <button
            className={`nav-btn ${currentPage === 'games' ? 'active' : ''}`}
            onClick={() => setCurrentPage('games')}
          >
            🎮 Games
          </button>

          {/* ✅ Only Admin can see Operators */}
          {isAdmin && (
            <button
              className={`nav-btn ${currentPage === 'operators' ? 'active' : ''}`}
              onClick={() => setCurrentPage('operators')}
            >
              👥 Operators
            </button>
          )}

          <button
            className={`nav-btn ${currentPage === 'report' ? 'active' : ''}`}
            onClick={() => setCurrentPage('report')}
          >
            📈 Reports
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="top-header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
          </div>

          <div className="header-right">
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <div className="page-content">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'games' && <Games />}

          {/* ✅ Protection (extra safety) */}
          {currentPage === 'operators' && isAdmin && <Operators />}

          {currentPage === 'report' && <Report />}
        </div>
      </div>
    </div>
  );
}