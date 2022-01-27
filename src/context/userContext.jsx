import React, { createContext, useState } from "react";
import { auth,db } from "../utils/firebase";
import { useEffect } from "react/cjs/react.development";
import { getDoc,doc } from "firebase/firestore";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);
// A "provider" is used to encapsulate only the
// components that needs the state in this context
function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    {
      auth.currentUser
        ? getDoc(doc(db, `users`, auth.currentUser.uid)).then((user) => {
            setUserDetails(user.data());
          })
        : setUserDetails('');
    }
  }, [auth.currentUser]);

  return (
    <UserContext.Provider value={userDetails}>
      <UserDispatchContext.Provider value={setUserDetails}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext, UserDispatchContext };
