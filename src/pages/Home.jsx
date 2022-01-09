import Card from "../components/Card";
import { db } from "../utils/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

function Home(props) {
  const { currentUser, search } = props;
  const [users] = useCollection(collection(db, "users")); // const users = people;
  const [posts] = useCollection(collection(db, "posts"));

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="flex justify-center items-center ">
        <div
          className={` w-[20rem] h-[20rem] carousel rounded-box carousel-vertical bg-indigo-900`}
        >
          <div className="flex flex-col justify-center items-center">
            {users && currentUser ? (
              users.docs.map((user) => {
                const userRef = user.data();
                if (
                  userRef.name.toLowerCase().includes(search.toLowerCase()) &&
                  userRef.uid !== currentUser.uid
                ) {
                  return (
                    <ul key={userRef.uid} className="my-5">
                      <Card user={userRef} currentUser={currentUser}/>
                    </ul>
                  );
                }
              })
            ) : (
              <div className="flex h-full w-full justify-center items-center">
                <h5 className="text-4xl"> Sign in to see who's on</h5>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center">
          <div className="w-64 h-[20rem] carousel rounded-box carousel-vertical bg-indigo-900">
            {posts &&
              posts.docs.map((post) => {
                const postRef = post.data();
                return (
                  <div className="bg-blue-300">
                    <h5>{postRef.title}</h5>
                    <p>{postRef.description}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
