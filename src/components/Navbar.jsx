import { Stack } from "@mui/material"
import { Link } from "react-router-dom"

import {logo} from '../utils/constants'
import {SearchBar} from "./"

const Navbar = () => (
    <Stack 
        alignItems='center'
        p={2}
        sx={{position: 'sticky', background: '#000', top: 0, justifyContent: 'space-between', flexDirection: {sm: 'row'}}}
        zIndex={1}
        gap={1}
    >
        <Link to='/' style={{display: 'flex', alignItems: 'center', color: 'white', fontWeight: 'bolder', fontFamily: 'Roboto'}}>
            <img src={logo} alt="logo" height={45} />
            YouTube
        </Link>
        <SearchBar />
    </Stack>
)

export default Navbar