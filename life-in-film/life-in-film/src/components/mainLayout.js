import { Box, Container, Grid, Link, Typography } from '@mui/material';
import Chart from 'react-apexcharts';


import data from '../data.json';


const MainLayout = () => {
    const username = data.username;
    const totalFilms = data.number_films;
    const totalLength = data.total_length;
    const totalDirectors = data.total_directors;
    const totalCountries = data.total_countries;
    const higherAverage = data.higher_average;
    const filmsGenre = data.films_per_genre;

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 6 }}>

                <Typography variant='h2' align='left' sx={{ mb: 2 }}>
                    {username}'s life in film
                </Typography>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant='h3' color='text.secondary'>
                            {totalFilms}
                        </Typography>
                        <Typography variant='h5' color='text.secondary'>
                            FILMS
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='h3' color='text.secondary'>
                            {totalLength}
                        </Typography>
                        <Typography variant='h5' color='text.secondary'>
                            HOURS
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='h3' color='text.secondary'>
                            {totalDirectors}
                        </Typography>
                        <Typography variant='h5' color='text.secondary'>
                            DIRECTORS
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='h3' color='text.secondary'>
                            {totalCountries}
                        </Typography>
                        <Typography variant='h5' color='text.secondary'>
                            COUNTRIES
                        </Typography>
                    </Grid>
                </Grid>

            </Box>
            <Box sx={{ my: 4 }}>
                <Typography variant='h5' sx={{ mb: 3 }}>
                    GENRES, COUNTRIES & LANGUAGES
                </Typography>
                <Grid container>
                    <Grid item xs={4} sx={{ mb: 3 }}>
                        <Typography variant='body2'>
                            Genres
                        </Typography>
                        <Chart
                            type='bar'
                            height={350}
                            options={{
                                chart: {
                                    type: 'bar',
                                    height: 350
                                },
                                xaxis: {
                                    categories: Object.keys(filmsGenre).map(genre => genre.charAt(0).toUpperCase() + genre.slice(1))
                                },
                                dataLabels: {
                                    enabled: false
                                },
                                fill: {
                                    colors: ["#000"]
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: true
                                    }
                                }                                
                            }}
                            series={[{
                                name: 'Number of Films',
                                data: Object.values(filmsGenre)
                            }]
                            }
                        />
                    </Grid>
                    <Grid item xs={4} sx={{ mb: 3 }}>
                        <Typography variant='body2'>
                            Genres
                        </Typography>
                        <Chart
                            type='bar'
                            height={350}
                            options={{
                                chart: {
                                    type: 'bar',
                                    height: 350
                                },
                                xaxis: {
                                    categories: Object.keys(filmsGenre).map(genre => genre.charAt(0).toUpperCase() + genre.slice(1))
                                },
                                dataLabels: {
                                    enabled: false
                                },
                                fill: {
                                    colors: ["#000"]
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: true
                                    }

                                }
                            }}
                            series={[{
                                data: Object.values(filmsGenre)
                            }]
                            }
                        />
                    </Grid>
                    <Grid item xs={4} sx={{ mb: 3 }}>
                        <Typography variant='body2'>
                            Genres
                        </Typography>
                        <Chart
                            type='bar'
                            height={350}
                            options={{
                                chart: {
                                    type: 'bar',
                                    height: 350
                                },
                                xaxis: {
                                    categories: Object.keys(filmsGenre).map(genre => genre.charAt(0).toUpperCase() + genre.slice(1))
                                },
                                dataLabels: {
                                    enabled: false
                                },
                                fill: {
                                    colors: ["#000"]
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: true
                                    }

                                }
                            }}
                            series={[{
                                data: Object.values(filmsGenre)
                            }]
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ my: 4 }}>
                <Typography variant='h5' sx={{ mb: 3 }}>
                    RATED HIGHER THAN AVERAGE
                </Typography>
                <Grid container alignItems='flex-end'>
                    {
                        higherAverage.map((film) =>
                        (
                            <Grid item xs={2.4} align='center' sx={{ mb: 3 }} key={film.url}>
                                <Typography variant='body2' component={Link} href={film.url}  >
                                    {film.title + " (" + film.year + ")"}
                                </Typography>

                                <Typography variant='subtitle2' color='text.secondary' sx={{ my: 2 }}>
                                    {film.rating + "★ vs " + film.average_rating + "★"}
                                </Typography>

                            </Grid>
                        )
                        )
                    }
                </Grid>
            </Box>
        </Container>

    );
}

export default MainLayout;