import { Link } from "react-router-dom";
import { db } from "../utils/firebase";
import {
  AiOutlineLike,
  AiOutlineArrowDown,
  AiOutlineEye,
  AiFillLike,
} from "react-icons/ai";
import { useEffect, useContext, useState } from "react";
import { CurrentUserContext } from "../context/userContext";
import { doc, updateDoc } from "firebase/firestore/lite";
import Img from "react-cool-img"
import placeholder from "../assets/placeholder.png";

function PreviewPost(props) {
  const { post } = props;
  const currentUser = useContext(CurrentUserContext);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState("");

  useEffect(() => {
    setLikes(post.likeCount);
    if (currentUser) {
      post.likedBy.includes(currentUser.uid) ? setLiked(true) : setLiked(false);
    }
  }, [currentUser, post]);

  const handleLike = async () => {
    if (currentUser) {
      if (liked) {
        setLikes(likes - 1);
        updateDoc(doc(db, "posts", post.id), {
          likedBy: post.likedBy.filter((id) => id !== currentUser.uid),
          likeCount: likes - 1,
        });

        updateDoc(doc(db, "users", currentUser.uid), {
          liked: currentUser.liked.filter((id) => id !== post.id),
        });
        setLiked(false);
      } else {
        setLikes(likes + 1);
        updateDoc(doc(db, "posts", post.id), {
          likedBy: [...post.likedBy, currentUser.uid],
          likeCount: likes + 1,
        });
        updateDoc(doc(db, "users", currentUser.uid), {
          liked: [...currentUser.liked, post.id],
        });
        setLiked(true);
      }
    }
  };

  const handleView = () => {
    updateDoc(doc(db, "posts", post.id), {
      viewCount: post.viewCount + 1,
    });
  };

  return (
    <div className="bg-purple-800 rounded-2xl h-auto w-11/12 sm:w-full grid grid-rows-8  ease-in duration-100 popup-container">
      <div className="grid grid-cols-5 items-center mt-2 ">
        <div className="flex justify-start col-span-1 ml-2 mb-4">
          <Link to={`/user/${post.user.username}`}>
            <img
              className="w-12 h-12 rounded-full "
              src={post.user.profilePic}
              alt="user"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center col-span-3">
          <h4 className="text-3xl">{post.title}</h4>
          <h3 className="flex justify-center text-sm ">{post.user.username}</h3>
        </div>
      </div>

      {/*image*/}
      <div className="flex justify-center items-center row-span-3">
        <Link to={`/post/${post.id}`}>
          <button onClick={() => handleView()}>
            <Img
              className="transition-all max-h-56 rounded-lg active:scale-90 active:blur-sm hover:-hue-rotate-60 "
              src={post.file}
              placeholder={placeholder}
              alt="loading"
            />
          </button>
        </Link>
      </div>

      {/*action button*/}
      <div className="grid grid-cols-3 row-span-3">
        <div className="flex justify-evenly items-center">
          <AiOutlineEye className="text-white" size={35} />
          <h1 className="text-2xl text-center">{post.viewCount}</h1>
        </div>

        <div className="flex justify-evenly items-center">
          <button
            disabled={currentUser ? currentUser.uid === post.user.uid : true}
            onClick={() => handleLike()}
            className="disabled:opacity-20"
          >
            {liked ? (
              <AiFillLike size={35} className="text-green-500" />
            ) : (
              <AiOutlineLike size={35} className="text-white" />
            )}
          </button>
          <h1 className="text-2xl text-center">{likes}</h1>
        </div>

        <div className="flex justify-evenly items-center">
          <AiOutlineArrowDown className="text-white" size={35} />
          <h1 className="text-2xl text-center">
            {post.svgDownloads + post.pngDownloads}
          </h1>
        </div>
      </div>
    </div>
  );
}
export default PreviewPost;
