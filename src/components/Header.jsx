import { Link } from "react-router-dom";
import { SignIn, SignOut } from "./Buttons";
import { BsUpload } from "react-icons/bs";

function Header(props) {
  const { children, currentUser, currentUserUID } = props;
  return (
    <header className="bg-gray-900 h-16 grid grid-cols-3">
      <div className="flex justify-start items-center ml-3">
        <Link to="/" className="text-xl font-logo">
          NeoSVG
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <div className="form-control">{children}</div>
      </div>

      <div className="flex justify-end items-center mr-3 gap-5">
        <Link to="/upload">
          <BsUpload size={20} />
        </Link>

        <div className="dropdown dropdown-end">
          <div tabIndex="0">
            {currentUser ? (
              <img
                className="w-14 h-14 rounded-full border-purple-700 border-4 "
                src={currentUser.profilePic}
                alt="user"
              />
            ) : (
              "Log in"
            )}
          </div>

          <ul
            tabIndex="0"
            className="dropdown-content bg-slate-900 w-52 rounded p-2 border-black border-4"
          >
            {currentUser ? (
              <>
                <li className="flex justify-center p-3">
                  <button className="bg-purple-800 p-3 rounded-2xl hover:bg-purple-800 hover:ring ring-purple-500">
                    <Link to={`/user/${currentUserUID}`}>Profile</Link>
                  </button>
                </li>
                <li className="flex justify-center p-3">
                  <SignOut />
                </li>
              </>
            ) : (
              <li className="flex justify-center p-3">
                <Link to='/SignIn'>Sign Up/Log in</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
export default Header;
