import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { SignIn } from "../components/Buttons";

function Profile(props) {
  const { uid } = useParams();
  const { currentUser, users } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    if (users) {
      users.docs.map((user) => {
        const userRef = user.data();
        console.log(userRef);

        if (userRef.uid === uid) {
          setUser(userRef);
        }
      });
    }
  }, [users]);
  return (
    <main className="glass w-3/4 h-5/6 rounded-2xl p-10">
      {user ? (
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <h1>Profile</h1>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex justify-center">
              <h5>{user.name}</h5>
              <FaRegEdit size={30} />
            </div>
            {true && (
              <div className="flex justify-center">
                <img
                  className="w-5/8 h-5/8 rounded-full border-purple-700 border-4 "
                  src={user.profilePic}
                  alt="user"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <SignIn />
        </div>
      )}
    </main>
  );
}
export default Profile;
