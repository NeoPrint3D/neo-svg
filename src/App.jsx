import { useState, useEffect } from "react";
import { db, auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { getDistance } from "./utils/location";
import useGeolocation from "react-navigator-geolocation";
import { SignIn, SignOut } from "./components/Buttons";

// import neccesary function for firestore

function App() {
  const { coords } = useGeolocation();
  const [location, setLocation] = useState();
  const [userNow] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (userNow) {
      initailizeUser(userNow);
    }
  }, [userNow]);
  useEffect(() => {
    setLocation(
      coords && {
        lat: coords.latitude,
        lng: coords.longitude,
      }
    );
  }, [coords]);

  useEffect(() => {
    if (location) {
      getUsers(location).then((users) => {
        setUsers(users);
      });
    }
  }, [location]);

  async function initailizeUser(user) {
    console.log("initailizeUser");
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      profilePic: user.photoURL,
      location: location,
    });
  }
  //gets distance in feet of two locations code works for both lat and long

  async function getUsers(loc) {
    const itemList = [];
    const finalList = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      itemList.push(doc.data());
    });
    itemList.forEach((item) => {
      const distance = getDistance(
        item.location.lat,
        item.location.lng,
        loc.lat,
        loc.lng
      );
      if (distance < 100000) {
        finalList.push(item);
      }
    });
    return finalList;
  }

  return (
    <div className=" bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-500 h-screen ">
      <header
        id="header"
        className="grid grid-cols-2 outer-color p-5 top border-b-4 border-green-500 glass "
      >
        <div className="flex justify-start text-center align-middle">
          <h5 className="text-3xl self-center ">WhoAround</h5>
        </div>
        <div className="flex justify-end gap-3 sm:gap-5 text-center place-items-center text-xs sm:text-sm">
          {userNow ? <SignOut auth={auth} /> : <SignIn auth={auth} />}
        </div>
      </header>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-7.5rem)]">
        {userNow ? (
          <div className="flex flex-col items-center w-full">
            <div className="carousel carousel-center w-3/4 glass p-5 rounded-box overflow-auto">
              {users.map((user) => {
                if (user.uid !== userNow.uid) {
                  console.log(user);
                  console.log(user.uid, userNow.uid);
                  return <Main user={user} />;
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        ) : (
         <div>
            <h1 className="text-center text-6xl">Sign in to see who around you</h1>
         </div>
        )}
      </div>
    </div>
  );
}

function Main(props) {
  const { user } = props;
  return (
    <div className="mx-16">
      <div className="card bg-indigo-900 w-48  h-[20rem] card-bordered lg:card-normal">
        <figure>
          <img className="" src={user.profilePic} alt="profile" />
        </figure>
        <div className="">
          <h2 className=" card-title text-center">{user.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
