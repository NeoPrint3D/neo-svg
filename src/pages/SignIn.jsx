import { SignIn, SignOut } from "../components/Buttons";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { decrypt } from "../utils/encryption";
import axios from "axios";
import { db, auth } from "../utils/firebase";
import EaseIn from "../components/EaseIn";
import { Link } from "react-router-dom";
import {
  HiChevronLeft,
  HiCheck,
  HiExclamation,
  HiOutlineKey,
  HiOutlineMailOpen,
  HiLockClosed,
} from "react-icons/hi";

import { doc, getDoc, setDoc, query, where } from "firebase/firestore";

function SignUpPage(props) {
  const { users } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [taken, setTaken] = useState(false);

  const [vfCode, setVfCode] = useState("");
  const [vfCodeConfirm, setVfCodeConfirm] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const isVerified =
    email.length > 0 &&
    password.length > 6 &&
    passwordConfirm.length > 0 &&
    password === passwordConfirm;

  async function Test(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      alert(error.message);
    });
    const userRef = auth.currentUser;
    //make sure the username isnt already taken
    if (users) {
      // await setDoc(doc(db, "users", userRef.uid), {
      //   uid: userRef.uid,
      //   name: username || userRef.displayName,
      //   email: email || userRef.email,
      //   profilePic: userRef.photoURL || "",
      //   folowers: [],
      //   following: [],
      // });
    }
  }

  useEffect(() => {
    //check if the username is already taken

    if (users) {
      console.log(users.docs)
      users.docs.forEach((user) => {
        const userRef = user.data();
        if (userRef.name === username) {
          console.log("username taken");
          setTaken(true);
        } else {
          console.log("username not taken");
          setTaken(false);
        }
      });
    }
  }, [username]);

  async function handleReg(e) {
    e.preventDefault();
    if (isVerified && !auth) {
      await axios
        .get(
          `https://np3demail.herokuapp.com/auth?email=drew@ronsman.com&api_key=${
            import.meta.env.VITE_API_MAIL_KEY
          }`
        )
        .then((res) => {
          const resRef = res.data;
          setVfCode(decrypt(resRef.data, import.meta.env.VITE_HASH_KEY));
          setModalOpen(true);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <div className="form">
      {!modalOpen && (
        <EaseIn
          children={
            <form className="flex flex-col" onSubmit={(e) => Test(e)}>
              <div className="flex justify-center  mb-3">
                <h1 className="text-4xl">Sign Up</h1>
              </div>
              <div>
                <Input
                  icon={
                    taken ? <HiExclamation size={20} /> : <HiCheck size={20} />
                  }
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  badge={taken ? "badge-warning" : "badge-success"}
                  customClass={`${
                    taken ? "bg-red-300" : "bg-slate-900"
                  } input-field`}
                />

                <Input
                  icon={<HiOutlineMailOpen size={20} />}
                  type={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Email"}
                  badge={"badge-info"}
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
                    className="btn btn-outline"
                    type="submit"
                    // onClick={() =>
                    //   modalOpen ? setModalOpen(false) : setModalOpen(true)
                    // }
                    disabled={!isVerified}
                  >
                    {!vfCode ? "Sign Up" : "Verify Email"}
                  </button>
                </div>
                <div className="flex justify-center translate-y-[.5rem]">
                  <Link to="/SignIn" className="text-purple-600 underline">Already have an account</Link>
                </div>
                <div className="divider">OR</div>
                <div className="flex justify-center">
                  <SignIn />
                </div>
              </div>
            </form>
          }
        />
      )}

      {modalOpen && (
        <EaseIn
          children={
            <>
              <div className="flex justify-start">
                <button onClick={() => setModalOpen(false)()}>
                  <HiChevronLeft size={20} />
                </button>
              </div>
              <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex justify-center mb-10">
                  <h1 className="text-4xl">Enter Auth Code</h1>
                </div>
                <div className="flex justify-center">
                  <input
                    className="text-center input-field"
                    placeholder="* * * *"
                    type="text"
                    maxLength={4}
                    value={vfCodeConfirm}
                    onChange={(e) => setVfCodeConfirm(e.target.value)}
                  />
                </div>
                <div className="flex justify-center mt-10">
                  <button className="btn btn-outline">
                    Create new account
                  </button>
                </div>
              </form>
            </>
          }
        />
      )}
    </div>
  );
}

function Input(props) {
  const { icon, placeholder, type, value, onChange, badge, customClass } =
    props;
  return (
    <div className="flex justify-center items-center gap-x-3 my-3">
      <div
        className={`badge ${badge} badge-lg py-5 hover:scale-75 peer-focus:scale-110`}
      >
        {icon}
      </div>
      <input
        className={customClass ? customClass : "input-field bg-slate-900 peer"}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SignUpPage;
