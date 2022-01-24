import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import googleSVG from "../assets/google.svg";

function SignIn() {
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  //create a sign in button
  return (
    <div>
      <button
        className="px-4 md:px-8 py-2 outline rounded hover:bg-purple-500"
        onClick={signInWithGoogle}
      >
        <div className="flex justify-evenly items-center">
          <img className="h-10" src={googleSVG} alt="google" />
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
    <button className="btn  btn-outline" onClick={() => signOut(auth)}>
      Sign out
    </button>
  );
}
export { SignIn, SignOut };
