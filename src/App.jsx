import { useState, useEffect } from "react";
import { db, auth } from "./utils/firebase";
import { doc, getDoc, collection } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { BiSearch } from "react-icons/bi";

import Post from "./pages/Post";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import Header from "./components/Header";

function Losts() {
  const posts = {
    docs: [],
  };
  for (let i = 0; i < 50; i++) {
    const image = `https://picsum.photos/id/${i}/200/200`;
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const views = Math.floor(Math.random() * 10000);
    const title = `${letter}${i}`;
    //caculate chance of like and download based on the view count
    const chanceOfLike = Math.floor(Math.random() * views);
    const chanceOfDownload = Math.floor(Math.random() * views);
    const likes = Math.floor(0.3 * Math.random() * chanceOfLike);
    const downloads = Math.floor(0.7 * Math.random() * chanceOfDownload);
    posts.docs.push({
      id: i,
      title,
      image: image,
      likes,
      downloads,
      views,
    });
  }
  // pick a random chance of how likey a post is to be liked or downloaded and push it to the array

  //sort the array by the number of likes
  posts.docs.sort(
    (a, b) =>
      0.15 * (b.likes / b.views - a.likes / a.views) +
      0.55 * (b.downloads / b.views - a.downloads / a.views) +
      0.1 * (b.views - a.views) +
      0.2 * Math.random()
  );

  return posts;
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [users] = useCollection(collection(db, "users")); // const users = people;
  const [postsRef] = useCollection(collection(db, "posts"));

  function sortPosts(posts, option) {
    switch (option) {
      case "magic":
        return posts.docs.sort(
          (a, b) =>
            0.15 * (b.likes / b.views - a.likes / a.views) +
            0.55 * (b.downloads / b.views - a.downloads / a.views) +
            0.1 * (b.views - a.views) +
            0.2 * Math.random()
        );
      case "likes":
        return posts.sort((a, b) => b.likes - a.likes);
      case "downloads":
        return posts.sort((a, b) => b.downloads - a.downloads);
      case "views":
        return posts.sort((a, b) => b.views - a.views);
      default:
        return posts;
    }
  }

  useEffect(() => {
    {
      auth.currentUser
        ? getDoc(doc(db, `users`, auth.currentUser.uid)).then((user) => {
            setCurrentUser(user.data());
          })
        : setCurrentUser(null);
    }
  }, [auth.currentUser]);
  useEffect(() => {
    if (postsRef) {
      console.log(postsRef);
      setPosts(sortPosts(postsRef));
    }
  }, [postsRef]);
  return (
    <div className="background">
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
      <div className="overflow-y-hidden">
        <Routes>
          <Route
            path={"/"}
            element={
              <Home currentUser={currentUser} users={users} posts={posts} />
            }
          />

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
      </div>
    </div>
  );
}

export default App;
