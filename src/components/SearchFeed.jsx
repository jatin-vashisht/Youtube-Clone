import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const {searchTerm} = useParams()

  useEffect(() => {
    fetchFromAPI(`search?part=id%2Csnippet&q=${searchTerm}`).then(
      (data) => setVideos(data.items)
    );
  }, [searchTerm]);
  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        sx={{ color: "white" }}
        textAlign='center'
      >
        Search results for {searchTerm} <span style={{ color: "#F31503" }}>videos</span>
      </Typography>
      <Videos videos={videos} justifyContent="center" />
    </Box>
  );
};

export default SearchFeed;
