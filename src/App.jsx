import { useState, useEffect, useRef } from "react";
import { db, auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import { SignIn, SignOut } from "./components/Buttons";
import { BiSearch } from "react-icons/bi";
import { BsUpload } from "react-icons/bs";
import { Link, Route, Routes } from "react-router-dom";

import Post from "./pages/Post";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

import people from "./data/list";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [currentUser] = useAuthState(auth);
  const [users] = useCollection(collection(db, "users"));
  const [posts, setPosts] = useCollection(collection(db, "posts"));
  // const users = people;
  useEffect(() => {
    if (currentUser) {
      initailizeUser();
    }
  }, [currentUser]);

  async function makeOffline() {
    await updateDoc(db, "users", currentUser.uid, { status: false });
  }

  async function initailizeUser() {
    console.log("initailizeUser");
    await setDoc(doc(db, "users", currentUser.uid), {
      uid: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email,
      profilePic: currentUser.photoURL,
      status: true,
    });
  }

  return (
    <div className="h-screen bg-gradient-to-tr from-gray-600 via-gray-800 to-gray-500 bg-fixed">
      <header className="bg-gray-900 h-16 grid grid-cols-3">
        <div className="flex justify-start items-center ml-3">
          <Link to="/" className="text-xl">
            Who Around
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="form-control">
            <div className="flex space-x-2">
              <input
                placeholder="Search"
                className="w-full input input-primary input-bordered"
                type="text"
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
            <BsUpload size={30} />
          </Link>
          {currentUser ? (
            <div className="dropdown dropdown-end">
              <button>
                <img
                  className="w-14 h-14 rounded-full border-purple-700 border-4 "
                  src={currentUser.photoURL}
                  alt="user"
                />
              </button>
              <div
                tabIndex="0"
                className="dropdown-content bg-slate-900 w-52 rounded p-5 border-purple-500 border-4"
              >
                <div className="flex justify-around">
                  <SignOut auth={auth} makeOffline={makeOffline} />
                </div>
                <div className="flex justify-center"></div>
              </div>
            </div>
          ) : (
            <SignIn auth={auth} />
          )}
        </div>
      </header>

      <main className="grid-cols-3 h-[calc(100vh-4rem)]">
        <Routes>
          <Route
            path="/"
            element={
              <Home users={users} search={search} currentUser={currentUser} />
            }
          />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
