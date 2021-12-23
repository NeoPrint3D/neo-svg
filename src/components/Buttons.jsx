import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function SignIn(props) {
  const { auth } = props;
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <>
      <button className="btn btn-primary bg-indigo-600" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
}
//create a sign out button
function SignOut(props) {
  const { auth } = props;

  return (
    <button className="btn btn-primary bg-indigo-600 " onClick={() => signOut(auth)}>
      Sign out
    </button>
  );
}
export { SignIn, SignOut };
