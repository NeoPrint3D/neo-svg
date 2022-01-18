import { SignIn } from "../components/Buttons";
import { Link } from "react-router-dom";
import {auth } from "../utils/firebase";
function SignUp() {
  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
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
              type="text"
              placeholder="email"
              class="input input-bordered"
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
            />
          </div>
          <div class="form-control mt-3">
            <input
              type="text"
              placeholder="password"
              class="input input-bordered"
            />
          </div>
          <div class="form-control mt-6">
            <input type="button" value="Login" class="btn btn-primary" />
          </div>
          <div class="form-control mt-3">
            <SignIn />
          </div>
          <div class="form-control mt-5">
            <Link to="/SignIn">Have a account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
