import { useState, useEffect } from "react";
import { db, auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import { SignIn, SignOut } from "./components/Buttons";
import Card from "./components/Card";
import { BiSearch } from "react-icons/bi";

import people from "./data/list";

function App() {
  const [currentUser] = useAuthState(auth);
  const [search, setSearch] = useState("");
  const [users, loading] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  // const users = people;
  useEffect(() => {
    console.log(users);
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
      <header className="bg-gray-900 h-16 grid grid-cols-3">
        <div className="flex justify-start items-center ml-3">
          <h5 className="text-xl">Who Around</h5>
        </div>
        <div className="flex justify-center items-center">
          <div class="form-control">
            <div class="flex space-x-2">
              <input
                placeholder="Search"
                class="w-full input input-primary input-bordered"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button class="btn btn-primary">
                <BiSearch size={30} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center mr-3">
          {currentUser ? (
            <div className="dropdown dropdown-end">
              <button>
                <img
                  className="w-14 h-14 rounded-full border-purple-700 border-4 "
                  src={currentUser.photoURL}
                  alt="user"
                />
              </button>
              <div
                tabindex="0"
                className="dropdown-content bg-slate-900 w-52 rounded p-5 border-purple-500 border-4"
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
          <div
            className={`carousel carousel-center w-[30rem] p-5  bg-indigo-900/50 rounded-box overflow-auto border-indigo-200 ${
              search && "border-4"
            }`}
          >
            {users && currentUser ? (
              users.docs.map((user) => {
                if (
                  user.data().name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return <Card key={user.data().uid} user={user.data()} />;
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
