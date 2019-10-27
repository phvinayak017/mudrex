import React, { Component } from 'react';
import Axios from 'axios'
import './App.css';
import Header from './Components/Layout/Header'
import Main from './Components/Layout/Main'
import BuyCryptoModal from './Components/Modal/BuyCrypto'
import CircularProgress from '@material-ui/core/CircularProgress';
import SellCryptoModal from './Components/Modal/SellCrypto';
import AlertDialogue from './Components/Modal/AlertDialogue';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptoData: [],
      modalData: [],
      cryptoBoughtData: [],
      cryptoSoldData: [],
      userInverstment: [],
      buyModalShow: false,
      sellModalShow: false,
      notificationModalShow: false,
      isLoading: true,
    }
  }

  saveState = () => {
    const { cryptoBoughtData, cryptoSoldData } = this.state
    try {
      localStorage.setItem('cryptoBoughtData', JSON.stringify(cryptoBoughtData))
      localStorage.setItem('cryptoSoldData', JSON.stringify(cryptoSoldData))
    } catch (e) {
      console.log(`save failed`)
    }
  }

  loadState = () => {
    try {
      const cryptoBoughtData = JSON.parse(localStorage.getItem('cryptoBoughtData'))
      const cryptoSoldData = JSON.parse(localStorage.getItem('cryptoSoldData'))

      if (cryptoBoughtData && cryptoSoldData) {
        this.setState({
          cryptoBoughtData,
          cryptoSoldData
        })
      }
    } catch (e) {
      console.log(`couldn't load data`)
    }
  }

  componentDidMount() {
    this.loadState()
    this.getData()
  }

  getData = () => {
    const API_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    let config = {
      headers: {
        "X-CMC_PRO_API_KEY": "729ea42b-1812-4c13-b09a-8eaaf2516843",
      }
    }
    Axios
      .get(API_URL, config)
      .then(({ data: { data } }) => {
        this.setState({
          cryptoData: data,
          isLoading: false
        })
      }).catch(error => {
        console.log(error)
      })
  }

  CryptoModalInfo = (buttonClickInfo) => {
    const modalData = this.state.cryptoData.filter((data) => {
      return data.id === buttonClickInfo.id
    })
    if (buttonClickInfo.button === "buy") {
      this.setState({
        buyModalShow: true,
        modalData
      })
    }
    if (buttonClickInfo.button === "sell") {
      this.setState({
        sellModalShow: true,
        modalData
      })
    }
  }

  CloseModal = (buttonInfo) => {

    if (buttonInfo.button === "buy") {
      this.setState({
        buyModalShow: false
      })
    }
    if (buttonInfo.button === "sell") {
      this.setState({
        sellModalShow: false
      })
    }
    if (buttonInfo.button === "notification") {
      this.setState({
        notificationModalShow: false
      })
    }
  }

  handleBuy = (BoughtData) => {
    this.setState((state) => {
      return {
        buyModalShow: false,
        notificationModalShow: true,
        cryptoBoughtData: [...state.cryptoBoughtData, BoughtData]
      }
    }, this.saveState)
  }

  handleSell = (SoldData) => {
    this.setState((state) => {
      return {
        sellModalShow: false,
        notificationModalShow: true,
        cryptoSoldData: [...state.cryptoSoldData, SoldData]
      }
    }, this.saveState)
  }


  // aggregate the data as user buys stocks

  aggregateData = (stockData, isAddData) => {
    console.log("stock data", stockData)
    const dataByCurrency = stockData.reduce((acc, obj) => {
      const { name } = obj
      if (!acc[name]) {
        acc[name] = { total: 0, coins: 0, /*id: id*/ }
      }
      if (isAddData) {
        acc[name].total += obj.total
        acc[name].coins += obj.coins
      } else {
        acc[name].total = obj.total - acc[name].total
        acc[name].coins = Math.abs(acc[name].coins - obj.coins)
      }
      return acc
    }, {})

    var result = []
    for (let i in dataByCurrency) {
      result = [...result, {
        name: i,
        // id: dataByCurrency[i].id,       
        coins: dataByCurrency[i].coins,
        total: dataByCurrency[i].total,
      }]
    }
    return result
  }
  getBoughtstocksByCurrency = () => {
    const { cryptoBoughtData, cryptoSoldData } = this.state
    const boughtData = this.aggregateData(cryptoBoughtData, true)
    const soldData = this.aggregateData(cryptoSoldData, true)
    const boughtAndSoldData = [...boughtData, ...soldData]
    const portfolioData = this.aggregateData(boughtAndSoldData, false)
    console.log("sold and bought data:", boughtData, soldData, portfolioData)

    return portfolioData
  }

  render() {
    const { cryptoData, modalData, buyModalShow, sellModalShow, isLoading, notificationModalShow } = this.state
    const investmentByCurrency = this.getBoughtstocksByCurrency()
    // console.log("investmentByCurrency:", investmentByCurrency, cryptoBoughtData)
    return (
      <div >
        <Header />
        <BuyCryptoModal
          cryptoModalData={modalData}
          show={buyModalShow}
          onClose={this.CloseModal}
          onBuy={this.handleBuy}
        />
        <SellCryptoModal
          cryptoModalData={modalData}
          boughtData={investmentByCurrency}
          show={sellModalShow}
          onClose={this.CloseModal}
          onSell={this.handleSell}
        />
        <AlertDialogue
          show={notificationModalShow}
          onClose={this.CloseModal}
        />
        {isLoading ?
          <div style={{ position: "absolute", left: "50%", top: "50%" }}>
            <CircularProgress color="secondary" />
          </div> :
          <Main
            cryptodata={cryptoData}
            handleCryptoBuy={this.CryptoModalInfo}
            handleCryptoSell={this.CryptoModalInfo}
            investmentByCurrency={investmentByCurrency}
          />
        }
      </div>
    )
  }
}

