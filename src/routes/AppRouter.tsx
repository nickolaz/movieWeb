import React from "react";
import { Navigate, Route, BrowserRouter as Router , Routes } from "react-router-dom";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import MoviesPage from "../pages/MoviesPage";

const AppRouter = () => {
    return (
        <Router >
            <Routes >
                <Route path="/movies" element={ <MoviesPage /> } />   
                <Route path="/movieDetail" element={ <MovieDetailsPage /> } />
                <Route path="/*" element={<Navigate replace to="/movies" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;