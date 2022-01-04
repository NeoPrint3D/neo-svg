import { useState, useEffect } from "react";
import { db, auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";

import menuIMG from "./assets/menu.svg";
import { SignIn, SignOut } from "./components/Buttons";
import Card from "./components/Card";

import { MdOutlineSearch } from "react-icons/md";

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
    <div className="h-screen bg-gradient-to-tr from-gray-600 via-gray-800 to-gray-500 bg-fixed">
      <header className="bg-gray-900 h-16 grid grid-cols-2">
        <div className="flex justify-start items-center ml-3">
          <h5 className="text-3xl">Who Around</h5>
        </div>
        <div className="flex justify-end items-center mr-3">
          {currentUser ? (
            <div className="dropdown dropdown-end">
              <button className="">
                <img
                  className="w-14 h-14 rounded-full border-green-700 border-4"
                  src={currentUser.photoURL}
                  alt="user"
                />
              </button>
              <div
                tabindex="0"
                class="dropdown-content bg-slate-900 w-52 rounded p-5 border-red-500 border-4"
              >
                <div className="flex justify-around">
                  <SignOut auth={auth} makeOffline={makeOffline} />
                </div>
                <div className="flex justify-center"></div>
              </div>
            </div>
          ) : (
            <SignIn auth={auth} />
          )}
        </div>
      </header>

      <main className="grid grid-cols-2 h-[calc(100vh-4rem)]">
        <div className="flex justify-center items-center">
          <div className="carousel carousel-center w-[30rem] glass p-5 rounded-box overflow-auto z-0">
            {users && currentUser ? (
              users.docs.map((user) => {
                if (user.id !== currentUser.uid) {
                  return <Card className="" user={user.data()} />;
                }
              })
            ) : (
              <div className="flex h-full w-full justify-center items-center">
                <h5 className="text-4xl"> Sign in to see who's on</h5>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
