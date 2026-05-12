import { useState, useEffect } from "react";
import "./index.css";

import AppSidebar from "./components/AppSidebar";
import TopBar from "./components/TopBar";

import LandingPage from "./components/pages/LandingPage";
import HomePage from "./components/pages/HomePage";
import BookPage from "./components/pages/BookPage";
import TrackPage from "./TrackPage";
import CoverPage from "./components/pages/CoverPage";
import ContactPage from "./components/pages/ContactPage";
import AccountPage from "./components/pages/AccountPage";
import AdminPage from "./components/pages/Adminpage";
import AboutPage from "./components/pages/AboutPage";
import ServicesPage from "./components/ServicePage";

const PAGES = {
  track: TrackPage,
  coverage: CoverPage,
  contact: ContactPage,
  account: AccountPage,
  services: ServicesPage,
};

export default function App() {
  const [page, setPage] = useState("landing");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Pages that render fullscreen without the shell
  if (page === "landing") return <LandingPage setPage={setPage} />;
  if (page === "home")    return <HomePage setPage={setPage} />;
  if (page === "about")   return <AboutPage setPage={setPage} />;
  if (page === "book")    return <BookPage setPage={setPage} />;
  if (page === "admin")   return <AdminPage setPage={setPage} />;

  const PageComponent = PAGES[page] ?? TrackPage;

  return (
    <div className="app-shell">
      <AppSidebar page={page} setPage={setPage} />
      <div className="main-content">
        <TopBar page={page} setPage={setPage} />
        <PageComponent setPage={setPage} />
      </div>
    </div>
  );
}