import { useState } from "react";
import { Link } from "react-router-dom";
import EaseIn from "../components/EaseIn";
import Input from "../components/Input";
import { SignIn } from "../components/GoogleSignIn";
import { auth } from "../utils/firebase";
import { HiOutlineKey, HiOutlineMailOpen } from "react-icons/hi";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <main>
      <div className="form-layout">
        <EaseIn
          children={
            <>
              <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex justify-center mb-10">
                  <h5 className="text-4xl">Sign In</h5>
                </div>
                <Input
                  icon={<HiOutlineMailOpen size={20} />}
                  type={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  badge={"badge-info"}
                  placeholder={"Email"}
                />
                <Input
                  icon={<HiOutlineKey size={20} />}
                  type={"current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  badge={"badge-warning"}
                  placeholder={"Password"}
                  customClass={" mt-2"}
                />
                <div className="flex justify-center mt-5">
                  <button className="btn btn-outline text-white" type="submit">
                    Sign In
                  </button>
                </div>
              </form>
              <div className="flex justify-center translate-y-[.5rem]">
                <Link to="/SignUp" className="text-purple-600 underline">
                  Create an account
                </Link>
              </div>
              <div className="divider">OR</div>
              <div className="flex justify-center">
                <SignIn />
              </div>
            </>
          }
        />
      </div>
    </main>
  );
}

export default SignInPage;