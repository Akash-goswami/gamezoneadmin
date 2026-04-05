import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header({ onLogout,setCurrentPage  }) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    setProfileOpen(false); 

    if (onLogout) onLogout(); // App.jsx ko notify
  };

  return (
    <header className="w-full bg-[#060b2b] text-white border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* 🔥 LEFT LOGO */}
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 text-black font-bold w-10 h-10 flex items-center justify-center rounded-lg">
            J
          </div>
         <h1 
  onClick={() => setCurrentPage("dashboard")}
  className="text-xl font-bold tracking-wide cursor-pointer"
>
  Jay<span className="text-yellow-400">Govind</span>
</h1>
        </div>

        {/* 🔥 DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="/"   onClick={() => setCurrentPage("dashboard")}
 className="hover:text-white transition">Games</a>
          <a href="#" className="hover:text-white transition">Live Casino</a>
          <a href="#" className="hover:text-white transition">Promotions</a>
          <a href="#" className="hover:text-white transition">VIP Club</a>
        </nav>

        {/* 🔥 RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4 relative">
          <div className="text-right">
            <p className="text-[10px] text-white/40">BALANCE</p>
            <p className="text-yellow-400 font-bold">₹14,623,000</p>
          </div>

          <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
            + Deposit
          </button>

          {/* 🔥 PROFILE BUTTON */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
            >
              👤
            </button>

            {/* 🔥 DROPDOWN MENU */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#0b1035] border border-white/10 rounded-xl shadow-xl p-3 z-50 animate-fadeIn">
                
                <div className="flex flex-col gap-3 text-sm text-white/70">
                  <button className="text-left hover:text-white">Update Password</button>
                  <button className="text-left hover:text-white">Casino</button>
                 <button 
  onClick={() => {
    setCurrentPage("statement");
    setProfileOpen(false);
  }}
  className="text-left hover:text-white"
>
  Statement
</button>
                </div>

                {/* 🔥 LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full py-2 rounded-xl bg-red-500/20 text-red-400 font-semibold hover:bg-red-500/30 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 🔥 MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* 🔥 MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#060b2b] border-t border-white/10 px-4 pb-4">
          <nav className="flex flex-col gap-4 text-white/80">
            <a href="#">Games</a>
            <a href="#">Live Casino</a>
            <a href="#">Promotions</a>
            <a href="#">VIP Club</a>
            <a href="#"   onClick={() => {setCurrentPage("statement"),setOpen(false)}}
>Statement</a>
          </nav>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/40">BALANCE</p>
              <p className="text-yellow-400 font-bold">₹14,623,000</p>
            </div>

            <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
              Deposit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}