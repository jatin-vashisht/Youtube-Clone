import {
  Box,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Link } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { demoProfilePicture } from "../utils/constants";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchFromAPI(
      `commentThreads?part=snippet&videoId=${id}&maxResults=100`
    ).then((data) => setComments(data?.items));
  }, [id]);

  if(!comments) return 'Loading...'

  return (
    <Stack direction="column" py={2} px={{xs: 1, sm: 2, md: 5}}>
      {comments.map(
        ({
          snippet: {
            topLevelComment: {
              snippet: {
                authorChannelId,
                authorDisplayName,
                authorProfileImageUrl,
                textOriginal,
                likeCount,
              },
            },
          },
        }) => (
          <Box
            sx={{
              boxShadow: "none",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Link to={`/channel/${authorChannelId.value}`}>
              <CardContent>
                <CardMedia
                  image={authorProfileImageUrl || demoProfilePicture}
                  alt={"Profile Image"}
                  sx={{
                    borderRadius: "50%",
                    height: "50px",
                    width: "50px",
                    mb: 2,
                    border: "1px solid #e3e3e3",
                  }}
                />
              </CardContent>
            </Link>
            <Stack direction="column" justifyContent='center'>
              <Typography fontSize={14} color='#fff'>
                {authorDisplayName}
                <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px" }} />
              </Typography>
              <Typography color="gray" opacity={0.4} my={1} fontSize={14}>
                {textOriginal.slice(0,600)}
              </Typography>
              <Typography color="gray" fontSize={12}>
                {parseInt(likeCount).toLocaleString()} Likes
              </Typography>
            </Stack>
          </Box>
        )
      )}
    </Stack>
  );
};

export default Comments;
