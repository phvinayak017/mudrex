import React, { Component } from 'react';
import Axios from 'axios'
import './App.css';
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Main from './Components/Layout/Main'
import BuyCryptoModal from './Components/Modal/BuyCrypto'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptoData: [],
      modalData: [],
      cryptoBoughtData: [],
      modalShow: false
    }
  }

  componentDidMount() {
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
          cryptoData: data
        })
      }).catch(error => {
        console.log(error)
      })
  }

  CryptoModalInfo = (id) => {
    // get the cryptoModaldata from cryptodata using Id
    const modalData = this.state.cryptoData.filter((data) => {
      return data.id === id
    })
    console.log("modal data", [...modalData], this.state.cryptoModalData)

    this.setState({
      modalShow: true,
      modalData
    })
    // console.log("app.js", modalData)
  }

  CloseModal = () => {
    this.setState({
      modalShow: false
    })
  }

  handleBuy = (BoughtData) => {
    console.log("BoughtData", BoughtData)
    this.setState((state) => {
      return {
        modalShow: false,
        cryptoBoughtData: (BoughtData)
      }
    })
  }

  render() {
    const { cryptoData, modalData, modalShow, cryptoBoughtData } = this.state
    console.log("App.js, cryptoBoughtData:", cryptoBoughtData)
    return (
      <div >
        <Header />
        <BuyCryptoModal
          cryptoModalData={modalData}
          show={modalShow}
          onClose={this.CloseModal}
          onBuy={this.handleBuy}
        />
        <Main
          cryptodata={cryptoData}
          handleCryptoBuy={this.CryptoModalInfo}
          cryptoBoughtData={cryptoBoughtData}
        // show={modalShow}
        />
        <Footer />
      </div>
    )
  }
}

