import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Error from "./Pages/Error";
import { MovieProvider } from "./Context/MovieContext/MovieContext";
import { AnimatePresence } from "framer-motion";
import { LibraryProvider } from "./Context/LibraryContext/LibraryContext";
import MovieLibrary from "./Pages/MovieLibrary";
import NavBarLayout from "./Layouts/NavBarLayout";
import Profile from "./Pages/Profile";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Register from "./Components/Register/Register";
import { LinksProvider } from "./Context/LinksContext/LinksContext";

function App() {
    const routes = [
        {
            path: "/",
            element: <NavBarLayout />,
            errorElement: <Error />,
            children: [
                // ---------------------------
                //          Protected Routes
                // ---------------------------
                {
                    index: true,
                    element: (
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "movie/:id",
                    element: (
                        <ProtectedRoute>
                            <MovieDetails />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "library",
                    element: (
                        <ProtectedRoute>
                            <MovieLibrary />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "profile",
                    element: (
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "register",
                    element: <Register />,
                },
                // ---------------------------
                //          Public Login
                // ---------------------------
                {
                    path: "login",
                    element: <Login />,
                },
            ],
        },
    ];

    const router = createBrowserRouter(routes);

    return (
        <LinksProvider>
            <AnimatePresence mode="wait">
                <MovieProvider>
                    <LibraryProvider>
                        <RouterProvider router={router} />
                    </LibraryProvider>
                </MovieProvider>
            </AnimatePresence>
        </LinksProvider>
    );
}

export default App;
