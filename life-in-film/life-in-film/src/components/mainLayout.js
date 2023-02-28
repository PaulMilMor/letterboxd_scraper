import { Box, Button, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Chart from 'react-apexcharts';


// import data from '../data.json';
import CustomChart from './customChart';
import RatingComparison from './ratingComparison';
import TableSection from './tableSection';
import { SectionTitle, SubTitle } from './titles';


const MainLayout = ({ data, setFile }) => {

    const fillYears = (films) => {
        try {
            let start = parseInt(Object.keys(films)[0]);
            let end = parseInt(Object.keys(films)[Object.keys(films).length - 1]);
            let filledFilms = {};

            for (let i = start; i <= end; i++) {
                if (i.toString() in films) {
                    filledFilms[i.toString()] = films[i.toString()];
                } else {
                    filledFilms[i.toString()] = 0;
                }
            }
            return filledFilms;
        } catch (e) {
            setFile('error');
        }


    }

    const username = data.username;
    const totalFilms = data.number_films;
    const totalLength = data.total_length;
    const totalDirectors = data.total_directors;
    const totalCountries = data.total_countries;

    const higherAverage = data.higher_average;
    const lowerAverage = data.lower_average;

    const filmsGenre = data.films_per_genre;
    const filmsCountry = data.films_per_country;
    const filmsLanguage = data.films_per_language;
    const filmsTheme = data.films_per_theme;

    const filmsCast = data.films_per_cast;
    const ratingCast = data.rating_per_cast;
    const filmsDirector = data.films_per_director;
    const ratingDirector = data.rating_per_director;
    const filmsStudio = data.films_per_studio;
    const ratingStudio = data.rating_per_studio;
    const filmsComposer = data.films_per_composer;
    const ratingComposer = data.rating_per_composer;



    const filmsYear = fillYears(data.films_per_year);
    const ratingYear = fillYears(data.rating_per_year);


    return (
        <>
            {filmsYear && ratingYear &&
                <Container maxWidth="lg">

                    <Box sx={{ my: 1 }} align="right">

                        <Button
                            variant="text"
                            onClick={() => setFile()}
                        >
                            Change data
                        </Button>
                    </Box>
                    <Box sx={{ my: 12 }}>
                        <Typography
                            variant='h2'
                            align='left'
                            sx={{ mb: 6 }}
                            color="primary"
                            component={Link} href={"https://letterboxd.com/" + username}
                        >
                            {username}'s life in film
                        </Typography>
                        <Grid container sx={{ mt: 6 }}>
                            <Grid item xs={3}>
                                <Typography variant='h3' color='primary'>
                                    {totalFilms}
                                </Typography>
                                <Typography variant='h5' color='secondary'>
                                    FILMS
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='h3' color='primary'>
                                    {totalLength}
                                </Typography>
                                <Typography variant='h5' color='secondary'>
                                    HOURS
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='h3' color='primary'>
                                    {totalDirectors}
                                </Typography>
                                <Typography variant='h5' color='secondary'>
                                    DIRECTORS
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='h3' color='primary'>
                                    {totalCountries}
                                </Typography>
                                <Typography variant='h5' color='secondary'>
                                    COUNTRIES
                                </Typography>
                            </Grid>
                        </Grid>

                    </Box>
                    <Box sx={{ my: 6 }}>
                        <SectionTitle title='BY RELEASE YEAR' />
                        <SubTitle title='FILMS' />
                        <CustomChart
                            categories={Object.keys(filmsYear).map(year => year.charAt(0).toUpperCase() + year.slice(1))}
                            color={"blue"}
                            height={350}
                            horizontal={false}
                            series={[{
                                name: 'Films',
                                data: Object.values(filmsYear)
                            }]}
                        />
                        <SubTitle title='RATING' />
                        <CustomChart
                            categories={Object.keys(ratingYear).map(year => year.charAt(0).toUpperCase() + year.slice(1))}
                            color={"orange"}
                            height={350}
                            horizontal={false}
                            series={[{
                                name: 'Average',
                                data: Object.values(ratingYear)
                            }]}
                        />
                    </Box>
                    <Box sx={{ my: 6 }}>
                        <SectionTitle title='GENRES, COUNTRIES & LANGUAGES' />

                        <Grid container>
                            <Grid item xs={4} sx={{ mb: 3 }}>
                                <SubTitle title='GENRES' />
                                <CustomChart
                                    categories={Object.keys(filmsGenre).map(genre => genre.charAt(0).toUpperCase() + genre.slice(1))}
                                    color={"green"}
                                    height={350}
                                    horizontal={true}
                                    series={[{
                                        name: 'Number of Films',
                                        data: Object.values(filmsGenre)
                                    }]}
                                />
                            </Grid>
                            <Grid item xs={4} sx={{ mb: 3 }}>
                                <SubTitle title='COUNTRIES' />
                                <CustomChart
                                    categories={Object.keys(filmsCountry).map(country => country.charAt(0).toUpperCase() + country.slice(1))}
                                    color={"blue"}
                                    height={350}
                                    horizontal={true}
                                    series={[{
                                        name: 'Number of Films',
                                        data: Object.values(filmsCountry)
                                    }]}
                                />
                            </Grid>
                            <Grid item xs={4} sx={{ mb: 3 }}>
                                <SubTitle title='LANGUAGES' />
                                <CustomChart
                                    categories={Object.keys(filmsLanguage).map(language => language.charAt(0).toUpperCase() + language.slice(1))}
                                    color={"orange"}
                                    height={350}
                                    horizontal={true}
                                    series={[{
                                        name: 'Number of Films',
                                        data: Object.values(filmsLanguage)
                                    }]}
                                />

                            </Grid>
                        </Grid>
                        <SubTitle title='THEMES' />
                        <CustomChart
                            categories={Object.keys(filmsTheme).map(theme => theme.charAt(0).toUpperCase() + theme.slice(1))}
                            color={"gray"}
                            height={350}
                            horizontal={true}
                            series={[{
                                name: 'Number of Films',
                                data: Object.values(filmsTheme)
                            }]}
                        />
                    </Box>
                    <Box sx={{ my: 6 }}>
                        <SectionTitle title='RATED HIGHER THAN AVERAGE' />
                        <RatingComparison films={higherAverage} />
                    </Box>
                    <Box sx={{ my: 6 }}>
                        <SectionTitle title='RATED LOWER THAN AVERAGE' />
                        <RatingComparison films={lowerAverage} />
                    </Box>
                    <Box sx={{ my: 6 }}>
                        <SectionTitle title='STARS' />
                        <TableSection films={filmsCast} rating={ratingCast} />
                    </Box>
                    <Box sx={{ my: 6 }}>
                        <SectionTitle title='DIRECTORS' />
                        <TableSection films={filmsDirector} rating={ratingDirector} />
                    </Box>
                    <Box sx={{ my: 6 }}>
                        <SectionTitle title='STUDIOS' />
                        <TableSection films={filmsStudio} rating={ratingStudio} />
                    </Box>
                    <Box sx={{ my: 6 }}>
                        <SectionTitle title='COMPOSERS' />
                        <TableSection films={filmsComposer} rating={ratingComposer} />
                    </Box>
                </Container>

            }
        </>

    );
}

export default MainLayout;