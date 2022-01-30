import { Link } from "react-router-dom";
import { db } from "../utils/firebase";
import {
  AiOutlineLike,
  AiOutlineArrowDown,
  AiOutlineEye,
} from "react-icons/ai";
import { motion } from "framer-motion";
import { useEffect, useContext, useState } from "react";
import { CurrentUserContext } from "../context/userContext";
import { doc, updateDoc } from "firebase/firestore";

function PostCard(props) {
  const { post } = props;
  const currentUser = useContext(CurrentUserContext);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState("");

  useEffect(() => {
    setLikes(post.likeCount);
    if (post.likedBy.includes(currentUser.uid)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [currentUser]);

  const handleLike = async () => {
    if (currentUser) {
      if (liked) {
        setLikes(likes - 1);
        await updateDoc(doc(db, "posts", post.id), {
          likedBy: post.likedBy.filter((id) => id !== currentUser.uid),
          likeCount: likes - 1,
        });
        await updateDoc(doc(db, "users", currentUser.uid), {
          liked: currentUser.liked.filter((id) => id !== post.id),
        });
      } else {
        setLikes(likes + 1);
        await updateDoc(doc(db, "posts", post.id), {
          likedBy: [...post.likedBy, currentUser.uid],
          likeCount: likes + 1,
        });
        await updateDoc(doc(db, "users", currentUser.uid), {
          liked: [...currentUser.liked, post.id],
        });
      }
      setLiked(!liked);
    }
  };

  //see if a person has downloaded a post

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div
      className="glass-container rounded-2xl h-[20rem] grid grid-rows-5 "
      variants={item}
      key={post.id}
    >
      <div className="grid grid-cols-3 items-center mt-2 ">
        <div className="flex justify-start ml-2">
          <Link to={`/user/${post.user.name}`}>
            <img
              className="flex h-16 rounded-full  border-4 border-purple-500"
              src={post.user.profilePic}
              alt=""
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="text-3xl">{post.title}</h4>

          <h3 className="text-sm ">{post.user.name}</h3>
        </div>
      </div>

      <div className="flex justify-center items-center row-span-3">
        <Link to={`/post/${post.id}`}>
          <img
            className="transition-all h-40 rounded-lg active:scale-90 active:blur-sm hover:-hue-rotate-60 "
            src={post.file}
            alt="loading"
          />
        </Link>
      </div>

      <div className="grid grid-cols-3">
        <div className="flex justify-evenly items-center">
          <AiOutlineEye className="text-blue-500" size={30} />
          <h1 className="text-xl text-center">{post.viewCount}</h1>
        </div>
        <div className="flex justify-evenly items-center">
          <button
            disabled={currentUser.uid === post.user.uid}
            onClick={() => handleLike()}
          >
            <AiOutlineLike
              className={`transition-all    ${
                liked ? "text-green-600" : "text-blue-500"
              }${
                currentUser.uid === post.user.uid || !currentUser.uid
                  ? " text-gray-500"
                  : " text-blue-500 hover:scale-110"
              }`}
              size={30}
            />
          </button>
          <h1 className="text-xl text-center">{likes}</h1>
        </div>

        <div className="flex justify-evenly items-center">
          <AiOutlineArrowDown className="text-blue-500" size={30} />
          <h1 className="text-xl text-center">{post.downloadCount}</h1>
        </div>
      </div>
    </motion.div>
  );
}
export default PostCard;
