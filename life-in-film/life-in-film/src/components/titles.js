import { Divider, Typography } from "@mui/material"


export const SectionTitle = ({
    title
}) => {
    return (
        <>
            <Typography variant='h5' sx={{mb: 1, mt: 15 }} color="primary">
                {title}
            </Typography>
            <Divider color="#283038" sx={{mb: 8}}/>
        </>

    )
}

export const SubTitle = ({
    title
}) => {
    return (
        <Typography variant='body2' color='secondary'>
            {title}
        </Typography>
    )
}