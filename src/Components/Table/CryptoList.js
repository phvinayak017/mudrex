//#region 
import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import columns from './tableHeaders'
//#endregion

const style = {
    cell: {
        minWidth: '10px',
        paddingLeft: '50px',

    },
    cryptoname: {
        minWidth: '10px',
        paddingLeft: '50px',
        // cursor: "pointer",
        // '&:hover': {
        //     color: "#3f51b5",
        // }
    },

    button: {
        margin: "1px",
    },
}

const CryptoList = ({ onBuyCoinsClick, onSellCoinsClick, tablecontent }) => {

    const handleBuyClick = (buttonClickInfo) => {
        return () => {
            onBuyCoinsClick(buttonClickInfo)
            console.log(`You clicked on row with id ${buttonClickInfo}. - BUY`);
        }
    }

    const handleSellClick = (id) => {
        return () => {
            onSellCoinsClick(id)
            console.log("sell button inform:", id)

            console.log(`You clicked on row with id ${id}. - SELL`);
        }
    }

    return (
        <div>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => {
                            return (<TableCell
                                key={column.id}
                                align={column.align}
                                style={{ color: "#3f51b5", minWidth: column.minWidth, paddingLeft: column.paddingLeft, margin: column.margin }}
                            >
                                {column.label}
                            </TableCell>)
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tablecontent.map((content) => {
                        let { quote: { USD: { price } } } = content
                        let cryptoPrice = price * 75
                        return (
                            < TableRow hover key={content.id}>
                                <TableCell
                                    align="left"
                                    style={style.cell}
                                >
                                    {content.cmc_rank}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={style.cryptoname}
                                // onClick={this.handleClick(content.id)}
                                >
                                    {content.name}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={style.cell}
                                >
                                    {content.symbol}
                                </TableCell>

                                <TableCell
                                    align="left"
                                    style={style.cell}
                                >
                                    {cryptoPrice.toLocaleString(undefined, { maximumFractionDigits: 3 })}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={style.cell}
                                >
                                    {(content.circulating_supply).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </TableCell>
                                <TableCell
                                    style={style.cell}>
                                    <IconButton
                                        color="primary"
                                        style={style.button}
                                        onClick={handleBuyClick({ id: content.id, button: "buy" })}
                                        aria-label="add to shopping cart">
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        style={style.button}
                                        onClick={handleSellClick({ id: content.id, button: "sell" })}
                                        aria-label="add to shopping cart">
                                        <RemoveShoppingCartIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    }
                    )}

                </TableBody>
            </Table>
        </div >
    )
}

export default CryptoList