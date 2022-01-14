import { Box, makeStyles, Typography } from "@material-ui/core";
import { CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { detailMovies } from "../api/moviesApi";
import Movie from '../models/entitys/movie.entity';
import Iplot from "../models/entitys/plot.entity";
import MovieDetailResponse from "../models/response/movieDetail.response";

interface MovieDetailState {
    movie: Movie;
};
const MovieDetailsPage = ( ) => {

    const classes = useStyles();
    const location = useLocation();
    const state = location.state as MovieDetailState;
    const movie = state.movie;
    const [movieDetail , setMovieDetail] = useState<MovieDetailResponse>();
    
    useEffect(() => {
        detailMovies(movie.imdbID , Iplot.full).
        then((resp : MovieDetailResponse | null) => {
            if(resp) {
                setMovieDetail(resp);
            }
        });
    }, []);

    return (
        <Box className={classes.container} >
            {
                movieDetail ?
                    <>
                        <Typography variant="h1" className={classes.title}>
                            Movie Details
                        </Typography>
                        <img src={movie.Poster} alt="poster" className={classes.poster} />
                        <Typography variant="h2" className={classes.title}>
                            {movie.Title}
                        </Typography>
                        <Grid container direction="row" justifyContent="center" alignItems="center" 
                            spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                        >
                        <Grid item xs={12} sm={6} md={6} style={{ display: 'flex' , justifyContent: 'center'}}>
                                <Typography variant="h3" className={classes.txt}>
                                    Rating: {movie.imdbRating}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} style={{ display: 'flex' , justifyContent: 'center'}}>
                                <Typography variant="h3" className={classes.txt}>
                                    Year: {movieDetail?.Year}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} style={{ display: 'flex' , justifyContent: 'center'}}>
                                <Typography variant="h3" className={classes.txt}>
                                    Genre: {movieDetail?.Genre}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} style={{ display: 'flex' , justifyContent: 'center'}}>
                                <Typography variant="h3" className={classes.txt}>
                                    Director: {movieDetail?.Director}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} style={{ display: 'flex' , justifyContent: 'center'}}>
                                <Typography variant="h3" className={classes.txt}>
                                    Writer: {movieDetail?.Writer}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} style={{ display: 'flex' , justifyContent: 'center'}}>
                                <Typography variant="h3" className={classes.txt}>
                                    Actors: {movieDetail?.Actors}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={10} md={10} style={{ display: 'flex' , justifyContent: 'center'}}>
                                <Typography variant="h3" className={classes.txt}>
                                    Plot: {movieDetail?.Plot}
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                :  
                    <Box sx={{ display: 'flex' , height: '100%'}}>
                        <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                            <CircularProgress style={{ width: '80px', height: '80px' }} />
                        </Box>
                    </Box>
            }
        </Box>
    );
};

export default MovieDetailsPage;

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex' , 
        flexDirection: 'column' , 
        alignItems: 'center' , 
        marginTop: '2%' ,
        marginBottom: '8%' ,
        marginLeft: '5%' ,
        marginRight: '5%' ,
        borderRadius: '10px' ,
        boxShadow: '5px 5px 5px 5px rgb(0 0 0 / 40%)'
    },
    title: {
        color: '#ff5000' , 
        fontSize: '1.625rem' , 
        textAlign: 'center' , 
        fontWeight: 800 , 
        lineHeight: '1.375em' , 
        letterSpacing: '-0.015em' , 
        fontFamily: 'Nunito',
    },
    txt: {
        fontSize: '1.625rem' , 
        textAlign: 'center' , 
        lineHeight: '1.375em' , 
        letterSpacing: '-0.015em' , 
        fontFamily: 'Nunito',
        color: '#a57364'
    },
    searchBtn: {
        fontSize: '1rem !important',
        marginTop: '24px !important',
        borderRadius: '24px / 50% !important',
        marginBottom: '1vh !important',
    },
    poster : {
        borderRadius: '16px',
    }
}));
