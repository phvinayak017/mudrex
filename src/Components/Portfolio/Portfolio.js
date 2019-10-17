import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProfileCard from './Card'
import Header from '../Layout/Header'


const style = {
    head: {
        height: "18vh"
    },
    total: {
        marginLeft: "105vh",
        paddingTop: "6vh",
        fontSize: 48,
        fontWeight: 300

    },
    body: {
        height: "75vh",
        marginTop: "5px",
        overflowY: "auto"
    },
    card: {
        paddingTop: 10,

    }
}
const Portfolio = (props) => {
    const { state: investment } = props.location
    let totalInvestment = investment.reduce((acc, stock) => {
        return acc + stock.total
    }, 0)
    return (
        <Fragment>
            <Header />
            <Grid container >
                <Grid item xs={12} >
                    <Paper style={style.head}>
                        <Typography color="primary" style={style.total}>
                            Total Investment : {totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={style.body}>
                        <Grid container>
                            {investment.map((stock, id) => (
                                <Grid item xs={6} sm={3} key={id}>
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