function Header(props) {
  const { user, makeOffline } = props;
  return (
    <header>
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="flex-none hidden lg:flex">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-1 hidden px-2 mx-2 lg:flex">
          <span className="text-lg font-bold">daisyUI</span>
        </div>
        <div className="flex-1 lg:flex-none">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-ghost"
            />
          </div>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-none">
          <div className="avatar">
            <div className="rounded-full w-10 h-10 m-1">
              {user ? (
                <img
                  className="rounded-full"
                  src={user.photoURL}
                  alt="profile"
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
