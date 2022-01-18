import { SignIn } from "../components/Buttons";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
} from "firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const actionCodeSettings = {
    url: "https://localhost:3000/SignIn",
    handleCodeInApp: true,
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (password === passwordConfirm) {
      //send a link to confirm the account

      console.log("send a link to confirm the account");

      //create a new user
    }
  }

  async function initailizeUser() {
    const docSnap = await getDoc(doc(db, "users", currentUser.uid));
    if (!docSnap.exists) {
      await setDoc(doc(db, "users", user), {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        profilePic: currentUser.photoURL,
        folowers: [],
        following: [],
      });
    } else {
      console.log("user already exists");
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              class="input input-bordered"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="password"
              class="input input-bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="form-control mt-3">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              type="text"
              placeholder="password"
              class="input input-bordered"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <div class="form-control mt-6">
            <input
              type="submit"
              value="Login"
              class="btn btn-primary"
              onClick={handleSubmit}
            />
          </div>
          <div class="form-control mt-3">
            <SignIn />
          </div>
          <div class="form-control mt-5">
            <Link to="/SignUp">New here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
