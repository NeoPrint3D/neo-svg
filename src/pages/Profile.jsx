import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { CurrentUserContext } from "../context/userContext";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";

function Profile(props) {
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
      where("username", "==", username)
    );
    await getDocs(q).then((users) => {
      console.log(users.docs[0].data());
      setUser(users.docs[0].data());
    });
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
