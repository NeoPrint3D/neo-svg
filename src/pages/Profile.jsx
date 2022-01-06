import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { FaRegEdit } from "react-icons/fa";

function Profile(props) {
  const { currentUser } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      getUser().then((user) => {
        setUser(user);
      });
    }
  }, [currentUser]);
  async function getUser() {
    const user = await getDoc(doc(db, "users", currentUser.uid));
    return user.data();
  }

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
        <div className="flex flex-col justify-center">
          sign in to view your profile
        </div>
      )}
    </main>
  );
}
export default Profile;
