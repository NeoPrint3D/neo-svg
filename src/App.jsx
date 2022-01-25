import { useState, useEffect } from "react";
import { db, auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

import { BiSearch } from "react-icons/bi";

import Post from "./pages/Post";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import Header from "./components/Header";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [currentUserRef] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState("");
  const [users] = useCollection(collection(db, "users")); // const users = people;
  const [posts] = useCollection(collection(db, "posts"));

  useEffect(() => {
    if (auth.currentUser) {
      console.log(auth.currentUser.uid);
      getDoc(doc(db, "users", auth.currentUser.uid)).then((user) => {
        setCurrentUser(user.data());
        console.log("currentUser", user.data());
      });
    } else {
      console.log("currentUserRef", currentUserRef);
      setCurrentUser("");
    }
  }, [auth.currentUser]);

  return (
    <div className="h-screen text-white">
      <Header
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
            <button className="btn btn-primary" onClick={() => ""}>
              <BiSearch size={30} />
            </button>
          </div>
        }
      />

      <main className="h-[calc(100vh-4rem)] background">
        <Routes>
          {["/", "/home"].map((path) => (
            <Route
              path={path}
              element={
                <Home currentUser={currentUser} users={users} posts={posts} />
              }
              key={path}
            />
          ))}

          <Route
            path="/upload"
            element={<Upload currentUser={currentUser} />}
          />
          <Route
            path="/user/:username"
            element={<Profile currentUser={currentUser} users={users} />}
          />
          <Route
            path="/post/:id"
            element={<Post currentUser={currentUser} posts={posts} />}
          />
          <Route path="/SignUp" element={<SignUpPage users={users} />} />
          <Route path="/SignIn" element={<SignInPage users={users} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
