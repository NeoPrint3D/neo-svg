import { Link } from "react-router-dom";

function Post(props) {
  const { post } = props;
  return (
    <div className="flex-col w-[15rem] h-[10rem] bg-slate-600 rounded-xl">
      <Link to={`/post/${post.id}`} className=" group">
      <div className="flex justify-center items-center mb-3">
        <h5 to={`/post/${post.id}`} className="text-base">
          {post.title}
        </h5>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-2/4">
          <img src={post.file} alt="post" />
        </div>
      </div>
      </Link>
    </div>
  );
}
export default Post;
