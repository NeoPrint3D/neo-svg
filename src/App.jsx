import { useState, useEffect } from "react";
import { db, auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import { SignIn, SignOut } from "./components/Buttons";
import Card from "./components/Card";
import CardPro from "./components/Cardpro";
import initialDetails from "./data/initialDetails";





import Search from './components/Search';



// import neccesary function for firestore

function App() {
  const [currentUser] = useAuthState(auth);
  const [users, loading] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  useEffect(() => {
    if (currentUser) {
      initailizeUser();
    }
  }, [currentUser]);

  async function makeOffline() {
    await updateDoc(db, "users", currentUser.uid, { status: false });
  }

  async function initailizeUser() {
    console.log("initailizeUser");
    await setDoc(doc(db, "users", currentUser.uid), {
      uid: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email,
      profilePic: currentUser.photoURL,
      status: true,
    });
  }

  return (
    <div className=" bg-gradient-to-tr from-gray-600 via-gray-800 to-gray-500 h-screen ">
      <header
        id="header"
        className="grid grid-cols-2 outer-color p-5 top border border-b-4 border-green-500 glass "
      >
        <div className="flex justify-start text-center align-middle">
          <h5 className="text-3xl self-center fomt-logo ">WhoAround</h5>
        </div>
        <div className="flex justify-end gap-3 sm:gap-5 text-center place-items-center text-xs sm:text-sm">
          {currentUser ? (
            <div className="flex justify-evenly items-center gap-5">
              <div className="avatar">
                <div className="h-16 rounded-full ring ring-primary ring-offset-base-100">
                  <img src={currentUser.photoURL} alt="profile" />
                </div>
              </div>
              <SignOut auth={auth} makeOffline={makeOffline} />
            </div>
          ) : (
            <SignIn auth={auth} />
          )}
        </div>
      </header>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-7.5rem)]">
        <div className="flex flex-col items-center w-full">
          <div className="carousel carousel-center w-10/12 h-[360px] glass p-5 rounded-box overflow-auto">
            {loading && <div>Loading...</div>}
            {users && currentUser ? (
              users.docs.map((user) => {
                if (user.id !== currentUser.uid) {
                  return <CardPro user={user.data()} />;
                }
              })
            ) : (
              <div className="flex h-full w-full justify-center items-center">
                <h5 className="text-4xl"> Sign in to see who's on</h5>
              </div>
            )}
          </div>
        </div>
      </div>


     
    </div>
  );
}






export default App;




