import { Grid, Link, Stack, Typography } from "@mui/material";



const RatingComparison = ({
    films
}) => {
    return (
        <Grid container spacing={2} alignItems='stretch'>
            {films.map((film) => (
                <Grid item xs={2.4} align='center' sx={{ mb: 3 }} key={film.url}>
                    <Stack direction='column' justifyContent='space-between' height="100%">
                        <Typography variant='body2' component={Link} href={film.url}  >
                            {film.title + " (" + film.year + ")"}
                        </Typography>

                        <Typography variant='subtitle2' color='secondary' sx={{ my: 2 }}>
                            {film.rating + "★ vs " + film.average_rating + "★"}
                        </Typography>

                    </Stack>

                </Grid>
            ))}
        </Grid>
    )
}

export default RatingComparison;