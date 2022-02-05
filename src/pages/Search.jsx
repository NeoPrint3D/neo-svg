import algoliasearch from "algoliasearch/lite";

import { useEffect, useState } from "react";

//get the items from algolia
function Search() {
  const [hits, setHits] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const searchClient = algoliasearch(
      import.meta.env.VITE_ALGOLIA_APP_ID,
      import.meta.env.VITE_ALGOLIA_SEARCH_KEY
    );
    const index = searchClient.initIndex("posts");
    index
      .search(search, {
        attributesToRetrieve: [
          "title",
          "authorName",
          "description",
          "image",
          "id",
          "authorPhoto",
          "authorName",
        ],
        hitsPerPage: 50,
      })
      .then(({ hits }) => {
        console.log(hits);
        setHits(hits);
      });
  }, [search]);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-gray-700 p-4 rounded-xl"
      />
      <div className="grid grid-cols-4">
        {hits.map((hit) => (
          <div className="search-result">
            <div className="search-result-info">
              <h3 className="">{hit.title}</h3>
              <p>{hit.description}</p>
              <img src={hit.image} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
