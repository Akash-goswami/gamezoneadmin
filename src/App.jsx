import { useState, useEffect } from "react";
import LoginPageAdmin from "./components/LoginPageAdmin";
import Header from "./components/Header";
import GameSearch from "./components/GameSearch";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import Statement from "./components/Statement";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 🔥 PAGE CONTROL
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully ✅");

    setUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPageAdmin onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#070B1A]">
      
      {/* 🔥 PASS setCurrentPage */}
      <Header 
        onLogout={handleLogout} 
        setCurrentPage={setCurrentPage} 
      />

      <div className="flex-grow admin-container p-4 text-white">
        
        {/* ✅ DEFAULT DASHBOARD */}
        {currentPage === "dashboard" && <GameSearch />}

        {/* ✅ STATEMENT PAGE */}
        {currentPage === "statement" && <Statement />}
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}