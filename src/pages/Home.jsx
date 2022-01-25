import Card from "../components/ProfileCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
          className="grid grid-cols-2 bg-slate-900"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {posts.docs.map((post) => {
            const postRef = post.data();
            return (
              <motion.div
                className="grid grid-cols-3  justify-self-center bg-slate-600 rounded-2xl p-3 my-10 carousel-item h-[10rem] w-9/12"
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={postRef.id}
              >
         
                <div className="flex justify-start items-center mt-10">
                  <img className="w-20" src={postRef.file} alt="loading" />
                  <div className="divider divider-vertical"></div>
                </div>
                <div className="">{postRef.title}</div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        //loading spinner
        <div className="flex flex-col justify-center items-center bg-slate-900 p-5 w-11/12 h-[calc(100vh-10rem)] rounded-xl">
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
