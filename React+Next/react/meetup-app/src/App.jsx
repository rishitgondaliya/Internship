import "./App.css";
import { Routes, Route } from "react-router-dom";

import AllMeetup from "./pages/AllMeetup.jsx";
import NewMeetup from "./pages/NewMeetup.jsx";
import Favorites from "./pages/Favorites.jsx";
import Layout from "./components/layout/Layout.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllMeetup />} />
        <Route path="/new-meetup" element={<NewMeetup />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Layout>
  );
}

export default App;
