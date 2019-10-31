//#region 
import React from 'react'
import Typography from '@material-ui/core/Typography';
import { AppBar, Toolbar } from "@material-ui/core"
import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

//#endregion

const style = {
    textField: {
        marginLeft: 20,
        marginRight: 50,
        marginBottom: 50,
        width: 200,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    button1: {
        marginLeft: 10,
        // marginRight: 10,
        marginBottom: 30,
        paddingLeft: 30,
        paddingRight: 30,
    },
    button2: {
        marginLeft: 10,
        // marginRight: 10,
        marginBottom: 30,
        paddingLeft: 45,
        paddingRight: 45,
    },
    totalprice: {
        paddingTop: 20,
        paddingBottom: 20,
        left: 90,
        fontWeight: 100
    },
    name: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        fontSize: 38,
        fontWeight: 300
    }
}

const BuyCryptoModal = (props) => {

    const { onClose, onBuy, show, cryptoModalData } = props
    // console.log("cryptmodalData:", cryptoModalData)
    const [values, setValues] = React.useState({
        coins: 0,
        total: 0
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    if (show) {
        var { quote: { USD: { price } }, name } = cryptoModalData[0]
        var cryptoPrice = (price * 75)
    }

    const handleClose = (buttonInfo) => {
        return () => {
            setValues({
                coins: ''
            })
            onClose(buttonInfo)
        }
    }

    const handleBuy = () => {
        setValues({
            coins: 0
        })
        let coins = parseInt(values.coins)
        let total = values.coins * cryptoPrice

        onBuy({
            // id: cryptoModalData[0].id,
            name: cryptoModalData[0].name,
            coins: coins,
            total: total
        })

    }

    return (
        <Grid container>
            <div className={showHideClassName}>
                <section className="modal-main">
                    <AppBar position="static">
                        <Toolbar variant="dense" style={{ height: "auto" }}>
                            <Grid container>
                                <Grid item xs={12} s={12} md={6}>
                                    <Typography variant="h5" color="inherit" style={style.header} >
                                        Buy
                                        </Typography>
                                </Grid>
                                <Grid item xs={12} s={12} md={6}>
                                    <Typography variant="h5" color="inherit" style={style.totalprice}>
                                        Total = {(values.coins * cryptoPrice).toLocaleString(undefined, { maximumFractionDigits: 3 })}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h5" color="inherit" style={style.name} >
                                {name}
                                {/* BitCoin */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                id="standard-number"
                                label="Number"
                                value={values.coins}
                                onChange={handleChange('coins')}
                                type="number"
                                inputProps={{ min: "0" }}
                                style={style.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                disabled
                                id="standard-number"
                                label="Price(INR)"
                                value={cryptoPrice}
                                style={style.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                    // spacing={2}
                    >
                        <Grid item xs={6} sm={6} md={3}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                style={style.button1}
                                onClick={handleClose({ button: "buy" })}>
                                CANCLE
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={style.button2}
                                onClick={handleBuy}>
                                BUY
                            </Button>
                        </Grid>
                    </Grid>
                </section>
            </div >
        </Grid >
    )
}

export default (BuyCryptoModal)