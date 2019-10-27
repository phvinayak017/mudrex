import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const style = {
    card: {
        maxWidth: 350,
        margin: 30,

    },
    buyinfo: {
        display: 'flex',
        justifyContent: "space-between",
        transform: 'scale(0.8)',
    },
    currency: {
        fontSize: "2.5rem",
        fontWeight: 300,
        marginLeft: "1rem"
    },
    heading: {
        marginTop: 0,
        marginLeft: 18,
        fontSize: "1rem",
        fontWeight: 400
    },
    value: {
        fontSize: "0.9rem",
        fontWeight: 350,
        marginLeft: 20,
        marginTop: 5,
    }

}

const ProfileCard = (props) => {
    const { stock } = props
    return (
        <Card style={style.card} >
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography style={style.currency} color="primary" gutterBottom>
                            {stock.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={style.heading} color="textSecondary"   >
                            Coins
                            </Typography>
                        <Typography style={style.value} color="textSecondary" >
                            {(stock.coins).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={style.heading} color="textSecondary" >
                            Investment
                            </Typography>
                        <Typography style={style.value} color="textSecondary" >
                            &#8377; {(stock.total).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    )
}

export default ProfileCard