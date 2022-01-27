import { getDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../context/userContext";

function Post(props) {
  const { id } = useParams();
  const currentUser = useContext(CurrentUserContext);
  const { posts } = props;
  const [post, setPost] = useState("");
  const [owns, setOwns] = useState(false);
  useEffect(() => {
    if (posts && currentUser) {
      posts.map((post) => {
        if (post.id === id) {
          if (post.user.uid === currentUser.uid) {
            setOwns(true);
          }
          setPost(post);
        }
      });
    }
  }, [posts, currentUser, id]);

  return (
    <main className="glass w-3/4 h-5/6 rounded-2xl p-10">
      <h5>{post.title}</h5>
    </main>
  );
}
export default Post;
