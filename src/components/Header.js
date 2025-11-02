import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, UserIcon } from "../utils/constant";

const Header = () => {
  const dispatch=useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });

    // cleanup listener on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-12 py-4 bg-gradient-to-b from-black/90 to-transparent z-10">
      {/* Netflix Logo */}
      <img
        className="w-36 sm:w-44 cursor-pointer"
        src={LOGO}
        alt="Netflix Logo"
        onClick={() => navigate("/browse")}
      />

      {/* ✅ Only show profile section if user is logged in */}
      {user && (
        <div className="relative">
          <img
            className="w-10 h-10 rounded-md cursor-pointer hover:opacity-90 transition-all duration-200"
            alt="User Icon"
            src={UserIcon}
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
