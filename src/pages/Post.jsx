import { getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore/lite";
import { db, storage } from "../utils/firebase";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { CurrentUserContext } from "../context/userContext";
import Loading from "../components/Loading";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDownload,
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
      setOwns(snapshot.data().user.uid === currentUser.uid);
    });
  }, [id, currentUser]);

  useEffect(() => {
    setLikes(post.likeCount);
    if (currentUser && post) {
      post.likedBy.includes(currentUser.uid) ? setLiked(true) : setLiked(false);
    }
  }, [currentUser, post]);

  function deletePost() {
    deleteObject(ref(storage, `/posts/${post.title}-${posy.id}`)).then(() => {
      deleteDoc(doc(db, "posts", id)).then(() => {
        window.location.href = "/";
      });
    });
  }

  const handleLike = async () => {
    if (currentUser) {
      if (liked) {
        setLikes(likes - 1);
        updateDoc(doc(db, "posts", post.id), {
          likedBy: post.likedBy.filter((id) => id !== currentUser.uid),
          likeCount: likes - 1,
        });

        updateDoc(doc(db, "users", currentUser.uid), {
          liked: currentUser.liked.filter((id) => id !== post.id),
        });
        setLiked(false);
      } else {
        setLikes(likes + 1);
        updateDoc(doc(db, "posts", post.id), {
          likedBy: [...post.likedBy, currentUser.uid],
          likeCount: likes + 1,
        });
        updateDoc(doc(db, "users", currentUser.uid), {
          liked: [...currentUser.liked, post.id],
        });
        setLiked(true);
      }
    }
  };

  async function downloadSvg() {
    updateDoc(doc(db, "posts", id), {
      svgDownloads: 0,
    });
    await fetch(post.file)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        //make the download link
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `${post.title}.svg`;
        document.body.appendChild(a);
        a.click();
      });
  }

  async function downloadPng() {
    await updateDoc(doc(db, "posts", id), {
      pngDownloads: 0,
    }).then(() => {
      console.log("done");
    });
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
      <div className=" w-11/12 bg-slate-900 rounded-2xl p-10 ">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl font-bold text-center">
                {post.title.replace(/\b\w/g, (l) => l.toUpperCase())}
              </h1>
              <p className="text-center text-md">{`By: ${post.user.username}`}</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex justify-center">
              <div className="bg-purple-600 rounded-2xl">
                <img src={post.file} alt="" className=" max-h-96 m-4 " />
              </div>
            </div>
            <div className="flex justify-center ">
              <div className="grid grid-cols-3 w-3/4">
                <div className="flex justify-center items-center gap-5">
                  <AiOutlineEye size={45} className="text-4xl" />
                  <h5 className="text-3xl font-bold">
                    {post.svgDownloads + post.pngDownloads}
                  </h5>
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
                      <AiFillLike size={40} className="text-green-500" />
                    ) : (
                      <AiOutlineLike size={40} />
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
