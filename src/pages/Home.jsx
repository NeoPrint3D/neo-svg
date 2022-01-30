import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import PreviewPost from "../components/PreviewPost";
import { useEffect, useContext, useState } from "react";
import { db } from "../utils/firebase";
import { SearchContext } from "../context/searchContext";

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
function Home(props) {
  const [pageSize, setPageSize] = useState(40);
  const [posts, setPosts] = useState("");
  const [postRef, setPostRef] = useState("");
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState("");
  const [sortBy, setSortBy] = useState("likeCount");
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
      const image = "https://picsum.photos/200/300?random=" + i;
      const id = ID(24);
      await setDoc(doc(db, "posts", id), {
        title: chance.word(),
        name: chance.name({ middle: true }),
        id: id,
        likeCount: 0,
        likedBy: [],
        viewCount: 0,
        viewedBy: [],
        downloadCount: 0,
        downloadedBy: [],
        image: image,
      });
    }
  }

  //function that make sure that the last post in the page isnt in the list

  useEffect(() => {
    //update when the data is changed and clean up when the component is unmounted
    console.log("got posts");
    getPosts().then((snapshot) => {
      setPostRef(snapshot);
      setPosts(formalizeData(snapshot));
    });
  }, [sortBy]);

  async function getPosts() {
    const first = query(
      collection(db, "posts"),
      limit(pageSize),
      orderBy(sortBy, "desc")
    );
    const documentSnapshots = await getDocs(first);
    if (documentSnapshots.docs.length + 1 < pageSize) {
      setEndPage(page);
    }

    return documentSnapshots;
  }

  async function getMorePosts() {
    setPage(page + 1);
    if (
      page * pageSize >= posts.length - 6 &&
      postRef.docs.length % pageSize === 0
    ) {
      const newPosts = await getDocs(
        query(
          collection(db, "posts"),
          limit(pageSize),
          orderBy(sortBy, "desc"),
          startAt(postRef.docs[postRef.docs.length - 1])
        )
      );
      setPosts(posts.concat(formalizeData(newPosts)));
      setPostRef(newPosts);
      if (newPosts.docs.length + 1 < pageSize) {
        setEndPage(page + 1);
        console.log("end page");
      }
    }
  }

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
    <div className="my-10">
      {/* <button onClick={() => generateData()}>new data</button> */}
      {posts ? (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-[calc(100vh-6.5rem)] gap-5  "
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
                return <PreviewPost key={post.id} post={post} />;
              }
            })}
            <div
              className={`grid grid-cols-3 items-center col-span-full h-[4rem]	text-4xl`}
            >
              {page > 1 ? (
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setPage(page - 1);
                    }}
                  >{`<`}</button>
                </div>
              ) : (
                <div></div>
              )}
              <div className="flex justify-center">{page}</div>
              <div className="flex justify-center">
                <button
                  className="disabled:text-red-500"
                  disabled={endPage === page && true}
                  onClick={() => getMorePosts(postRef)}
                >{`>`}</button>
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <AiOutlineLoading3Quarters
            size={100}
            className="text-purple-800 animate-spin"
          />
        </div>
      )}
    </div>
  );
}

export default Home;
