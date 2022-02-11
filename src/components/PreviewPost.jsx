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
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
import Img from "react-cool-img";
import placeholder from "../assets/placeholder.png";

function PreviewPost(props) {
  const { post } = props;
  const currentUser = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLikes(post.likes);
    if (currentUser) {
      currentUser.likedPosts.includes(post.id)
        ? setIsLiked(true)
        : setIsLiked(false);
    }
  }, []);

  const handleLike = async () => {
    if (isLiked) {
      setLikes(likes - 1);
      updateDoc(doc(db, `posts`, post.id), {
        likedBy: arrayRemove(currentUser.uid),
      });
      updateDoc(doc(db, `users`, currentUser.uid), {
        likedPosts: arrayRemove(post.id),
      });
    } else {
      updateDoc(doc(db, `posts`, post.id), {
        likedBy: arrayUnion(currentUser.uid),
      });
      updateDoc(doc(db, `users`, currentUser.uid), {
        likedPosts: arrayUnion(post.id),
      });
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleView = () => {
    if (currentUser.uid !== post.author) {
      updateDoc(doc(db, "posts", post.id), {
        views: post.views + 1,
      });
    }
  };

  return (
    <div className="bg-purple-600 rounded-2xl w-[95%] grid grid-rows-10 p-2 popup-container h-auto mx-auto">
      {/*header*/}
      <div className="grid grid-cols-5 items-center mt-2  row-span-3">
        <div className="flex justify-start col-span-1 mb-5">
          <Link to={`/user/${post.authorName}`}>
            <img
              className="w-12 h-12 rounded-full "
              src={post.authorPhoto}
              alt="user"
            />
          </Link>
        </div>

        <div className="flex flex-col items-center col-span-3">
          <h4 className="text-2xl text-center font-semibold">{post.title}</h4>
          <h3 className="flex justify-center text-sm ">{post.authorName}</h3>
        </div>
      </div>

      {/*image*/}
      <div className="flex justify-center items-center row-span-3">
        <Link to={`/post/${post.id}`}>
          <button className="b p-3 rounded-2xl" onClick={() => handleView()}>
            <Img
              className="transition-all max-h-56 rounded-lg active:scale-90 active:blur-sm hover:shadow-2xl "
              src={post.file}
              placeholder={placeholder}
              alt="loading"
            />
          </button>
        </Link>
      </div>

      {/*action button*/}
      <div className="grid grid-cols-3 row-span-3 mt-5">
        <div className="flex justify-evenly items-center">
          <AiOutlineEye className="text-white" size={35} />
          <h1 className="text-2xl text-center">{post.views}</h1>
        </div>

        <div className="flex justify-evenly items-center">
          <button
            disabled={currentUser ? currentUser.uid === post.author : true}
            onClick={() => handleLike()}
            className="disabled:opacity-20"
          >
            {isLiked ? (
              <AiFillLike
                size={35}
                className="transition-all text-green-500 hover:scale-90 active:text-purple-100"
              />
            ) : (
              <AiOutlineLike
                size={35}
                className="text-white transition-all  hover:scale-110 active:text-purple-100"
              />
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
