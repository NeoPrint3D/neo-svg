import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { CurrentUserContext } from "../context/userContext";

import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore/lite";
import { sendPasswordResetEmail } from "firebase/auth";
import { encrypt } from "../utils/encryption";

function Profile() {
  const { username } = useParams();
  const currentUser = useContext(CurrentUserContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      limit(1)
    );
    const user = await getDocs(q);
    setUser(user.docs[0].data());
  }

  async function deleteUserAccount() {
    console.log(user.uid);

    //post the user id to the server
    fetch("https://neo-svg-backend.vercel.app/deleteUser", {
      method: "POST",
      headers: {
        //utf-8
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: encrypt(user.uid, import.meta.env.VITE_HASH_KEY),
        key: import.meta.env.VITE_USER_KEY,
      }),
    });
    //delete the user account
  }

  //querys the data by username
  return (
    <main>
      {user && (
        <div className="flex flex-col">
          <h1>{user.username}</h1>
          {/* <button
            onClick={async () => {
              await sendPasswordResetEmail(auth, user.email);
            }}
          >
            Reset Password
          </button>
          <button
            onClick={() => {
              deleteUserAccount();
            }}
          >
            Delete Account
          </button> */}
        </div>
      )}
    </main>
  );
}
export default Profile;
