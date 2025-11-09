import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, UserIcon } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";


const Header = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  const handleGptSearchClick=()=>{
     dispatch(toggleGptSearchView());
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value))
    
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-12 py-4 bg-gradient-to-b from-black/90 to-transparent z-50">
      {/* Netflix Logo */}
      <img
        className="w-36 sm:w-44 cursor-pointer"
        src={LOGO}
        alt="Netflix Logo"
        onClick={() => navigate("/browse")}
      />

      {/* ✅ Only show profile section if user is logged in */}
     {user && (
  <div className="relative flex items-center gap-4">
    <button
      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
     onClick={handleGptSearchClick}
     >
      {showGptSearch ? "HomePage":"GPT Search"}
     
    </button>

    <div className="relative">
      <img
        className="w-10 h-10 rounded-md cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all duration-200"
        alt="User Icon"
        src={UserIcon}
        onClick={() => setShowMenu(!showMenu)}
      />

      {showMenu && (
        <div className="absolute right-0 mt-3 w-40 bg-black/90 text-white rounded-md shadow-lg border border-gray-700 z-[9999]">
          <ul className="flex flex-col text-sm">
           {/* 🌐 Language Selection */}
            { showGptSearch && <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-center border-b border-gray-700">
              <select
               className="bg-transparent text-white text-center w-full cursor-pointer focus:outline-none"
                onClick={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang)=>(
                   <option key={lang.identifier} value={lang.identifier} className="bg-gray-900 text-white">{lang.name}</option>
                ))}
             </select>
           </li>}

         {/* 🚪 Sign Out */}
        <li className="px-4 py-2 hover:bg-red-600 text-center cursor-pointer">
         <button onClick={handleSignOut}>Sign Out</button>
      </li>
     </ul>
    </div>

      )}
 </div>
</div>
)}
</div>
   );
};

export default Header;
