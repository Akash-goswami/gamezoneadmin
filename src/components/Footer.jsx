import { ShieldCheck, CircleCheck, Info } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#070B1A] text-gray-400 px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">

          {/* LOGO + DESC */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-yellow-500 text-black font-bold w-8 h-8 flex items-center justify-center rounded-md">
                J
              </div>
              <h2 className="text-white font-bold text-lg">
                Jay<span className="text-yellow-400">Govind</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed">
              India's most exciting online gaming platform. Play safe, play smart.
            </p>
          </div>

          {/* GAMES */}
          <div>
            <h3 className="text-white font-semibold mb-4">GAMES</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Slots</li>
              <li className="hover:text-white cursor-pointer">Live Casino</li>
              <li className="hover:text-white cursor-pointer">Cards</li>
              <li className="hover:text-white cursor-pointer">Crash Games</li>
              <li className="hover:text-white cursor-pointer">Mini Games</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-white font-semibold mb-4">SUPPORT</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">Fair Play</li>
              <li className="hover:text-white cursor-pointer">Responsible Gaming</li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-white font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Press</li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-white font-semibold mb-4">LEGAL</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Cookie Policy</li>
              <li className="hover:text-white cursor-pointer">AML Policy</li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

          <p className="text-gray-500 text-center md:text-left">
            MORESLOTS © 2026. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6 text-gray-500 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <Info size={16} />
              <span>18+ Only</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              <span>Secure & Fair</span>
            </div>

            <div className="flex items-center gap-2">
              <CircleCheck size={16} />
              <span>Made in India</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}