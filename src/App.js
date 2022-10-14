import { StrictMode, useState, lazy, Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));
const App = () => {
  const theme = useState("darkblue");
  return (
    <StrictMode>
      <Suspense fallback={<h2>Loading ...</h2>}>
        <BrowserRouter>
          <ThemeContext.Provider value={theme}>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </ThemeContext.Provider>
        </BrowserRouter>
      </Suspense>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
