import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useState, useEffect } from "react";
// export default Card;
function Card(props) {
  const { user, currentUser } = props;
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists) {
          const userRef = docSnap.data();
          if (userRef.following.includes(user.uid)) {
            setIsFollowing(true);
          }
        }
      });
    }
  }, [currentUser, user]);

  async function toggleFollow() {
    if (currentUser) {
      const userRef = doc(db, "users", user.uid);
      const currentRef = doc(db, "users", currentUser.uid);

      const userDoc = await getDoc(userRef);
      const currentDoc = await getDoc(currentRef);

      if (userDoc.exists && currentDoc.exists) {
        const userData = userDoc.data();
        const currentData = currentDoc.data();
        const followers = userData.followers || [];
        const following = currentData.following || [];

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
      }
      setIsFollowing(!isFollowing);
    }
  }

  return (
    <div className="flex-col w-[15rem] h-[10rem] bg-slate-600 rounded-xl">
      <div className="flex justify-center items-center mb-3">
        <img
          className="w-16 h-16 rounded-full border-purple-700 border-4 "
          src={user.profilePic}
          alt="user"
        />
      </div>
      <div className="flex justify-center items-center">
        <h5 className="text-base">{user.name}</h5>
      </div>
      <div className="flex justify-center items-center">
        <button
          className={`btn btn-outline ${!isFollowing ? "btn-success" : "btn-ghost"}`}
          onClick={() => toggleFollow()}
        >
          {!isFollowing ? "follow" : "unfollow"}
        </button>
      </div>
    </div>
  );
}

export default Card;
