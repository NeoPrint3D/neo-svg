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
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
        </Routes>


      </main>
    </div>
  );
}

export default App;
