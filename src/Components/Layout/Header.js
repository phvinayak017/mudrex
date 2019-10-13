import React, { Fragment } from 'react'
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'


function Header(props) {
    const { name } = props
    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense" style={{ height: "80px" }}>
                    <Typography variant="h5" color="inherit" style={{ marginLeft: "20px" }}>
                        Mudrex
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header