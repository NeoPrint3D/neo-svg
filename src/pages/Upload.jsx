import { db, storage } from "../utils/firebase";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

function Upload(props) {
  const { currentUser } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const postRef = collection(db, "posts");

  async function SubmitPost() {
    await addDoc(postRef, {
      title: title,
      authorId: currentUser.uid,
      date: (Date.now() / 1000) | 0,
      downloadLink: downloadLink,
      like: 0,
    });
  }

  return (
    <div className="flex items-center justify-start bg-gray-100/10 h-[calc(100vh-4rem)] ">
      <form>
        <div className="p-5 border-4 border-dashed ">
          <input type="file" className="file:bg-purple-500 file:rounded-2xl" />
        </div>
        <div className="p-5 border-4 ">
          <input
            type="text"
            className="input input-primary input-bordered"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
export default Upload;
