import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CryptoList from "../Table/CryptoList";
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


const Main = (props) => {
    const { cryptodata, handleCryptoBuy, investmentByCurrency } = props

    const handleClick = (id) => {
        console.log("handleclick:", id)
        handleCryptoBuy(id)
    }

    const handlePortfolioClick = () => {
        props.history.push('/portfolio', investmentByCurrency)
    }
    return (
        <div >
            <Grid container >
                <Grid item xs={12} >
                    <Paper style={{ height: "15vh" }}>
                        <Button
                            variant="contained"
                            color='secondary'
                            style={{ marginLeft: "185vh", marginTop: "6vh" }}
                            onClick={handlePortfolioClick}>
                            Portfolio
                            </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{ height: "75vh", marginTop: "10px", overflowY: "auto" }}>
                        <CryptoList
                            tablecontent={cryptodata}
                            onCryptoCurrencyClick={handleClick}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div >
    )
}

export default withRouter(Main)