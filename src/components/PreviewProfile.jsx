import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";
import { useState, useEffect } from "react";
// export default Card;
function PreviewProfile(props) {
  const { user } = props;
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    //determine if the current user is following the user
    if (currentUser) {
      if (user.followers.includes(currentUser.uid)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    }
  }, [currentUser, user]);

  async function toggleFollow() {
    if (currentUser) {
      const userRef = doc(db, "users", user.uid);
      const currentRef = doc(db, "users", currentUser.uid);
      const followers = user.followers || [];
      const following = currentUser.following || [];
      if (!followers.includes(currentUser.uid)) {
        followers.push(currentUser.uid);
        await updateDoc(userRef, { followers });
        await updateDoc(currentRef, { following: [...following, user.uid] });
      } else {
        const index = followers.indexOf(currentUser.uid);
        followers.splice(index, 1);
        await updateDoc(userRef, { followers });
        await updateDoc(currentRef, {
          following: following.filter((uid) => uid !== user.uid),
        });
      }
      setIsFollowing(!isFollowing);
    }
  }


  return (
    <div className="flex-col w-[15rem] h-[10rem] bg-slate-600 rounded-xl">
      <Link to={`user/${user.uid}`} className=" group">
        <div className="flex justify-center items-center mb-3">
          <img
            className="group-hover:border-emerald-500 w-16 h-16 rounded-full border-purple-700 border-4 "
            src={user.profilePic}
            alt="user"
          />
        </div>
      </Link>
      <div className="flex justify-center items-center">
        <h5 className="text-base">{user.name}</h5>
      </div>

      <div className="flex justify-center items-center">
        <button
          className={`btn ${
            !isFollowing ? "btn-success" : "btn-ghost btn-outline"
          }`}
          onClick={() => toggleFollow()}
        >
          {!isFollowing ? "follow" : "unfollow"}
        </button>
      </div>
    </div>
  );
}

export default Card;
