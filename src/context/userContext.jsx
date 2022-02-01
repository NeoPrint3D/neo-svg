import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { getDoc, doc } from "firebase/firestore/lite";

const CurrentUserContext = createContext(undefined);
const CurrentUserDispatchContext = createContext(undefined);
// A "provider" is used to encapsulate only the
// components that needs the state in this context
function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    //get the current user from firebase auth and set it to the state of the dayabase with the same id
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("got user");
        getDoc(doc(db, "users", user.uid)).then((snapshot) => {
          setCurrentUser(snapshot.data());
        });
      }
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserDispatchContext.Provider value={setCurrentUser}>
        {children}
      </CurrentUserDispatchContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export { CurrentUserProvider, CurrentUserContext, CurrentUserDispatchContext };
