import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { BackgroundImg } from "../utils/constant";


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
 

  const email = useRef(null);
  const password = useRef(null);
  const nameRef = useRef(null); // ✅ renamed from "name" to avoid deprecation warning

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // 🟢 Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameRef.current.value, // ✅ correct variable name
          })
            .then(async () => {
              await auth.currentUser.reload(); // ✅ reload ensures updated displayName
            
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    } else {
      // 🔵 Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Signed in user:", user);
         
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    }
  };

  const toggleSignUpForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="fixed">
        <img
          src={BackgroundImg}
          alt="background"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 min-w-[300px] absolute p-12 bg-black/80 my-40 mx-auto right-0 left-0 text-white rounded-md"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full bg-[#333] rounded text-white placeholder-gray-400 focus:outline-none"
          />
        )}

        <input
          ref={email}
          type="email"
          placeholder="Email or phone number"
          className="p-4 my-3 w-full bg-[#333] rounded text-white placeholder-gray-400 focus:outline-none"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-3 w-full bg-[#333] rounded text-white placeholder-gray-400 focus:outline-none"
        />

        <p className="text-[#e50914] text-sm font-medium mt-2">{errorMessage}</p>

        <button
          className="p-4 my-6 bg-red-700 hover:bg-red-800 w-full rounded font-semibold"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="py-4 text-gray-400 text-sm cursor-pointer transition-all duration-300 hover:underline hover:text-white"
          onClick={toggleSignUpForm}
        >
          {isSignInForm ? "New to Netflix? " : "Already registered? "}
          <span className="text-white font-semibold">
            {isSignInForm ? "Sign up now." : "Sign in now."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
