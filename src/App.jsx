import { useState, useEffect } from "react";
import { db, auth } from "./utils/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { getLocation, getDistance } from "./utils/location";

// import neccesary function for firestore
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

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
  const [location, setLocation] = useState(null);
  const [user] = useAuthState(auth);
  //gets distance in feet of two locations code works for both lat and long

  useEffect(() => {
    //updates location ever 5 minutes
    getLocation(setLocation);
    console.log(location);
    const interval = setInterval(() => {
      getLocation(setLocation)
      console.log(location);
    }
    , 300000);
    return () => clearInterval(interval);

  }, []);
  //sets location1 and store it in firestore

  async function TestDB() {
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      profilePic: user.photoURL,
      location: location,
    });
  }

  return (
    <div className="bg-blue-500 h-screen flex justify-center items-center ">
      {user ? (
        <Main location={location} TestDB={TestDB} user={user} />
      ) : (
        <SignIn />
      )}
    </div>
  );
}

function Main(props) {
  const { location, TestDB, user } = props;
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col items-center mb-5">
        <h3 className="text-red-500 text-center">Welcome {user.displayName}</h3>
        <img
          className="rounded-full h-16 w-16"
          src={user.photoURL}
          alt="profile"
        />
      </div>
      <div className="flex justify-evenly mb-5">
        <button className="bg-emerald-500 p-3" onClick={TestDB}>
          TestDB
        </button>
        <SignOut />
      </div>

      {location ? (
        <div className="flex flex-col items-center">
          <h3 className="text-red-500 text-center">
            Your location is {location.lat} {location.lng}
          </h3>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h3 className="text-red-500 text-center">Loading location</h3>
        </div>
      )}
    </div>
  );
}

export default App;
