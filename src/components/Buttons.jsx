import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import {auth} from '../utils/firebase';

function SignIn() {
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
//create a sign in button
  return (
    <>
      <button
        className="bg-purple-900 p-3 rounded-2xl hover:ring ring-purple-500"
        onClick={signInWithGoogle}
      >
        Sign In
      </button>
    </>
  );
}
//create a sign out button
function SignOut() {

  return (
    <button
      className="bg-purple-800 p-3 rounded-2xl hover:bg-purple-800 hover:ring ring-purple-500"
      onClick={() => {
        signOut(auth);
      }}
    >
      Sign out
    </button>
  );
}
export { SignIn, SignOut };
