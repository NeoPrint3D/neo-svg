import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

function Profile(props) {
  const { uid } = useParams();
  const { currentUser, users } = props;
  const [owns, setOwns] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (users && currentUser) {
      users.docs.map((user) => {
        const userRef = user.data();
        if (userRef.uid === uid) {
          console.log(currentUser.uid);
          if (currentUser.uid === userRef.uid) {
            setOwns(true);
          }
          setUser(userRef);
        }
      });
    }
  }, [uid]);
  return (
    <main className={`glass w-3/4 h-5/6 rounded-2xl p-10 `}>
      {user ? (
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <h1>Profile</h1>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex justify-center">
              <h5>{user.name}</h5>
              {owns ? (
              <FaRegEdit size={30} />
              ) : (
                <div></div>
              )}
            </div>
            {true && (
              <div className="flex justify-center">
                <img
                  className={`w-5/8 h-5/8 rounded-full  ${
                    owns ? "border-green-500" : "border-red-500"
                  } border-4 `}
                  src={user.profilePic}
                  alt="user"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          loading...
        </div>
      )}
    </main>
  );
}
export default Profile;
