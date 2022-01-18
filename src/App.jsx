import { useState, useEffect } from "react";
import { db, auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";




import { BiSearch } from "react-icons/bi";

import Post from "./pages/Post";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Header from "./components/Header";


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [currentUserRef] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState("");
  const [users] = useCollection(collection(db, "users")); // const users = people;
  const [posts] = useCollection(collection(db, "posts"));
  const [currentUserUID, setCurrentUserUID] = useState("");

  // useEffect(() => {
  //   console.log("currentUserRef", currentUserRef.uid);
  //   if (currentUserRef) {
  //     const userRef = doc(db, `users`, `${currentUserRef.uid}`);
  //     getDoc(userRef).then((user) => {
  //       setCurrentUserUID(user.data().uid);
  //       setCurrentUser(user.data());
  //     });
  //   } else {
  //     setCurrentUser("");
  //     setCurrentUserUID("");
  //   }
  // }, [currentUserRef]);


<<<<<<< HEAD

  return (
    <div className="h-screen">
      <Header
        currentUserUID={currentUserUID}
        currentUser={currentUser}
        children={
          <div className="flex space-x-2">
            <input
              placeholder="Search"
              className="w-full input input-primary input-bordered"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => setSearch(searchQuery)}
            >
              <BiSearch size={30} />
            </button>
=======
  return (
    <div className="h-screen text-white">
      <header className="bg-gray-900 h-16 grid grid-cols-3">
        <div className="flex justify-start items-center ml-3">
          <Link to="/" className="text-xl font-logo">
            NeoSVG
          </Link>
        </div>

        <div className="flex justify-center items-center">
          <div className="form-control">
            <div className="flex space-x-2">
              <input
                placeholder="Search"
                className="w-full input input-primary input-bordered"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={() => setSearch(searchQuery)}
              >
                <BiSearch size={30} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center mr-3 gap-5">
          <Link to="/upload">
            <BsUpload size={20} />
          </Link>

          <div className="dropdown dropdown-end">
            <div tabIndex="0">
              {currentUser ? (
                <img
                  className="w-14 h-14 rounded-full border-purple-700 border-4 "
                  src={currentUser.profilePic}
                  alt="user"
                />
              ) : (
                "Log in"
              )}
            </div>

            <ul
              tabIndex="0"
              className="dropdown-content bg-slate-900 w-52 rounded p-2 border-black border-4"
            >
              {currentUser ? (
                <>
                  <li className="flex justify-center p-3">
                    <button className="bg-purple-800 p-3 rounded-2xl hover:bg-purple-800 hover:ring ring-purple-500">
                      <Link to={`user/${currentUserUID}`}>Profile</Link>
                    </button>
                  </li>
                  <li className="flex justify-center p-3">
                    <SignOut />
                  </li>
                </>
              ) : (
                <SignIn />
              )}
              )
            </ul>
>>>>>>> b26091006da054046605ea8bb9c673e65b1fd7d9
          </div>
        }
      />

      <main className="h-[calc(100vh-4rem)] background">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                currentUser={currentUser}
                users={users}
                posts={posts}
              />
            }
          />
          <Route
            path="/upload"
            element={<Upload currentUser={currentUser} />}
          />
          <Route
            path="/user/:uid"
            element={<Profile currentUser={currentUser} users={users} />}
          />
          <Route
            path="/post/:id"
            element={<Post currentUser={currentUser} posts={posts} />}
          />
<<<<<<< HEAD
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
=======
          <Route path="/user/SignIn" element={''} />
>>>>>>> b26091006da054046605ea8bb9c673e65b1fd7d9
        </Routes>


      </main>
    </div>
  );
}

export default App;
