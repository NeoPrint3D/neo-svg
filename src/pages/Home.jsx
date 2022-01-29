import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import PostCard from "../components/PreviewPost";
import { useEffect, useContext, useState } from "react";
import { db } from "../utils/firebase";
import { CurrentUserContext } from "../context/userContext";
import { SearchContext } from "../context/searchContext";
import { Routes, Route, Link } from "react-router-dom";
import {
  doc,
  setDoc,
  query,
  limit,
  getDocs,
  collection,
  orderBy,
  startAt,
} from "firebase/firestore";
import { uid as ID } from "uid";
import Chance from "chance";
import { async } from "@firebase/util";
function Home(props) {
  const [pageSize, setPageSize] = useState(8);
  const [posts, setPosts] = useState([]);
  const [postRef, setPostRef] = useState([]);
  const [pageMax, setPageMax] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("views");
  const currentUser = useContext(CurrentUserContext);
  const search = useContext(SearchContext);

  const formalizeData = (list) => {
    const newData = [];
    list.docs.forEach((post) => {
      newData.push(post.data());
    });
    return newData;
  };
  async function generateData() {
    const chance = new Chance();
    console.log("generated data");

    for (let i = 1; i <= 80; i++) {
      //grab a random picture from unsplash
      const image =
        "https://source.unsplash.com/random/800x600" +
        Math.floor(Math.random() * 1000);
      const id = ID(24);
      await setDoc(doc(db, "posts", id), {
        title: chance.word(),
        name: chance.name({ middle: true }),
        id: id,
        likes: [],
        views: [],
        downloads: [],
        image: image,
      });
    }
  }

  //function that make sure that the last post in the page isnt in the list

  useEffect(() => {
    //update when the data is changed and clean up when the component is unmounted
    console.log("got posts");
    getDocs(
      query(collection(db, "posts"), limit(pageSize), orderBy(sortBy))
    ).then((snapshot) => {
      setPosts(formalizeData(snapshot));
    });
  }, []);

  async function getPosts() {
    const first = query(
      collection(db, "posts"),
      limit(pageSize),
      orderBy(sortBy, "desc")
    );
    const documentSnapshots = await getDocs(first);
    return documentSnapshots;
  }

  async function getMorePosts() {
    setPageMax(page + 1);
    setPage(page + 1);
    if (page * pageSize >= posts.length) {
      const newPosts = await getDocs(
        query(
          collection(db, "posts"),
          limit(pageSize),
          orderBy(sortBy, "desc"),
          startAt(postRef.docs[postRef.docs.length - 1])
        )
      );
      console.log(formalizeData(newPosts).length);
      setPosts(posts.concat(formalizeData(newPosts)));
      setPostRef(newPosts);
    }
  }

  useEffect(() => {
    console.log("post length", posts.length);
  }, [posts]);

  const container = {
    hidden: { opacity: 1, scale: 0.5 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <div>
        <button onClick={() => generateData()}>new data</button>
        <div className="flex justify-center items-center h-10">
          <select
            name="test"
            defaultValue="views"
            className="bg-gray-500 rounded-md"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option disabled="disabled" selected="selected">
              Sort By
            </option>
            <option value="likes">likes</option>
            <option value="views">views</option>
            <option value="downloads">downloads</option>
            <option value="id">title</option>
          </select>
        </div>
        {posts && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 carousel carousel-vertical h-[calc(100vh-9rem)] gap-5"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => {
              //index is the index of the post in the list
              const index = posts.indexOf(post);
              if (
                index < page * pageSize &&
                index >= page * pageSize - pageSize
              ) {
                return <PostCard key={post.id} post={post} />;
              }
            })}
          </motion.div>
        )}
        <div className="grid grid-cols-2 text-4xl bg-red-700">
          {page > 1 ? (
            <button onClick={() => setPage(page - 1)}>{`<`}</button>
          ) : (
            <Link to="cool"></Link>
          )}
          <button onClick={() => getMorePosts(postRef)}>{`>`}</button>
        </div>
      </div>
    </>
  );
}

export default Home;
