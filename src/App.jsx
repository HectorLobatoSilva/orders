import React from 'react';
import NavBar from './Components/NavBar'
import Body from './Components/Body'
import { CssBaseline } from '@material-ui/core';

const App = () => {
    return (
        <div>
            <CssBaseline/>
            <NavBar />
            <Body />
        </div>
    )
}

export default App