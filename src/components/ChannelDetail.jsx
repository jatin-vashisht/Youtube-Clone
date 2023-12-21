import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"

import {Videos, ChannelCard} from './'
import { fetchFromAPI } from "../utils/fetchFromAPI"

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState()
  const [videos, setVideos] = useState([])
  const {id} = useParams()

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items))

  },[id])

  if(!channelDetail) return 'Loading...'

  const {brandingSettings: {image: {bannerExternalUrl}}} = channelDetail

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: `url(${bannerExternalUrl}) no-repeat center center`,
          zIndex: 10,
          height: '300px'
        }}
      />
      <ChannelCard channelDetail={channelDetail} marginTop='-100px' width='510px' />
      </Box>
      <Box display='flex' p='2' mt={2}>
        {/* <Box sx={{mr: {sm: '100px'}}} /> */}
        <Videos videos={videos} justifyContent='center' />
      </Box>
    </Box>
  )
}

export default ChannelDetail