import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import PostCard from "../components/PreviewPost";
import { useEffect, useContext, useState } from "react";
import { db } from "../utils/firebase";
import { CurrentUserContext } from "../context/userContext";
import { SearchContext } from "../context/searchContext";
import {
  doc,
  setDoc,
  query,
  limit,
  getDocs,
  collection,
  orderBy,
} from "firebase/firestore";
import { uid as ID } from "uid";
import Chance from "chance";
function Home(props) {
  const { users } = props;
  const [posts, setPosts] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  const search = useContext(SearchContext);

  function FormalizeData(posts) {
    const list = [];
    posts.docs.map((post) => {
      list.push(post.data());
    });
    return list;
  }

  useEffect(() => {
    console.log("got posts");
    const q = query(
      collection(db, "posts"),
      limit(30),
      orderBy("title", "asc")
    );
    getDocs(q).then((snapshot) => {
      const list = FormalizeData(snapshot);
      console.log(list.length);
      setPosts(list);
    });
  }, []);

  async function generateData() {
    const chance = new Chance();
    console.log("generated data");

    for (let i = 0; i < 1000; i++) {
      //grab a random picture from picsum

      const image =
        "https://picsum.photos/200/300?random=" +
        Math.floor(Math.random() * 1000);
      const id = ID(16);
      await setDoc(doc(db, "posts", id), {
        title: chance.sentence({ words: 2 }),
        id: id,
        description: chance.sentence({ words: 10 }),
        file: image,
        created: chance.timestamp(),
        likes: 0,
        views: 0,
        tags: [],
        comments: [],
        user: {
          uid: chance.guid(),
          name: chance.name(),
          profilePic: chance.avatar(),
        },
      });
    }
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      {/* <button onClick={() => generateData()}>generate data</button> */}
      <div>
        {posts ? (
          <div className="grid md:grid-cols-10">
            <div className="col-span-7">
              <div className="flex justify-center">{""}</div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 carousel carousel-vertical h-[calc(100vh-5.5rem)] gap-10"
                // variants={container}
                // initial="hidden"
                // animate="visible"
              >
                {posts.map((post) => {
                  return <PostCard key={post.id} post={post} />;
                })}
              </motion.div>
            </div>
          </div>
        ) : (
          //loading spinner that changes colors
          <main>
            <div className="">
              <AiOutlineLoading3Quarters
                size={100}
                className={`animate-spin text-purple-900`}
              />
            </div>
          </main>
        )}
      </div>
      <div className="hidden md:divider divider-vertical"></div>
    </>
  );
}

export default Home;
