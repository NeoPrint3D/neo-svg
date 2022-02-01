import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "../utils/firebase";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../context/userContext";

function Post() {
  const { id } = useParams();
  const currentUser = useContext(CurrentUserContext);
  const [post, setPost] = useState("");
  const [owns, setOwns] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "posts", id)).then((snapshot) => {
      setPost(snapshot.data());
      setOwns(currentUser.uid === snapshot.data().userId);
      console.log(owns);
    });
  }, [id, currentUser]);

  function getDownload() {
    fetch(post.file)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${post.title}.svg`;
        a.click();
      });
  }
  return (
    <main>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <p>{post.s}</p>
          <img id="image" className="h-20" src={post.file} />
          <button onClick={() => getDownload()}>download</button>
        </div>
      )}
    </main>
  );
}
export default Post;
