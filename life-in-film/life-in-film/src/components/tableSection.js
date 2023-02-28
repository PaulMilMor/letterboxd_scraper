import { Grid, styled, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { SubTitle } from "./titles";



const TableSection = ({
    films,
    rating
}) => {



    const customTable = (data, type) => {
        
        return (
            <Table size="small" sx={{ mt: 2}}>
                <TableBody>
                    {Object.keys(data).map((key, index) => (
                        <TableRow key={'row-' + index} >
                            <TableCell align='left' color='primary' sx={{borderBottom: "none", color: "#f3f5f7"}}>
                                {key}
                            </TableCell>
                            <TableCell align='right' sx={{borderBottom: "none", color: "#9dadbe"}}>
                                {data[key] + " " + type}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <Grid container spacing={20}>
            <Grid item xs={6} sx={{ mb: 5 }}>
                <SubTitle title='MOST WATCHED' />
                {customTable(films, "films")}

            </Grid>
            <Grid item xs={6} sx={{ mb: 3 }}>
                <SubTitle title='HIGHEST RATED' />
                {customTable(rating, "★")}
            </Grid>
        </Grid>
    );
}

export default TableSection;