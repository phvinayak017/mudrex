import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProfileCard from './Card'
import Header from '../Layout/Header'


const style = {
    head: {
        height: "auto",
        marginBottom: "1vh"
    },
    heading: {
        marginLeft: "40px",
        paddingTop: "40px",
        fontSize: "1.7rem",
        fontWeight: 300

    },
    value: {
        marginLeft: "40px",
        marginBottom: "30px",
        paddingTop: "4px",
        fontSize: 18,
        fontWeight: 300,
        color: "#717171"

    },
    body: {
        height: "75vh",
        marginTop: "5px",
        overflowY: "auto"
    },
    card: {
        paddingTop: 10,
        // marginLeft: 10,
        // marginLeft: 30,
        // marginTop: 30,
    }
}
const Portfolio = (props) => {
    const { cryptodata, investments } = props.location.state
    console.log("portfolio investments data: ", cryptodata, investments)

    const investmentsWithCurrentPrice = investments.map(investment => {
        const { name } = investment
        cryptodata.map(stock => {
            if (name === stock.name) {
                let { quote: { USD: { price } } } = stock
                investment["current_price"] = price * 75
            }
        })
        return investment
    }).filter((item) => {
        return item.coins > 0
    })

    let currentInvestment = investmentsWithCurrentPrice.reduce((acc, stock) => {
        let total = stock.coins * stock.current_price
        return acc + total
    }, 0)

    let totalInvested = investments.reduce((acc, stock) => {
        return acc + stock.total
    }, 0)

    let profit_loss = currentInvestment - totalInvested

    return (
        <Fragment>
            <Header />
            <Grid container >
                <Grid item xs={12} >
                    <Paper style={style.head}>
                        <Grid container>
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography color="secondary" style={style.heading} align="left">
                                    INVESTED
                                </Typography>
                                <Typography color="primary" style={style.value} align="left">
                                    &#8377; {totalInvested.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography color="secondary" style={style.heading} align="left">
                                    CURRENT
                                </Typography>
                                <Typography color="primary" style={style.value} align="left">
                                    &#8377; {currentInvestment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography color="secondary" style={style.heading} align="left">
                                    PROFIT/LOSS
                                </Typography>
                                <Typography style={style.value} align="left">
                                    &#8377; {profit_loss.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={style.body}>
                        <Grid container>
                            {investmentsWithCurrentPrice.map((stock, id) => (
                                <Grid item xs={12} sm={6} md={3} key={id}>
                                    <ProfileCard
                                        style={style.card}
                                        stock={stock}
                                    />
                                </Grid>
                            ))}

                        </Grid>

                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Portfolio