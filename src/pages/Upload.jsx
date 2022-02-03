import { db, storage } from "../utils/firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore/lite";
import { useState, useEffect, useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uid as id } from "uid";
import { CurrentUserContext } from "../context/userContext";
4;
function Upload() {
  const currentUser = useContext(CurrentUserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [ID, setID] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const ID = id();
    console.log(currentUser);
    const fileRef = ref(storage, `/posts/${title}-${ID}`);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            setProgress(true);
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(fileRef);
        await setDoc(doc(db, "posts", ID), {
          title: title.replace(/\b\w/g, (l) => l.toUpperCase()),
          id: ID,
          description: description,
          file: downloadURL,
          created: serverTimestamp(),
          likeCount: 0,
          likedBy: [],
          viewCount: 0,
          viewedBy: [],
          downloadCount: 0,
          downloadedBy: [],
          tags: [],
          comments: [],
          user: {
            uid: currentUser.uid,
            username: currentUser.username,
            profilePic: currentUser.profilePic,
          },
        });
        setProgress(false);
      }
    );

    setTitle("");
    setDescription("");
    setFile("");
  }

  return (
    <div className="form-layout my-10">
      <div className="flex justify-center">
        <h5 className="text-5xl">Upload</h5>
      </div>
      <form className="">
        <div className="flex justify-center p-5 ">
          <input
            placeholder="Title"
            type="text"
            className="border-indigo-700 border-4 rounded-lg p-2 bg-slate-600 w-[30rem]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex justify-center p-5">
          <div className="flex flex-col justify-center items-center p-5 border-4 border-dashed rounded-2xl w-3/4">
            <input
              type="file"
              accept=".svg"
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && (
              <div className="flex justify-center items-center h-40 w-40">
                <img
                  src={URL.createObjectURL(file)}
                  className="border-4 border-purple-500 rounded-2xl"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center p-5">
          <textarea
            className="border-indigo-700 border-4 rounded-lg p-2 bg-slate-600 w-[30rem] h-[10rem]"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-center p-3">
          <button
            className={`${progress && "loading"} ${
              !title || !description
                ? "btn-disabled btn btn-error"
                : "btn btn-info scale-110"
            }`}
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
export default Upload;
