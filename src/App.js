import React, { Component } from 'react';
import Axios from 'axios'
import './App.css';
import Header from './Components/Layout/Header'
import Main from './Components/Layout/Main'
import BuyCryptoModal from './Components/Modal/BuyCrypto'
import CircularProgress from '@material-ui/core/CircularProgress';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptoData: [],
      modalData: [],
      cryptoBoughtData: [],
      userInverstment: [],
      modalShow: false,
      isLoading: true,
    }
  }

  saveState = () => {
    const { cryptoBoughtData } = this.state
    try {
      localStorage.setItem('cryptoBoughtData', JSON.stringify(cryptoBoughtData))
    } catch (e) {
      console.log(`save failed`)
    }
  }

  loadState = () => {
    try {
      const cryptoBoughtData = JSON.parse(localStorage.getItem('cryptoBoughtData'))
      this.setState({ cryptoBoughtData })
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

  CryptoModalInfo = (id) => {
    const modalData = this.state.cryptoData.filter((data) => {
      return data.id === id
    })
    this.setState({
      modalShow: true,
      modalData
    })
  }

  CloseModal = () => {
    this.setState({
      modalShow: false
    })
  }

  handleBuy = (BoughtData) => {
    this.setState((state) => {
      return {
        modalShow: false,
        cryptoBoughtData: [...state.cryptoBoughtData, BoughtData]
      }
    }, this.saveState)
  }

  getBoughtstocksByCurrency = () => {
    const { cryptoBoughtData } = this.state
    const dataByCurrency = cryptoBoughtData.reduce((acc, obj) => {
      const { name } = obj
      if (!acc[name]) {
        acc[name] = { total: 0, coins: 0 }
      }
      acc[name].total += obj.total
      acc[name].coins += obj.coins
      return acc
    }, {})

    var result = []
    for (let i in dataByCurrency) {
      result = [...result, {
        name: i,
        total: dataByCurrency[i].total,
        coins: dataByCurrency[i].coins
      }]
    }
    return result
  }

  render() {
    const { cryptoData, modalData, modalShow, isLoading } = this.state
    const investmentByCurrency = this.getBoughtstocksByCurrency()
    return (
      <div >
        <Header />
        <BuyCryptoModal
          cryptoModalData={modalData}
          show={modalShow}
          onClose={this.CloseModal}
          onBuy={this.handleBuy}
        />
        {isLoading ?
          <div style={{ position: "absolute", left: "50%", top: "50%" }}>
            <CircularProgress color="secondary" />
          </div> :
          <Main
            cryptodata={cryptoData}
            handleCryptoBuy={this.CryptoModalInfo}
            investmentByCurrency={investmentByCurrency}
          />
        }
      </div>
    )
  }
}

