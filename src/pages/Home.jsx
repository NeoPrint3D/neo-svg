import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import PostCard from "../components/PreviewPost";
import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../context/userContext";
import { SearchContext } from "../context/searchContext";
function Home(props) {
  const { posts, users } = props;
  const currentUser = useContext(CurrentUserContext);
  const search = useContext(SearchContext);

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
      <div>
        {posts ? (
          <div className="grid md:grid-cols-10">
            <div className="col-span-7">
              <div className="flex justify-center">{""}</div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 carousel carousel-vertical h-[calc(100vh-5.5rem)] gap-10"
                variants={container}
                initial="hidden"
                animate="visible"
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
