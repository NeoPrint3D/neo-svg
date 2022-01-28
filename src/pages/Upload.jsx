import { db, storage } from "../utils/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uid as id } from "uid";
function Upload(props) {
  const { currentUser } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [ID, setID] = useState("");

  useEffect(() => {
    setID(id(16));
    console.log(ID);
  }, [progress]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(currentUser);
    const fileRef = ref(storage, `/posts/${currentUser.uid}-${file.name}`);
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
        console.log("downloadURL", downloadURL);
        await setDoc(doc(db, "posts", ID), {
          title: title,
          id: ID,
          description: description,
          file: downloadURL,
          created: new Date(),
          likes: 0,
          views: 0,
          tags: [],
          comments: [],
          user: {
            uid: currentUser.uid,
            name: currentUser.name,
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
    <main>
      <div className="flex justify-center">
        <h5 className="text-5xl">Upload</h5>
      </div>
      <form className="border-4 rounded-3xl">
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
    </main>
  );
}
export default Upload;
