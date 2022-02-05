import Loading from "../components/Loading";
import PreviewPost from "../components/PreviewPost";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  query,
  limit,
  getDocs,
  collection,
  orderBy,
  startAt,
} from "firebase/firestore/lite";

function Home() {
  const [pageSize, setPageSize] = useState(8);
  const [posts, setPosts] = useState("");
  const [postRef, setPostRef] = useState("");
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState("");
  const [sortBy, setSortBy] = useState("likes");

  const formalizeData = (list) => {
    const newData = [];
    list.docs.forEach((post) => {
      newData.push(post.data());
    });
    return newData;
  };

  //function that make sure that the last post in the page isnt in the list

  useEffect(() => {
    getPosts().then((snapshot) => {
      setPostRef(snapshot);
      setPosts(formalizeData(snapshot));
    });
  }, [sortBy]);

  async function getPosts() {
    const first = query(
      collection(db, "posts"),
      limit(pageSize),
      orderBy(sortBy, "desc")
    );
    const documentSnapshots = await getDocs(first);
    if (documentSnapshots.docs.length + 1 < pageSize) {
      setEndPage(page);
    }

    return documentSnapshots;
  }

  async function getMorePosts() {
    setPage(page + 1);
    if (
      page * pageSize >= posts.length - 6 &&
      postRef.docs.length % pageSize === 0
    ) {
      const newPosts = await getDocs(
        query(
          collection(db, "posts"),
          limit(pageSize),
          orderBy(sortBy, "desc"),
          startAt(postRef.docs[postRef.docs.length - 1])
        )
      );
      setPosts(posts.concat(formalizeData(newPosts)));
      setPostRef(newPosts);
      if (newPosts.docs.length + 1 < pageSize) {
        setEndPage(page + 1);
        console.log("end page");
      }
    }
  }

  const container = {
    hidden: { opacity: 1, scale: 0.5 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  return posts ? (
    <div className="my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 h-[calc(100vh-7.5rem)] gap-10">
        {posts.map((post) => {
          console.log(posts);
          //index is the index of the post in the list
          console.log(post);
          const index = posts.indexOf(post);
          if (index < page * pageSize && index >= page * pageSize - pageSize) {
            return <PreviewPost key={post.id} post={post} />;
          }
        })}
        <div
          className={`grid grid-cols-3 items-center col-span-full h-[4rem]	text-4xl`}
        >
          {page > 1 ? (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setPage(page - 1);
                }}
              >{`<`}</button>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex justify-center">{page}</div>
          <div className="flex justify-center">
            <button
              className="disabled:text-red-500"
              disabled={endPage === page && true}
              onClick={() => getMorePosts(postRef)}
            >{`>`}</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Home;
