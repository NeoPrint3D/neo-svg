import { createContext, useState,useEffect } from "react";

const SearchContext = createContext(undefined);
const SearchDispatchContext = createContext(undefined);
// A "provider" is used to encapsulate only the
// components that needs the state in this context


function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  useEffect(() => {
    console.log(search);
    setSearch(search);
    }, [search]);

  return (
    <SearchContext.Provider value={search}>
      <SearchDispatchContext.Provider value={setSearch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}

export { SearchProvider, SearchContext, SearchDispatchContext };
