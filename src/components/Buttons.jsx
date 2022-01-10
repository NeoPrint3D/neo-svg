import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function SignIn(props) {
  const { auth } = props;
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

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
function SignOut(props) {
  const { auth } = props;

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
