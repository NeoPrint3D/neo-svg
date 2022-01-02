import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useEffect } from "react";

function SignIn(props) {
  const { auth } = props;
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <>
      <button className="btn bg-slate-600" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
}
//create a sign out button
function SignOut(props) {
  const { auth,makeOffline } = props;


  return (
    <button className="btn  bg-slate-600 " onClick={() => {signOut(auth);makeOffline();}}>
      Sign out
    </button>
  );
}
export { SignIn, SignOut };
