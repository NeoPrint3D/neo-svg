import { db } from "../utils/firebase";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";

function Upload(props) {
  const { currentUser } = props;
  const postRef = collection(db, "posts");

  async function SubmitPost() {
    await addDoc(postRef, {
      title: title,
      authorId: currentUser.uid,
      date: (Date.now() / 1000) | 0,
      downloadLink: downloadLink,
      like: 0
    });
  }

  return <div></div>;
}
export default Upload;
