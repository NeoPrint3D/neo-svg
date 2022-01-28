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
import { PostProvider } from "./context/postsContext";

function App() {
  const [posts, setPosts] = useState("");
  const [users] = useState("");
  // const [postsRef] = useCollection(collection(db, "posts"));

  function sortPosts(posts, sortBy) {
    console.log(sortBy);
    switch (sortBy) {
      case "random":
        return posts.sort((a, b) => 0.5 - Math.random());
      case "newest":
        return posts.sort(
          (a, b) => b.createdAt.milliseconds - a.createdAt.milliseconds
        );
      case "oldest":
        return posts.sort(
          (a, b) => a.createdAt.milliseconds - b.createdAt.milliseconds
        );
      case "popular":
        return posts.sort((a, b) => b.likeCount - a.likeCount);
      default:
        return posts;
    }
  }
  function FormalizeData(posts) {
    const list = [];
    posts.docs.map((post) => {
      list.push(post.data());
    });
    return list;
  }

  useEffect(() => {
    console.log("got posts");
    getDocs(collection(db, "posts")).then((snapshot) => {
      setPosts(FormalizeData(snapshot));
    });
  }, []);
  return (
    <div className="background">
      <CurrentUserProvider>
        <SearchProvider>
          <Header />

          <div className="overflow-y-hidden">
            <Routes>
              <Route
                path={"/"}
                element={<Home posts={posts} users={users} />}
              />

              <Route path="/upload" element={<Upload />} />
              <Route
                path="/user/:username"
                element={<Profile users={users} />}
              />
              <Route path="/post/:id" element={<Post posts={posts} />} />
              <Route path="/SignUp" element={<SignUpPage users={users} />} />
              <Route path="/SignIn" element={<SignInPage users={users} />} />
            </Routes>
          </div>
        </SearchProvider>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
