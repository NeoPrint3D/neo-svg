import { useCollection } from "react-firebase-hooks/firestore";

function Post(props) {
  const { post } = props;
  return (
    <div className="flex-col w-[15rem] h-[10rem] bg-slate-600 rounded-xl">
      <div className="flex justify-center items-center mb-3"></div>
      <div className="flex justify-center items-center">
        <h5 className="text-base">{post.title}</h5>
      </div>
      <div className="flex justify-center items-center"></div>
    </div>
  );
}
export default Post;
