import { getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore/lite";
import { db, storage } from "../utils/firebase";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { CurrentUserContext } from "../context/userContext";
import { encrypt } from "../utils/encryption";
import Loading from "../components/Loading";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineArrowDown,
  AiOutlineEye,
} from "react-icons/ai";

function Post() {
  const { id } = useParams();
  const currentUser = useContext(CurrentUserContext);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState("");
  const [owns, setOwns] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "posts", id)).then((snapshot) => {
      setPost(snapshot.data());
      setOwns(snapshot.data().author === currentUser.uid);
    });
  }, [id, currentUser]);

  useEffect(() => {
    setLikes(post.likes);
    if (currentUser && post) {
      post.likedBy.includes(currentUser.uid) ? setLiked(true) : setLiked(false);
    }
  }, [currentUser, post]);

  async function deletePost() {
    if (window.confirm("are you sure you want to delete this post?") && owns) {
      deleteObject(ref(storage, "/images/" + post.id));
      deleteDoc(doc(db, "posts", id));
      await fetch("http://localhost:8080/deleteIndex", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: encrypt(post.id, import.meta.env.VITE_HASH_KEY),
          key: import.meta.env.VITE_POST_KEY,
        }),
      });
      window.location.href = "/";
    }
  }

  const handleLike = async () => {
    if (liked && currentUser) {
      setLikes(likes - 1);
      updateDoc(doc(db, "posts", post.id), {
        likedBy: post.likedBy.filter((id) => id !== currentUser.uid),
        likes: likes - 1,
      });

      updateDoc(doc(db, "users", currentUser.uid), {
        liked: currentUser.liked.filter((id) => id !== post.id),
      });
      setLiked(false);
    } else {
      setLikes(likes + 1);
      updateDoc(doc(db, "posts", post.id), {
        likedBy: [...post.likedBy, currentUser.uid],
        likes: likes + 1,
      });
      updateDoc(doc(db, "users", currentUser.uid), {
        liked: [...currentUser.liked, post.id],
      });
      setLiked(true);
    }
  };

  async function downloadSvg() {
    updateDoc(doc(db, "posts", id), {
      svgDownloads: post.svgDownloads + 1,
    });
    await fetch(post.file)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        //make the download link

        return url;
      });
  }

  async function downloadPng() {
    updateDoc(doc(db, "posts", id), {
      pngDownloads: post.pngDownloads + 1,
    }).then(() => {});
    await fetch(post.file)
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const svg = window.URL.createObjectURL(blob);
        const png = document.createElement("img");
        png.src = svg;
        png.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = png.width;
          canvas.height = png.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(png, 0, 0);
          const dataURL = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = `${post.title}.png`;
          link.href = dataURL;
          link.click();
        };
      });
  }

  return post ? (
    <div className="flex justify-center my-10">
      <div className=" w-11/12 bg-gray-900 rounded-2xl p-10 ">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl font-bold text-center">{post.title}</h1>
              <p className="text-center text-md">{`By: ${post.authorName}`}</p>
            </div>
          </div>
          {owns && (
            <div className="flex flex-col gap-3">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          )}

          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-2xl">
                <img src={post.file} alt="" className=" max-h-96 m-4 " />
              </div>
              <div>{post.description}</div>
            </div>
            <div className="flex justify-center ">
              <div className="grid grid-cols-3 w-96">
                <div className="flex justify-center items-center gap-5">
                  <AiOutlineEye size={45} className="text-4xl" />
                  <h5 className="text-3xl font-bold">{post.views}</h5>
                </div>
                <div className="flex justify-center items-center gap-5">
                  <AiOutlineArrowDown size={45} className="text-4xl" />
                  <h5 className="text-3xl font-bold">
                    {post.svgDownloads + post.pngDownloads}
                  </h5>
                </div>

                <div className="flex justify-center items-center gap-5">
                  <button
                    className="disabled:opacity-10"
                    disabled={owns || !currentUser}
                    onClick={() => handleLike()}
                  >
                    {liked ? (
                      <AiFillLike
                        size={45}
                        className="transition-all text-green-500 hover:scale-90 active:text-purple-100"
                      />
                    ) : (
                      <AiOutlineLike
                        size={45}
                        className="text-white transition-all  hover:scale-110 active:text-purple-100"
                      />
                    )}
                  </button>
                  <h1 className="text-2xl font-bold text-center">{likes}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-10">
            <button
              onClick={() => downloadPng()}
              className="transition-all bg-blue-500 pl-3 pr-4 font-bold  py-4 rounded-2xl hover:bg-purple-400 hover:scale-105"
            >
              <h5>Download PNG</h5>
            </button>
            <button
              onClick={() => downloadSvg()}
              className="transition-all bg-blue-500 px-5 py-4 font-bold  rounded-2xl hover:bg-purple-400 hover:scale-105"
            >
              <h5>Download SVG</h5>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
export default Post;
