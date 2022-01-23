import { SignIn } from "../components/Buttons";
import { auth } from "../utils/firebase";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CryptoJS from "crypto-js";
import axios from "axios";
import EaseIn from "../components/EaseIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoIosArrowBack } from "react-icons/io";

function SignUpPage() {
  const { currentUser } = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [vfCode, setVfCode] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const isVerified =
    email.length > 0 &&
    password.length > 0 &&
    passwordConfirm.length > 0 &&
    password === passwordConfirm;

  function decrypt(data, key) {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  }

  function Test(e) {
    e.preventDefault();

    if (auth) {
      setModalOpen(false);
    } else {
      setVfCode(1234);
      setModalOpen(true);
    }
  }

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  async function handleReg(e) {
    e.preventDefault();
    if (isVerified) {
      await axios
        .get(
          `https://np3demail.herokuapp.com/auth?email=drew@ronsman.com&api_key=${
            import.meta.env.VITE_API_MAIL_KEY
          }`
        )
        .then((res) => {
          const resRef = res.data;
          console.log(res.status);
          setVfCode(decrypt(resRef.data, import.meta.env.VITE_HASH_KEY));
          se;
        });
    }
  }
  async function initailizeUser() {
    const docSnap = await getDoc(doc(db, "users", username));
    if (!docSnap.exists) {
      await setDoc(doc(db, "users", username), {
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
    <>
      {!modalOpen && (
        <EaseIn
          children={
            <form className="flex flex-col" onSubmit={(e) => Test(e)}>
              <div className="flex justify-center  mb-3">
                <h1 className="text-4xl">Sign Up</h1>
              </div>
              <div>
                <Input
                  type="username"
                  name="Username"
                  value={username}
                  method={(e) => setUsername(e.target.value)}
                />
                <Input
                  type="email"
                  name="Email"
                  value={email}
                  method={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  name="Password"
                  value={password}
                  method={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  name="Confirm Password"
                  value={passwordConfirm}
                  method={(e) => setPasswordConfirm(e.target.value)}
                />
                <div className="flex justify-center mt-3">
                  <button
                    className="btn btn-outline"
                    onClick={() =>
                      modalOpen ? setModalOpen(false)() : setModalOpen(true)()
                    }
                    disabled={!isVerified}
                  >
                    {!vfCode ? "Sign Up" : "Verify Email"}
                  </button>
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
                  <IoIosArrowBack size={20} />
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
    </>
  );
}

//a input field
function Input(props) {
  const { type, name, value, method } = props;
  return (
    <div className="flex justify-center my-3">
      <input
        className="input-field"
        type={type}
        value={value}
        onChange={method}
        placeholder={name}
      />
    </div>
  );
}

export default SignUpPage;
