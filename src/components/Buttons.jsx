import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import googleSVG from '../assets/google.svg'

function SignIn() {
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      console.log(user);
    });

  }
  //create a sign in button
  return (
    <>
      <button className="btn btn-outline btn-accent" onClick={signInWithGoogle}>
        <div>
          <img
            className="h-10"
            src={googleSVG}
          />
        </div>
      </button>
    </>
  );
}
//create a sign out button
function SignOut() {
  return (
    <button className="btn btn-outline" onClick={() => signOut(auth)}>
      Sign out
    </button>
  );
}
export { SignIn, SignOut };
