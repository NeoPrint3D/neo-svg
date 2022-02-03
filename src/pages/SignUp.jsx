import { SignIn } from "../components/GoogleSignIn";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { decrypt } from "../utils/encryption";
import { db, auth } from "../utils/firebase";
import EaseIn from "../components/EaseIn";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import {
  HiChevronLeft,
  HiOutlineKey,
  HiOutlineMailOpen,
  HiLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  limit,
  query,
  where,
} from "firebase/firestore/lite";
import userSchema from "../schemas/user";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isEmailTaken, setEmailTaken] = useState(false);
  const [isNameTaken, setNameTaken] = useState(false);

  const [vfCode, setVfCode] = useState("");
  const [vfCodeConfirm, setVfCodeConfirm] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const isVerified =
    email.length > 0 && password.length >= 6 && password === passwordConfirm;

  async function CreateNewUser(e) {
    e.preventDefault();
    if (vfCode === vfCodeConfirm) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          const schema = userSchema(user);
          setDoc(doc(db, "users", user.user.uid), {
            ...schema,
            username,
          }).then(() => {
            window.location.href = "/";
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Verification code does not match");
    }
  }

  async function resendAuthCode(e) {
    e.preventDefault();
    const url = `https://np3demail.herokuapp.com/auth?email=${email}&api_key=${
      import.meta.env.VITE_API_MAIL_KEY
    }`;
    await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setVfCode(decrypt(data.data, import.meta.env.VITE_HASH_KEY));
      });
  }

  async function sendAuthCode(e) {
    e.preventDefault();
    const url = `https://np3demail.herokuapp.com/auth?email=${email}&api_key=${
      import.meta.env.VITE_API_MAIL_KEY
    }`;

    const q1 = query(
      collection(db, "users"),
      where("username", "==", username),
      limit(1)
    );
    const q2 = query(
      collection(db, "users"),
      where("email", "==", email),
      limit(1)
    );

    const users = await getDocs(q1).then((snapshot) => {
      if (snapshot.docs.length > 0) {
        setNameTaken(true);
        return false;
      } else {
        return true;
      }
    });

    const emails = await getDocs(q2).then((users) => {
      if (users.docs.length > 0) {
        setEmailTaken(true);
        return false;
      }
      return true;
    });

    if (users || emails) {
      await fetch(url)
        .then((res) => {
          return res.json();
        })
        .then(async (data) => {
          setVfCode(decrypt(data.data, import.meta.env.VITE_HASH_KEY));
          setModalOpen(true);
        });
    } else {
      alert("Please check your credentials");
    }
  }

  return (
    <main>
      <div className="form-layout">
        {!modalOpen && (
          <EaseIn
            children={
              <>
                <form className="form-field" onSubmit={(e) => sendAuthCode(e)}>
                  <div className="flex justify-center mb-3">
                    <h5 className="text-4xl">Sign Up</h5>
                  </div>
                  <Input
                    icon={<HiOutlineUser className="text-2xl" />}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    badge={"badge-success"}
                    customClass={`${
                      isNameTaken ? "bg-red-300" : "bg-slate-900"
                    } input-field`}
                  />
                  <Input
                    icon={<HiOutlineMailOpen size={20} />}
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    badge={"badge-info"}
                    customClass={`${
                      isEmailTaken ? "bg-red-300" : "bg-slate-900"
                    } input-field`}
                  />

                  <Input
                    icon={<HiOutlineKey size={20} />}
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={"Password"}
                    badge={"badge-warning"}
                  />
                  <Input
                    icon={<HiLockClosed size={20} />}
                    type={"password"}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder={"Confirm Password"}
                    badge={"badge-error"}
                  />

                  <div className="flex justify-center mt-3">
                    <button
                      className="btn btn-outline text-white"
                      type="submit"
                      disabled={!isVerified}
                    >
                      Verify Email
                    </button>
                  </div>
                </form>
                <div className="flex justify-center translate-y-[.5rem]">
                  <Link to="/SignIn" className="text-purple-600 underline">
                    Already have an account
                  </Link>
                </div>
                <div className="divider">OR</div>
                <div className="flex justify-center">
                  <SignIn />
                </div>
              </>
            }
          />
        )}

        {modalOpen && (
          <EaseIn
            children={
              <>
                <div className="flex justify-start">
                  <button onClick={() => setModalOpen(false)}>
                    <HiChevronLeft size={20} />
                  </button>
                </div>
                <form
                  className="flex flex-col"
                  onSubmit={(e) => CreateNewUser(e)}
                >
                  <div className="flex justify-center mb-10">
                    <h1 className="text-4xl">Enter Auth Code</h1>
                  </div>
                  <div className="flex justify-center">
                    <input
                      className="text-center input-field text-black"
                      placeholder="* * * *"
                      type="text"
                      maxLength={4}
                      value={vfCodeConfirm}
                      onChange={(e) => setVfCodeConfirm(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <button
                      className="underline text-purple-600"
                      onClick={(e) => resendAuthCode(e)}
                    >
                      Resend auth code
                    </button>
                  </div>
                  <div className="flex justify-center mt-5">
                    <button className="btn btn-outline" type="submit">
                      Create new account
                    </button>
                  </div>
                </form>
              </>
            }
          />
        )}
      </div>
    </main>
  );
}

export default SignUpPage;