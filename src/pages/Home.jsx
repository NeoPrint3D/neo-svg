import Card from "../components/ProfileCard";
import {
  AiOutlineLoading3Quarters,
  AiOutlineLike,
  AiOutlineArrowDown,
  AiOutlineEye,
} from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home(props) {
  const { currentUser, search, users, posts } = props;

  // make it where the loading ring grows and then fades out

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
      <div>
        {posts !== "" ? (
          <div className="grid md:grid-cols-10">
            <div className="col-span-7">
              <div className="flex justify-center">test</div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 carousel carousel-vertical h-[calc(100vh-5.5rem)] gap-10"
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {posts.docs.map((post) => {
                  const postRef = post.data();
                  // const postRef = post;
                  return (
                    <motion.div
                      className="carousel-item grid grid-rows-10 justify-self-center bg-slate-600 rounded-lg p-3 carousel-item w-10/12 max-w-[20rem] shadow-md shadow-purple-900 gap-3 max-h-[20rem]"
                      variants={item}
                      key={postRef.id}
                    >
                      <div className="flex flex-col justify-items-center row-span-2">
                        <h5 className="text-xl text-center">{postRef.title}</h5>
                        <h1 className="text-xs text-center text-blue-500">
                          {postRef.user.name}
                        </h1>
                      </div>
                      <Link
                        className="flex justify-center row-span-6"
                        to={`/post/${post.id}`}
                      >
                        <img
                          className="transition-all w-2/4 rounded-lg active:scale-90 active:blur-sm hover:-hue-rotate-60"
                          src={postRef.file}
                          alt="loading"
                        />
                      </Link>

                      <div className="grid grid-cols-3">
                        <div className="flex justify-evenly items-center">
                          <AiOutlineEye className="text-blue-500" size={30} />
                          <h1 className="text-xl text-center">
                            {postRef.views}
                          </h1>
                        </div>
                        <div className="flex justify-evenly items-center">
                          <button>
                            <AiOutlineLike
                              className="text-blue-500 hover:text-green-600 hover:scale-110"
                              size={30}
                            />
                          </button>
                          <h1 className="text-xl text-center">
                            {postRef.likes}
                          </h1>
                        </div>

                        <div className="flex justify-evenly items-center">
                          <AiOutlineArrowDown
                            className="text-blue-500"
                            size={30}
                          />
                          <h1 className="text-xl text-center">
                            {postRef.downloads}
                          </h1>
                        </div>
                      </div>
                    </motion.div>
                  );
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
