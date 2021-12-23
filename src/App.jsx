import { useState, useEffect } from "react";
import { db, auth } from "./utils/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { getDistance } from "./utils/location";
import useGeolocation from "react-navigator-geolocation";

// import neccesary function for firestore
function SignIn() {
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <>
      <button className="bg-slate-500 p-3" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
}
//create a sign out button
function SignOut() {
  return (
    <button className="bg-slate-500 p-3 rounded" onClick={() => signOut(auth)}>
      Sign out
    </button>
  );
}

function App() {
  const { coords } = useGeolocation();
  const [location, setLocation] = useState();
  const [userNow] = useAuthState(auth);
  const [users, setUsers] = useState([]);

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
        console.log(users);
        setUsers(users);
        console.log(users);
      });
    }
  }, [location]);
  useEffect(() => {
    if (userNow) {
      initailizeUser(userNow);
    }
  }, [userNow]);

  async function initailizeUser(user) {
    await setDoc(doc(db, "users", user.uid), {
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
    console.log(finalList);
    return finalList;
  }

  async function initailizeUser(user) {
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      profilePic: user.photoURL,
      location: location,
    });
  }

  return (
    <div className="bg-blue-500 h-screen flex justify-center items-center ">
      {userNow ? (
        <div className="flex flex-col items-center">
          <div>
            <SignOut />
          </div>

          <div className="carousel carousel-center">
            {users.map((user) => {
              return <Main user={user} />;
            })}
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

function Main(props) {
  const { user } = props;
  return (
    <div className="bg-red-400 rounded-3xl  mx-16 p-8 carousel-item">
      <div className="flex flex-col items-center mb-5">
        <h3 className="text-red-500 text-center">{user.name}</h3>
        <img className="rounded-full " src={user.profilePic} alt="profile" />
      </div>
    </div>
  );
}

export default App;
