import { makeStyles } from "@material-ui/core";
import { Button, CardActions, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import Movie from "../models/entitys/movie.entity";
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
    movie: Movie;
};

const MovieCard = ( { movie } : MovieCardProps ) => {

    const classes = useStyles();
    const navigate = useNavigate();

    const detail = () => navigate(`/movieDetail` , { state: { movie } });

    return (
        <Card sx={{ maxWidth: 345 }} className={classes.card}>
            <CardActionArea>
                <CardMedia component="img" height="250" alt="poster" style={{ objectFit: 'scale-down' }}
                    image={movie.Poster}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className={classes.title}>
                        {movie.Title}
                    </Typography>
                    <Typography variant="body2" className={classes.plot}>
                        {movie.Plot}
                    </Typography>
                    <Typography variant="body2" className={classes.rating}>
                        Rating: {movie.imdbRating}
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" className={classes.btn} onClick={detail}>
                        Ver mas
                    </Button>
                </CardActions>
        </Card>
    );
};

export default MovieCard;

const useStyles = makeStyles((theme) => ({
    card : {
        backgroundColor: '#f7eff0'  , 
        minWidth: '80%' , 
        maxWidth: '80%' , 
        minHeight: '80%' , 
        maxHeight: '80%'
    },
    title : {
        fontSize: '0.875rem' , 
        lineHeight: '1.4em' , 
        fontFamily: 'Nunito'
    },
    plot : {
        fontFamily: 'Nunito' , 
        color: '#607D8B' , 
        fontSize: '0.75rem' , 
        fontWeight: 'normal' , 
        lineHeight: '1.5em'
    },
    rating : {
        fontSize: '0.875rem' , 
        fontFamily: 'Nunito' , 
        lineHeight: '1.4em'
    },
    btn : {
        fontFamily: 'Nunito' , 
        color: '#ff5000'
    }
}));