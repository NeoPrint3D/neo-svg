import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { db, auth } from "../utils/firebase";
import { FcGoogle } from "react-icons/fc";
import { setDoc, doc } from "firebase/firestore";
function SignIn() {
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const userRef = result.user;
      setDoc(doc(db, "users", userRef.uid), {
        uid: userRef.uid,
        username: userRef.displayName,
        email: userRef.email,
        profilePic: userRef.photoURL,
        folowers: [],
        following: [],
        created: Date.now(),
      }).then(() => {
        window.location.href = "/";
      });
    });
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
      className="btn  btn-outline"
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
