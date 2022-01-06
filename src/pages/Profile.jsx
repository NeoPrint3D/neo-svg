import { updateDoc, doc } from "firebase/firestore";
function Profile(props) {
  const { currentUser } = props;
  console.log(currentUser);
  return (
    <main className="glass w-3/4 h-5/6 rounded-2xl p-10">
      <div className="flex flex-col justify-center text-5xl">
        <div className="flex justify-center">
          <h1>Profile</h1>
        </div>
        <div className="flex flex-col justify-center">
          {currentUser && (
            <div className="flex justify-center">
            <img
              className="w-5/8 h-5/8 rounded-full border-purple-700 border-4 "
              src={currentUser.photoURL}
              alt="user"
            />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
export default Profile;
