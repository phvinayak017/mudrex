import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

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
        fontSize: 40,
        fontWeight: 300,
        marginLeft: 20
    },
    heading: {
        marginTop: 0,
        marginLeft: 18,
        fontSize: 17,
        fontWeight: 400
    },
    value: {
        fontSize: 14,
        fontWeight: 350,
        marginLeft: 20,
        marginTop: 5,
    }

}

const ProfileCard = (props) => {
    const { stock } = props
    return (
        <Card style={style.card} button >
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography style={style.currency} color="Primary" gutterBottom>
                            {stock.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={style.heading} color="textSecondary"   >
                            Coins
                            </Typography>
                        {/* <Divider variant="middle" /> */}
                        <Typography style={style.value} color="textSecondary" >
                            {(stock.coins).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={style.heading} color="textSecondary" >
                            Investment
                            </Typography>
                        <Typography style={style.value} color="textSecondary" >
                            {(stock.total).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    )
}

export default ProfileCard