import { useState, useEffect } from "react";
import { db, auth } from "./utils/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";

import { BiSearch } from "react-icons/bi";

import Post from "./pages/Post";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import Header from "./components/Header";
import { CurrentUserProvider } from "./context/userContext";
import { SearchProvider } from "./context/searchContext";

function App() {
  return (
    <div className="background h-screen overflow-y-scroll">
      <CurrentUserProvider>
        <SearchProvider>
          <Header />

          <div className="">
            <Routes>
              <Route path={"/"} element={<Home />} />

              <Route path="/upload" element={<Upload />} />
              <Route path="/user/:username" element={<Profile />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/SignUp" element={<SignUpPage />} />
              <Route path="/SignIn" element={<SignInPage />} />
            </Routes>
          </div>
        </SearchProvider>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
