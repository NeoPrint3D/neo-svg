import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

//pages

//lazy load components

const Home = lazy(() => import("./pages/Home"));
const Upload = lazy(() => import("./pages/Upload"));
const Profile = lazy(() => import("./pages/Profile"));
const Post = lazy(() => import("./pages/Post"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const SignInPage = lazy(() => import("./pages/SignIn"));

//componts
import Header from "./components/Header";

import { CurrentUserProvider } from "./context/userContext";
import { SearchProvider } from "./context/searchContext";

function App() {
  return (
  <Suspense fallback={<div>Loading...</div>}>
    <div className="background h-screen overflow-y-scroll">
      <CurrentUserProvider>
        <SearchProvider>
          <Header />
          <div className="">
            <Routes>
              <Route path={"/"} element={<Home />} />

              <Route path="/upload" element={<Upload />} />
              <Route path="/user/:username" element={<Profile />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/SignUp" element={<SignUpPage />} />
              <Route path="/SignIn" element={<SignInPage />} />
            </Routes>
          </div>
        </SearchProvider>
      </CurrentUserProvider>
    </div>
  </Suspense>
  );
}

export default App;
