import { Link } from "react-router-dom";
import { SignOut } from "./Buttons";
import { BsUpload } from "react-icons/bs";
function Header(props) {
  const { children, currentUser } = props;
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
              <div>
                {currentUser.profilePic ? (
                  <img
                    className="w-10 h-10 rounded-full border-purple-700 border-4 "
                    src={currentUser.profilePic}
                    alt="user"
                  />
                ) : (
                  <div className="flex justify-center items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-700 border-4 border-purple-700">
                      <h1 className="text-xl text-center">
                        {currentUser.name.charAt(0)}
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <h5 className="text-lg hover:text-purple-700">Sign up</h5>
            )}
          </div>

          <ul
            tabIndex="0"
            className="dropdown-content bg-slate-800 w-52 rounded p-2 shadow-lg shadow-rose-900"
          >
            {currentUser ? (
              <li className="flex flex-col items-center  p-3 gap-5">
                <button className="bg-purple-800 p-3 rounded-2xl hover:bg-purple-800 hover:ring ring-purple-500">
                  <Link to={`/user/${currentUser.name}`}>Profile</Link>
                </button>
                <SignOut />
              </li>
            ) : (
              <li className="flex justify-center p-3">
                <Link to="/SignIn">Sign Up/Log in</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
export default Header;
