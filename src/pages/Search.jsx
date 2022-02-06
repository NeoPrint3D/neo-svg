import algoliasearch from "algoliasearch/lite";

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Img from "react-cool-img";
import placeholder from "../assets/placeholder.png";
import { CurrentUserContext } from "../context/userContext";

import {
  AiOutlineLike,
  AiOutlineArrowDown,
  AiOutlineEye,
  AiFillLike,
} from "react-icons/ai";
//get the items from algolia
function Search() {
  const currentUser = useContext(CurrentUserContext);
  const [hits, setHits] = useState([]);
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState(false);
  const [like, setLikes] = useState("");

  useEffect(() => {
    const searchClient = algoliasearch(
      import.meta.env.VITE_ALGOLIA_APP_ID,
      import.meta.env.VITE_ALGOLIA_SEARCH_KEY
    );
    const index = searchClient.initIndex("posts");
    if (search.length >= 3) {
      index
        .search(search, {
          attributesToRetrieve: [
            "title",
            "authorName",
            "description",
            "image",
            "objectID",
            "authorPhoto",
            "authorName",
          ],
          hitsPerPage: 50,
        })
        .then(({ hits }) => {
          console.log(hits);
          setHits(hits);
        });
    } else if (search.length === 0) {
      index
        .search(search, {
          attributesToRetrieve: [
            "title",
            "authorName",
            "description",
            "image",
            "objectID",
            "authorPhoto",
            "authorName",
          ],
          hitsPerPage: 50,
        })
        .then(({ hits }) => {
          console.log(hits);
          setHits(hits);
        });
    }
  }, [search]);

  return (
    <div className="">
      <div className="flex justify-center my-10">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-500 p-4 rounded-xl w-[30rem]"
        />
      </div>
      <div className="flex flex-col items-center">
        {hits.map((hit) => (
          <div className="bg-gray-700 w-11/12 rounded-2xl">
            <Link to={`/post/${hit.objectID}`}>
              <button onClick={() => ""}>
                <Img
                  className="transition-all max-h-56 rounded-lg active:scale-90 active:blur-sm hover:-hue-rotate-60 "
                  src={hit.image}
                  placeholder={placeholder}
                  alt="loading"
                />
              </button>
            </Link>
            {/* <div className="flex flex-col items-center">
              <h4 className="text-2xl text-center font-semibold">
                {hit.title}
              </h4>
              <h3 className="flex justify-center text-sm ">{hit.authorName}</h3>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
