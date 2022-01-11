import Card from "../components/Card";
import { db } from "../utils/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useEffect } from "react";
import Post from "../components/Post";

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
                      <Card user={userRef} currentUser={currentUser} />
                    </ul>
                  );
                }
              })
            ) : (
              <div className=" w-full h-[20rem] flex justify-center  items-center ">
                <AiOutlineLoading3Quarters
                  size={50}
                  className="animate-spin ring-rounded "
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="w-64 h-[20rem] carousel rounded-box carousel-vertical bg-indigo-900">
          <div className="flex flex-col justify-center items-center">
            {posts &&
              posts.docs.map((post) => {
                const postRef = post.data();
                return (
                  <ul key={postRef.id} className="my-5">
                    <Post post={postRef} />
                  </ul>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
