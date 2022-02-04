import { Link } from "react-router-dom";
import { SignOut } from "./GoogleSignIn";
import { BsSearch, BsUpload } from "react-icons/bs";
import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../context/userContext";
import { SearchDispatchContext } from "../context/searchContext";

function Header() {
  const currentUser = useContext(CurrentUserContext);
  const setSearch = useContext(SearchDispatchContext);

  //function that make sure when the user scrolls down the header is sticky
  const handleScroll = () => {
    const header = document.querySelector("header");
    if (window.scrollY > 0) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };

  useEffect(() => {
    console.log(currentUser);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`bg-gray-900 h-16 grid grid-cols-9 `}>
      <div className="flex justify-start items-center ml-3 col-span-2">
        <Link to="/" className="text-xl font-logo">
          NeoSVG
        </Link>
      </div>

      <div className="flex justify-center gap-2 sm:gap-5 items-center col-span-5 ">
        <input
          type="search"
          className="w-3/4 p-3 rounded-xl text-white bg-slate-700 focus:outline-purple-600 focus:shadow-outline"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="w-10" onClick={() => ""}>
          <BsSearch size={30} className="h-6 md:h-full" />
        </button>
      </div>

      <div className="flex items-center justify-end gap-5 col-span-2 mr-2">
        {currentUser && (
          <>
            <Link to="/upload" className="text-xl font-logo">
              <BsUpload size={30} className="h-6 md:h-full" />
            </Link>
          </>
        )}
        <div className="dropdown dropdown-hover dropdown-end">
          <div tabIndex="0">
            {currentUser ? (
              <div className="flex items-center justify-center gap-5 p-1 hover:bg-slate-700 rounded-xl">
                <div>
                  <img
                    className="w-10 sm:w-12 rounded-full "
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
            className="dropdown-content bg-slate-800 w-52 rounded p-2 shadow-lg shadow-rose-900"
          >
            {currentUser ? (
              <li className="flex flex-col items-center p-3 gap-5">
                <button className="btn btn-primary">
                  <Link to={`/user/${currentUser.username}`}>Profile</Link>
                </button>
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
    </header>
  );
}
export default Header;
