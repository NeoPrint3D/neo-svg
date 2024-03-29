import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { db, auth } from "../utils/firebase";
import { FcGoogle } from "react-icons/fc";
import {
  setDoc,
  doc,
  getDocs,
  query,
  where,
  limit,
  collection,
} from "firebase/firestore/lite";
import userSchema from "../schemas/user";
function SignIn() {
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const q = query(
      collection(db,"users"),
      where("email", "==", result.user.email),
      limit(1)
    );

    const users = await getDocs(q);
    console.log(users);

    if (users.docs.length > 0) {
      console.log("user exists");
      window.location.href = "/";
    } else {
      const schema = userSchema(result);
      setDoc(doc(db, "users", result.user.uid), {
        username: result.user.displayName,
        profilePic: result.user.photoURL,
        ...schema,
      });
      window.location.href = "/";
    }
  }
  //create a sign in button
  return (
    <div>
      <button
        className="transition-all px-2 md:px-8 py-2 outline rounded hover:bg-purple-500 hover:scale-110"
        onClick={signInWithGoogle}
      >
        <div className="flex justify-evenly items-center">
          <FcGoogle size={35} />
          <div className="divider divider-vertical"></div>
          <p>Sign in with Google</p>
        </div>
      </button>
    </div>
  );
}
//create a sign out button
function SignOut() {
  return (
    <button
      className="btn btn-outline"
      onClick={() => {
        signOut(auth);
        window.location.href = "/";
      }}
    >
      Sign out
    </button>
  );
}
export { SignIn, SignOut };
