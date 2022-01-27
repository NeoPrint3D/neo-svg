import { Link } from "react-router-dom";
import {
  AiOutlineLike,
  AiOutlineArrowDown,
  AiOutlineEye,
} from "react-icons/ai";
import { motion } from "framer-motion";


function PostCard(props) {
  const { post } = props;
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div
      className="carousel-item grid grid-rows-10 justify-self-center bg-slate-600 rounded-lg p-3 carousel-item w-10/12 max-w-[20rem] shadow-md shadow-purple-900 gap-3 max-h-[15rem]"
      variants={item}
      key={post.id}
    >
      <div className="flex flex-col justify-items-center row-span-2">
        <h5 className="text-xl text-center">{post.title}</h5>
        <h1 className="text-xs text-center text-blue-500">
          {post.user.name}
        </h1>
      </div>
      <Link className="flex justify-center items-center row-span-6" to={`/post/${post.id}`}>
        <img
          className="transition-all w-2/4 rounded-lg active:scale-90 active:blur-sm hover:-hue-rotate-60 max-h-[5rem]"
          src={post.file}
          alt="loading"
        />
      </Link>

      <div className="grid grid-cols-3">
        <div className="flex justify-evenly items-center">
          <AiOutlineEye className="text-blue-500" size={30} />
          <h1 className="text-xl text-center">{post.views}</h1>
        </div>
        <div className="flex justify-evenly items-center">
          <button>
            <AiOutlineLike
              className="text-blue-500 hover:text-green-600 hover:scale-110"
              size={30}
            />
          </button>
          <h1 className="text-xl text-center">{post.likes}</h1>
        </div>

        <div className="flex justify-evenly items-center">
          <AiOutlineArrowDown className="text-blue-500" size={30} />
          <h1 className="text-xl text-center">{post.downloads}</h1>
        </div>
      </div>
    </motion.div>
  );
}
export default PostCard;
