import { db, storage } from "../utils/firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function Upload(props) {
  const { currentUser } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("currentUser", currentUser);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(currentUser);

    const fileRef = ref(storage, `${currentUser.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            
            setProgress(
              true
            );
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(fileRef);
        console.log("downloadURL", downloadURL);
        await addDoc(collection(db, "posts"), {
          title,
          description,
          file: downloadURL,
          createdAt: new Date(),
          user: {
            uid: currentUser.uid,
            name: currentUser.displayName,
            profilePic: currentUser.photoURL,
          },
        });
        setProgress(0);
      }
    );

    setTitle("");
    setDescription("");
    setFile("");
  }

  return (
    <div className="flex items-center justify-start bg-gray-100/10 h-[calc(100vh-4rem)] ">
      <form>
        <div className="p-5 border-4 border-dashed ">
          <input
            type="file"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700"
            onChange={(e) => setFile(e.target.files[0])}
          />
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
        <div className="p-5 border-4 ">
          <textarea
            className="input input-primary input-bordered"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="p-5 border-4 ">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
export default Upload;
