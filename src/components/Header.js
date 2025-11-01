import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-12 py-4 bg-gradient-to-b from-black/90 to-transparent z-10">
      {/* Netflix Logo */}
      <img
        className="w-36 sm:w-44 cursor-pointer"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
        onClick={() => navigate("/browse")}
      />

      {/* ✅ Only show profile section if user is logged in */}
      {user && (
        <div className="relative">
          <img
            className="w-10 h-10 rounded-md cursor-pointer hover:opacity-90 transition-all duration-200"
            alt="User Icon"
            src="https://occ-0-6502-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
            onClick={() => setShowMenu(!showMenu)}
          />

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-3 w-40 bg-black/90 text-white rounded-md shadow-lg border border-gray-700">
              <ul className="flex flex-col text-sm">
                <li className="px-4 py-2 hover:bg-red-600 text-center cursor-pointer">
                  <button onClick={handleSignOut}>Sign Out</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
