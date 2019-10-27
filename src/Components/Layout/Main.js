import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CryptoList from "../Table/CryptoList";
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const style = {
    profilebutton: {
        margin: "5.5vh 10vw"
    }
}

const Main = (props) => {
    const { cryptodata, handleCryptoBuy, handleCryptoSell, investmentByCurrency } = props

    const handleBuyClick = (buttonClickInfo) => {
        // console.log("handleclick - BUY:", buttonClickInfo)
        handleCryptoBuy(buttonClickInfo)
    }
    const handleSellClick = (buttonClickInfo) => {
        // console.log("handleclick - SELL:", buttonClickInfo)
        handleCryptoSell(buttonClickInfo)
    }

    const handlePortfolioClick = () => {
        props.history.push('/portfolio', { investments: investmentByCurrency, cryptodata })
    }
    return (
        <div >
            <Grid container >
                <Grid item xs={12} >
                    <Paper style={{ height: "14vh" }}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems='center'

                        >
                            <Button
                                variant="contained"
                                color='secondary'
                                style={style.profilebutton}
                                onClick={handlePortfolioClick}
                            >
                                Portfolio
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper style={{ height: "75vh", marginTop: "10px", overflowY: "auto" }}>
                        <CryptoList
                            tablecontent={cryptodata}
                            onBuyCoinsClick={handleBuyClick}
                            onSellCoinsClick={handleSellClick}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div >
    )
}

export default withRouter(Main)