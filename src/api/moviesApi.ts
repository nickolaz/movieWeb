import { AxiosResponse } from "axios";
import { API } from ".";
import { AppConfig } from "../config/config";
import Iplot from "../models/entitys/plot.entity";
import MovieDetailResponse from "../models/response/movieDetail.response";
import MovieResponse from "../models/response/movies.response";

export const searchMovies = async ( search : string , searchType : string , page : number ) => {
    let params = `?s=${search}&apikey=${AppConfig.apiKey}&page=${page}`;
    if ( searchType === 'Año' ) {
        params += `&y=${search}`;
    }
    const res : AxiosResponse<MovieResponse> = await API.get(AppConfig.apiBaseUrl + params );
    if(res.data.Response === 'False') {
        return null;
    }
    return res.data;
};

export const detailMovies = async ( imdbID : string , plot : Iplot ) => {
    const res : AxiosResponse<MovieDetailResponse> = await API.get(AppConfig.apiBaseUrl + `?i=${imdbID}&apikey=${AppConfig.apiKey}&plot=${plot}`);
    if(res.data.Response === 'False') {
        return null;
    }
    return res.data;
};