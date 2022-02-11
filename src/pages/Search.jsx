import algoliasearch from "algoliasearch/lite";

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Img from "react-cool-img";
import placeholder from "../assets/placeholder.png";
import { CurrentUserContext } from "../context/userContext";

function createMarkup(str) {
  return { __html: str };
}

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
          setHits(hits);
          console.log(hits);
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
          ],
          highlightPostTag: ["title", "authorName", "description"],
          hitsPerPage: 50,
        })
        .then(({ hits }) => {
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
          className="bg-gray-500 p-4 rounded-xl w-3/4 "
        />
      </div>
      <div className="flex flex-col items-center  h-[calc(100vh-13.5rem)] m-10">
        {hits.map((hit) => (
          <div
            className=" bg-gray-700 w-11/12 rounded-2xl h-[20rem] my-10 carousel-item p-2"
            key={hit.objectID}
          >
            <div className="flex flex-col items-center col-span-3 w-full">
              <div className="flex justify-start w-full">
                <img
                  className="h-12 rounded-full"
                  src={hit.authorPhoto}
                  alt=""
                />
                <div className="flex flex-col justify-center items-center ml-4">
                  <Link
                    to={`/post/${hit.objectID}`}
                    className="text-4xl mb-2 font-bold mx-auto"
                    dangerouslySetInnerHTML={createMarkup(
                      hit.title.length > 15
                        ? hit.title.slice(0, 15) + "..."
                        : hit._highlightResult["title"].value
                    )}
                  ></Link>
                  <div className="text-gray-500 text-sm"></div>
                </div>
              </div>

              <h3 className="flex justify-center items-center text-sm "></h3>
              <div
                className="flex justify-center items-center h-full w-full"
                dangerouslySetInnerHTML={createMarkup(
                  hit._highlightResult["description"].value
                )}
              ></div>
            </div>

            <div className="divider divider-vertical"></div>

            <div className="flex flex-col justify-center items-center">
              <Link to={`/post/${hit.objectID}`}>
                <button onClick={() => ""}>
                  <Img
                    className="transition-all max-h-[27.5rem]  rounded-lg active:scale-90 active:blur-sm hover:-hue-rotate-60 "
                    src={hit.image}
                    placeholder={placeholder}
                    alt="loading"
                  />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
