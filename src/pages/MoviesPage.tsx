import { Autocomplete, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { makeStyles } from "@material-ui/core";
import CustomInput from '../components/CustomInput';
import Movie from '../models/entitys/movie.entity';
import MoviesList from '../util/util';
import MovieCard from '../components/MovieCard';

const MoviesPage = () => {

    const ref = useRef<HTMLDivElement>(null);
    const classes = useStyles();
    const [ searchValue , setSearchValue ] = useState<string>('Marvel');
    const [ inputValue , setInputValue ] = useState(searchValue);
    const [ searchType , setSearchType ] = useState<string>('Titulo');
    const [ movieList , setMovieList ] = useState<Movie[]>([]);
    const [ page , setPage ] = useState<number>(1);

    const isVisible = useOnScreen(ref);

    const onChangeText = (text : string) => setInputValue(text);

    const search = () => {
        setSearchValue(inputValue);
        setPage(1);
        setMovieList([]);
        MoviesList(inputValue , searchType , 1 ).then( (res : Movie[] | null) => {
            if(res) setMovieList(res);
        });
    };

  useEffect(() => {
    if ( isVisible ) {
        setPage(page + 1)
        MoviesList(searchValue , searchType , page + 1 ).then( (res : Movie[] | null) => {
            if(res) setMovieList(prev => [...prev , ...res]);
        });
    }
  }, [ isVisible ]);

  return (
    <Box className={classes.container} >
        <Typography variant="h1" className={classes.title}>
            Movies
        </Typography>
        <Box display="flex" flexDirection="column">
            <CustomInput label="Ingresa tu busqueda" value={inputValue} onChange={(e) => onChangeText(e.target.value)}/>
            <Autocomplete disablePortal id="type" sx={{ width: 300 }} options={["Titulo","Año"]}
                renderInput={(params) =>  <CustomInput {...params} label="Tipo de busqueda" variant="outlined" /> }
                style={{ width: "50vw" , marginTop: '1vh' }}
                isOptionEqualToValue={(option, value) => option === value }
                value={searchType}
                onChange={(event, value) => setSearchType(value || '')}
            />
            <Button variant="contained" color="primary" className={classes.searchBtn} onClick={search} > 
                Buscar Peliculas
            </Button>
        </Box>
        {
            movieList.length === 0 ?
                <Box sx={{ display: 'flex' , height: '100%'}}>
                    <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
                        <CircularProgress style={{ width: '80px', height: '80px' }} />
                    </Box>
                </Box>
            :
                <Grid container direction="row" justifyContent="center" alignItems="center" 
                spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} 
                >
                {
                    movieList.map( (movie : Movie , index : Number) => (
                        <Grid item xs={12} sm={4} md={4} key={index.toString()} style={{ display: 'flex' , justifyContent: 'center'}}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))
                }
                </Grid>
        }
        <Box ref={ref} component="div">.</Box>
    </Box>
  )
};

export default MoviesPage;

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex' , 
        flexDirection: 'column' , 
        alignItems: 'center' , 
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
    searchBtn: {
        fontSize: '1rem !important',
        marginTop: '24px !important',
        borderRadius: '24px / 50% !important',
        marginBottom: '1vh !important',
    },
}));