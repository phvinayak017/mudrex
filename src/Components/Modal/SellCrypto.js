import React from 'react'
import Typography from '@material-ui/core/Typography';
import { AppBar, Toolbar } from "@material-ui/core"
import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

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
  name: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 38,
    fontWeight: 300
  },
  subheading: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 17,
    fontWeight: 400
  },
  value: {
    fontSize: 14,
    fontWeight: 300,
    marginLeft: 22,
    marginTop: 5,
    marginBottom: 10,
  },
  notify: {
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: 400
  }
}

const SellCryptoModal = (props) => {
  const { onClose, onSell, show, cryptoModalData, boughtData } = props
  // console.log("bought data -seel: ", boughtData)
  //#region 
  const [values, setValues] = React.useState({
    coins: 0,
    total: 0,
    isholding: true
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  // get modal data with current market currency price
  const getModalData = (cryptoModalData, boughtData) => {
    const { quote: { USD: { price } }, name } = cryptoModalData[0]
    const currentCryptoPrice = (price * 75)

    const sellingCurrency = boughtData.filter(currency => {
      return currency.name === name
    })

    let modalData = {}

    // Check if user has bought any coins before, if not assign 0 to coins and investment
    if (sellingCurrency.length === 0) {
      modalData = {
        currentCryptoPrice,
        name,
        holdingCoins: 0,
        investment: 0
      }
    } else {
      modalData = {
        currentCryptoPrice,
        name,
        holdingCoins: sellingCurrency[0].coins,
        investment: (sellingCurrency[0].total).toLocaleString(undefined, { maximumFractionDigits: 3 })
      }

    }
    return modalData
  }

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  if (show) {
    var sellModaldata = getModalData(cryptoModalData, boughtData)
    var { currentCryptoPrice, name, holdingCoins, investment } = sellModaldata
    // console.log("sellModaldata:", investment)
  }

  const handleClose = (buttonInfo) => {
    return () => {
      setValues({
        coins: ''
      })
      onClose(buttonInfo)
    }
  }

  const handleSell = () => {
    setValues({
      coins: 0
    })
    let coins = parseInt(values.coins)
    let total = coins * currentCryptoPrice
    onSell({
      // id: cryptoModalData[0].id,
      name: cryptoModalData[0].name,
      coins: coins,
      total: total
    })
  }
  //#endregion

  return (
    <Grid container>
      <div className={showHideClassName}>
        <section className="modal-main">
          <AppBar position="static">
            <Toolbar variant="dense" style={{ height: "80px" }}>
              <Grid container>
                <Grid item xs={12} s={12} md={6}>
                  <Typography variant="h5" color="inherit" style={style.header}>
                    Sell
                    </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h5" color="inherit" style={style.name}>
              {name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            {/* <Typography color="primary" style={style.subtitle} >
              Current Holdings
                </Typography> */}
            {holdingCoins === 0 ? (<Typography color="secondary" style={style.notify} >
              Sorry, you are not holding any coins
                </Typography>) : null}
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h6" color="primary" style={style.subheading} >
                Holding Coins
              </Typography>
              <Typography variant="h6" color="inherit" style={style.value} >
                {holdingCoins}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h6" color="primary" style={style.subheading} >
                {holdingCoins === 0 ? "Current P/L" : "Investment"}
              </Typography>
              <Typography variant="h6" color="inherit" style={style.value} >
                &#8377; {investment}
              </Typography>
            </Grid>
          </Grid>



          <Grid container>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                id="standard-number"
                label="Number"
                value={values.coins}
                onChange={handleChange('coins')}
                type="number"
                inputProps={{ min: "0", max: holdingCoins }}
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
                value={(currentCryptoPrice)}
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
          >
            <Grid item xs={6} sm={6} md={3}>
              <Button
                variant="outlined"
                color="secondary"
                style={style.button1}
                onClick={handleClose({ button: "sell" })}>
                CANCLE
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <Button
                disabled={holdingCoins === 0 ? true : false}
                variant="contained"
                color="secondary"
                style={style.button2}
                onClick={handleSell}>
                SELL
              </Button>
            </Grid>
          </Grid>
        </section>
      </div >
    </Grid >
  )
}

export default (SellCryptoModal)