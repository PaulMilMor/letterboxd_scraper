import { Container, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const ReadFile = ({handleChange, error}) => {

    const [file, setFile] = useState(null);


    return (
        <Container maxWidth="lg" sx={{ my: 12 }} align="center">
            <Typography variant="h2" color="primary" sx={{ my: 6 }}>
                Life in Film
            </Typography>
            <FileUploader
                multiple={false}
                handleChange={handleChange}
                name="file"
                types={["JSON"]}
            />
            <Typography variant="h6" color="secondary" sx={{ my: 4 }}>
                {file ? 'Loading data... ' : error? 'The json file is not valid!' : 'Upload your letterboxd data!'}
            </Typography>
        </Container>
    )
}

export default ReadFile;
