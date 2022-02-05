import { Link } from "react-router-dom";
import { SignOut } from "./GoogleSignIn";
import { BsSearch, BsUpload } from "react-icons/bs";
import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../context/userContext";
import { SearchDispatchContext } from "../context/searchContext";
import algoliasearch from "algoliasearch/lite";

function Header() {
  const currentUser = useContext(CurrentUserContext);

  //function that make sure when the user scrolls down the header is sticky

  return (
    <header
      className={`main-gradient bg-gray-900 h-20 grid grid-cols-10  rounded-b-2xl shadow-md shadow-purple-800`}
    >
      <div className="flex justify-start items-center ml-5 col-span-2">
        <Link to="/" className="text-3xl font-logo">
          NeoSVG
        </Link>
      </div>

      <div className="col-span-4"></div>
      <div className="flex justify-end col-span-4  mr-5">
        <div className="grid grid-cols-2 items-center gap-5 md:gap-10">
          <Link to="/search">
            <BsSearch size={50} className="transition-all h-10 hover:h-8  " />
          </Link>

          <div className="dropdown dropdown-hover dropdown-end ">
            <div tabIndex="0">
              {currentUser ? (
                <div className="hover:bg-slate-600 p-1 rounded-xl">
                  <div>
                    <img
                      className="w-14 rounded-full "
                      src={currentUser.profilePic}
                      alt="user"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <h5 className="text-xs sm:text-xl hover:text-purple-700">
                    Sign In
                  </h5>
                </div>
              )}
            </div>

            <ul
              tabIndex="0"
              className="dropdown-content bg-slate-800 w-52 rounded p-2 shadow-lg shadow-purple-900"
            >
              {currentUser ? (
                <li className="flex flex-col items-center p-3 gap-5">
                  <div className="btn btn-primary">
                    <Link to={`/user/${currentUser.username}`}>Profile</Link>
                  </div>
                  <div className="btn btn-info">
                    <Link to={`/upload`}>Upload</Link>
                  </div>
                  <SignOut />
                </li>
              ) : (
                <li className="flex justify-center items-center p-3">
                  <Link to="/SignIn">Sign Up/Log in</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
