import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Error from "./Pages/Error";
import { MovieProvider } from "./Context/MovieContext/MovieContext";
function App() {
  return (
    <>
      <BrowserRouter>
        <MovieProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
			      <Route path="*" element={<Error />} />
          </Routes>
        </MovieProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
