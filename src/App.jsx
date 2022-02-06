import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

//pages

import Home from "./pages/Home";

//lazy load components
const Upload = lazy(() => import("./pages/Upload"));
const Profile = lazy(() => import("./pages/Profile"));
const Post = lazy(() => import("./pages/Post"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const SignInPage = lazy(() => import("./pages/SignIn"));
const Search = lazy(() => import("./pages/Search"));

//componts
import Header from "./components/Header";
import { CurrentUserProvider } from "./context/userContext";
import { SearchProvider } from "./context/searchContext";

function App() {
  return (
    <div className="background h-screen">
      <CurrentUserProvider>
        <SearchProvider>
          <Header />
          <Suspense
            fallback={
              <main>
                <h5 className="animate-bounce text-5xl">Loading...</h5>
              </main>
            }
          >
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/user/:username" element={<Profile />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </Suspense>
        </SearchProvider>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
