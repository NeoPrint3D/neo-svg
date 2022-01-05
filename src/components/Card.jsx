function Card(props) {
    const { user } = props;
    return (
        <div className="grid grid-rows-2 bg-slate-900 w-64 rounded-3xl">
          <div className="flex flex-col justify-center items-center">
            <div className={`h-12 avatar ${user.status ? "online" : "offline"}`}>
              {user.profilePic ? (
                <img
                  className="rounded-full"
                  src={user.profilePic}
                  alt="profile"
                />
              ) : (
                <div className="rounded-full bg-gray-700"></div>
              )}
            </div>
            <h5>{user.name}</h5>
          </div>
        
        </div>
    );
  }

  export default Card;