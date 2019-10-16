import React from 'react'
import Typography from '@material-ui/core/Typography';
import { AppBar, Toolbar } from "@material-ui/core"
import { Button, TextField } from '@material-ui/core';


const BuyCryptoModal = ({ onClose, onBuy, show, cryptoModalData }) => {
    const style = {
        textField: {
            marginLeft: 10,
            marginRight: 50,
            marginBottom: 50,
            width: 200,
        },
        heading: {
            marginLeft: 20,
            marginTop: 20,
        },
        button1: {
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 30,
            paddingLeft: 30,
            paddingRight: 30,
        },
        button2: {
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 30,
            paddingLeft: 45,
            paddingRight: 45,
        },
        totalprice: {
            marginLeft: 180,
            fontWeight: 100
        }
    }

    const [values, setValues] = React.useState({
        coins: '',
        total: ''
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    if (show) {
        let { quote: { USD: { price } } } = cryptoModalData[0]
        var cryptoPrice = price * 75
    }

    const handleClose = () => {
        setValues({
            coins: ''
        })
        onClose()
    }

    const handleBuy = () => {
        setValues({
            coins: ''
        })
        let coins = parseInt(values.coins)
        let total = values.coins * cryptoPrice
        onBuy({
            name: cryptoModalData[0].name,
            coins: coins,
            total: total
        })
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div>
                    <AppBar position="static">
                        <Toolbar variant="dense" style={{ height: "80px" }}>
                            <Typography variant="h5" color="inherit" style={{ marginLeft: "10px" }}>
                                Simple Buy
                            </Typography>
                            <Typography variant="h5" color="inherit" style={style.totalprice}>
                                Total = {(values.coins * cryptoPrice).toFixed(2)}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <Typography variant="h5" color="inherit" style={style.heading}>
                    {cryptoModalData.name}
                </Typography>
                <div style={{ marginLeft: "14px" }} >
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
                </div>
                <div style={{ marginLeft: "250px" }} >
                    <Button
                        variant="outlined"
                        color="secondary"
                        style={style.button1}
                        onClick={handleClose}>
                        CANCLE
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={style.button2}
                        onClick={handleBuy}>
                        BUY
                    </Button>
                </div>
            </section>
        </div >
    )

}

export default BuyCryptoModal