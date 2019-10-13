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
      cryptodata: [],
      cryptoModalData: [],
      cryptoBuyData: [],
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
          cryptodata: data
        })
      }).catch(error => {
        console.log(error)
      })
  }

  CryptoModalInfo = (cryptoModalData) => {
    this.setState({
      modalShow: true,
      cryptoModalData
    })
    console.log("app.js", cryptoModalData)
  }

  CloseModal = () => {
    this.setState({
      modalShow: false
    })
  }

  handleBuy = (cryptoBoughtData) => {
    console.log(cryptoBoughtData)
    this.setState({
      modalShow: false
    })
  }

  render() {
    const { cryptodata, cryptoModalData, modalShow } = this.state
    return (
      <div >
        <Header />
        <BuyCryptoModal
          cryptoModalData={cryptoModalData}
          show={modalShow}
          onClose={this.CloseModal}
          onBuy={this.handleBuy}
        />
        <Main
          cryptodata={cryptodata}
          handleCryptoBuy={this.CryptoModalInfo}
        // cryptoModalData={cryptoModalData}
        // show={modalShow}
        />
        <Footer />
      </div>
    )
  }
}

