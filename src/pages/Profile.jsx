import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { CurrentUserContext } from "../context/userContext";
import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore/lite";

function Profile() {
  const { username } = useParams();
  const currentUser = useContext(CurrentUserContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
    console.log(username);
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

  //querys the data by username
  return (
    <main>
      {user && (
        <div>
          <h1>{user.username}</h1>
        </div>
      )}
    </main>
  );
}
export default Profile;
