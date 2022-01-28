import React, { createContext, useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { getDocs, collection } from "firebase/firestore";

const PostsContext = createContext(undefined);
// A "provider" is used to encapsulate only the
// components that needs the state in this context
function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
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
      console.log(snapshot);
      setPosts(FormalizeData(snapshot));
    });
  }, []);

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
}

export { PostProvider, PostsContext };
