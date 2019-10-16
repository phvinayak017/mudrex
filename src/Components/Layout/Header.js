import React from 'react'
import { AppBar, Toolbar, Typography } from "@material-ui/core"

const Header = () => {
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