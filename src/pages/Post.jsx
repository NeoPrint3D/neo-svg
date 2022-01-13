import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

function Profile(props) {
  const { id } = useParams();
  const { posts, currentUser } = props;
  const [post, setPost] = useState('');
  const [owns, setOwns] = useState(false);
  useEffect(() => {
    if (posts) {
      posts.docs.map((post) => {
        const postRef = post.data();
        if (postRef.id === id) {
          if(postRef.user.uid === currentUser.uid) {
            setOwns(true);
          }
          setPost(postRef)

        }
      });
    }
    

    
  
  }, [posts]);

  return (
    <main className="glass w-3/4 h-5/6 rounded-2xl p-10">
      {post ? (
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <h1>Post</h1>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex justify-center">
              <h5>{post.title}</h5>
              <FaRegEdit size={30} />
            </div>
            {true && (
              <div className="flex justify-center">
                <img
                  className="w-1/4 h-1/4 rounded-full border-purple-700 border-4 "
                  src={post.file}
                  alt="user"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <h1>Loading...</h1>
        </div>
      )}
    </main>
  );
}
export default Profile;
