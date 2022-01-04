function Card(props) {
    const { user } = props;
    return (
      <div className="mx-12">
        <div className="grid grid-rows-2 bg-slate-900 w-64 h-[20rem] rounded-3xl">
          <div className="flex flex-col justify-center items-center">
            <div className={`h-24 avatar ${user.status ? "online" : "offline"}`}>
              <img className="rounded-full" src={user.profilePic} alt="profile" />
            </div>
            <h5>{user.name}</h5>
          </div>
          <div className="flex justify-center items-center glass rounded-b-3xl">
            <h2 className="text-center">{}</h2>
          </div>
        </div>
      </div>
    );
  }

  export default Card;