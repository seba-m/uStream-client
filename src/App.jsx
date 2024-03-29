import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { StreamDetails } from "./pages/StreamDetails";
import { SearchPage } from "./pages/SearchPage";
import { Profile } from "./pages/Profile";
import { SearchStream } from "./pages/SearchStream";
import { SearchCategory } from "./pages/SearchCategory";
import { NotFound } from "./pages/NotFound";
import { Following } from "./pages/Following";

import { SideBar } from "./components/landing/SideBar";
import { NavBar } from "./components/landing/NavBar";
import { LandingPage } from "./pages/LandingPage";

import { Video } from "./pages/Video";

import { PageContainer } from "./components/PageContainer";

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PageContainer />}>
          <Route path="/" element={<LandingPage />} />
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/search" element={<SearchPage />}></Route>
          <Route
            exact
            path="/search/category"
            element={<SearchCategory />}
          ></Route>
          <Route
            exact
            path="/search/stream"
            element={<SearchStream />}
          ></Route>
          <Route
            exact
            path="/stream/:streamerName"
            element={<StreamDetails />}
          ></Route>
          <Route path="/following" element={<Following />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/video/:streamerName" element={<Video />} />
      </Routes>
    </Router>
  );
}
