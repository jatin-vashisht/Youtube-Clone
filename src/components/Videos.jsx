import { Box, Stack } from '@mui/material'
import {VideoCard, ChannelCard} from './'

const Videos = ({videos, justifyContent, direction}) => {
  if(!videos?.length) return 'Loading...'
  return (
    <Stack direction={direction || 'row'} flexWrap='wrap' justifyContent={justifyContent} gap={2}>
      {videos.map((item,idx) => (
        <Box key={idx} sx={{display: item.id.videoId || item.id.channelId? 'visible' : 'none' }}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  )
}

export default Videos