import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FavoritesContextProvider } from "./store/favourites-context.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <FavoritesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavoritesContextProvider>
);
