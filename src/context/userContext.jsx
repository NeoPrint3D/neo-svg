import React, { createContext, useState } from "react";
import { auth, db } from "../utils/firebase";
import { useEffect } from "react/cjs/react.development";
import { getDoc, doc } from "firebase/firestore";

const CurrentUserContext = createContext(undefined);
const CurrentUserDispatchContext = createContext(undefined);
// A "provider" is used to encapsulate only the
// components that needs the state in this context
function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getUser();
  }, [auth.currentUser]);

  async function getUser() {
    if (auth.currentUser) {
      const userRef = await getDoc(doc(db, "users", auth.currentUser.uid));
      setCurrentUser(userRef.data());
    } else {
      setCurrentUser({});
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserDispatchContext.Provider value={setCurrentUser}>
        {children}
      </CurrentUserDispatchContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export { CurrentUserProvider, CurrentUserContext, CurrentUserDispatchContext };
