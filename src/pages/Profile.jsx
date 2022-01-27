import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import {userContext} from '../context/userContext'

function Profile(props) {
  const { username } = useParams();
  const { users } = props;
  const [owns, setOwns] = useState(false);
  const currentUser = useContext(userContext);

  useEffect(() => {
    if (currentUser.user.username === username) {
      setOwns(true);
    }
    else{
      setOwns(false);
    }
  }, [currentUser]);


  //querys the data by username

  return (
    <main className={`glass w-3/4 h-5/6 rounded-2xl p-10 `}>
      {user && currentUser ? (
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <h1>Profile</h1>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex justify-evenly">
              <h5>{user.username}</h5>
              {owns ? <FaRegEdit size={30} /> : <div></div>}
            </div>
            {user && (
              <div className="flex justify-center">
                {user.profilePic ? (
                  <img
                    className={`w-5/8 h-5/8 rounded-full  ${
                      owns ? "border-green-500" : "border-red-500"
                    } border-4 `}
                    src={user.profilePic}
                    alt="user"
                  />
                ) : (
                  <div
                    className={`flex justify-center items-center w-20 h-20 rounded-full bg-gray-700 border-4 ${
                      owns ? "border-green-500" : "border-red-500"
                    }`}
                  >
                    <h1 className="text-3xl text-center">
                      {user && `${user.username}`.charAt(0)}
                    </h1>
                  </div>
                )}
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
