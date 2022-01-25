import Card from "../components/ProfileCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";

function Home(props) {
  const { currentUser, search, users, posts } = props;

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

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      {posts ? (
        <motion.div
          className="flex flex-col justify-center items-center bg-slate-900 p-5 w-11/12 max-w-[80%] h-[calc(100vh-10rem)] rounded-2xl gap-y-10"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {posts.docs.map((post) => {
            const postRef = post.data();
            return (
              <motion.div
                className="grid grid-cols-3 bg-slate-600 rounded-2xl p-3 h-5/6 w-11/12 "
                variants={item}
              >
                <div className="flex justify-start items-center">
                  <img className="w-20" src={postRef.file} alt="" />
                  <div className="divider divider-vertical"></div>
                </div>
                <div className="">{postRef.title}</div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="flex flex-col justify-center items-center bg-slate-900 p-5 w-8/12 h-[calc(100vh-10rem)] rounded-2xl gap-y-5">
          <AiOutlineLoading3Quarters
            size={50}
            className="animate-spin ring-rounded text-green-600"
          />
        </div>
      )}
    </>
  );
}

export default Home;
