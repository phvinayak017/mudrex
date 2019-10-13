import React from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CryptoList from "../Table/CryptoList";
import { Button } from '@material-ui/core';
import Header from './Header'

export default function Main(props) {
    const { cryptodata, handleCryptoBuy } = props

    function handleClick(cryptoInfo) {
        handleCryptoBuy(cryptoInfo)
    }
    return (
        <div >
            <Grid container >
                <Grid item xs={12} >
                    <Paper style={{ height: "15vh" }}>
                        <Button
                            color='secondary'
                            style={{ marginLeft: "185vh", marginTop: "6vh" }}>
                            Portfolio
                            </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{ height: "75vh", marginTop: "10px", overflowY: "auto" }}>
                        <CryptoList
                            tablecontent={cryptodata}
                            onCryptoCurrencyClick={handleClick}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div >
    )
}

// const BuyCryptoModal = ({ show, cryptoModalData }) => {

//     return (
//         <div className = {}>
//             <section className="modal-main">
//                 <Header
//                     name="Simple Buy"
//                 />

//             </section>
//         </div>
//     )

// }
