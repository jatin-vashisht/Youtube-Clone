import {useState,useEffect,useRef} from 'react'
import { Box,Stack,Typography } from '@mui/material'
import {fetchFromAPI} from '../utils/fetchFromAPI'
import {Sidebar, Videos} from './'

const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState('New')
    const [videos, setVideos] = useState([])
    const ref = useRef()
    
    useEffect(() => {
        fetchFromAPI(`search?part=id%2Csnippet&q=${selectedCategory}`)
            .then((data) => setVideos(data.items))
        ref.current.scrollIntoView({behavior: 'smooth'})
    },[ref,selectedCategory])
    return (
        <Stack sx={{flexDirection: { sx: 'column', md: 'row'}}}>
            <Box sx={{height: {sx: 'auto', md: '92vh'}, borderRight: '1px solid #3d3d3d', px: {sx: 0, md: 2}}}>
                <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Typography className='copyright' variant='body2' sx={{mt: 1.5, color: '#fff'}}>
                    Copyright &copy; 2023 Youtube
                </Typography>
            </Box>
    
            <Box p={2} sx={{overflowY: 'auto', height: '90vh', flex: 2}}>
                <Typography ref={ref} variant='h4' fontWeight='bold' mb={2} sx={{color: 'white'}}>
                    {selectedCategory} <span style={{ color: '#F31503'}}>videos</span>
                </Typography>
                <Videos videos={videos} justifyContent='start' />
            </Box>
        </Stack>
    )
}

export default Feed