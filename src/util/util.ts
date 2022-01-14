import { detailMovies, searchMovies } from "../api/moviesApi";
import Movie from "../models/entitys/movie.entity";
import Iplot from "../models/entitys/plot.entity";

const MoviesList = async ( search : string , searchType : string , page : number ) => {
    const list : Movie[] = [];
    let resp = await searchMovies(search , searchType , page);
    if(resp) {
        for (const movie of resp.Search) {
            const detailResp = await detailMovies(movie.imdbID, Iplot.short);
            if(detailResp) {
                const movie : Movie = {
                    imdbID: detailResp.imdbID,
                    Title: detailResp.Title,
                    Poster: detailResp.Poster,
                    imdbRating: detailResp.imdbRating,
                    Plot: detailResp.Plot,
                };
                list.push(movie);
            } 
        }    
        return list;
    }
    return list;
};

export default MoviesList;