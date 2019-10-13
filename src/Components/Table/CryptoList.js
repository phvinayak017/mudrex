import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import columns from './tableHeaders'

const style = {
    cell: {
        minWidth: '10px',
        paddingLeft: '50px',

    },
    cryptoname: {
        minWidth: '10px',
        paddingLeft: '50px',
        cursor: "pointer",
        '&:hover': {
            color: "#3f51b5",
        }

    }
}


export default class CryptoList extends Component {

    handleClick = (id) => {
        return () => {
            this.props.onCryptoCurrencyClick(id)
            console.log(`You clicked on row with id ${id}.`);

        }
    }

    render() {
        const { tablecontent } = this.props
        // console.log("tablecontent:", tablecontent)
        return (
            <div>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, id) => {
                                return (<TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ color: "#3f51b5", minWidth: column.minWidth, paddingLeft: column.paddingLeft }}
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
                                < TableRow tabIndex={-1} key={content.id}>
                                    <TableCell
                                        align="left"
                                        style={style.cell}
                                    >
                                        {content.cmc_rank}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={style.cryptoname}
                                        onClick={this.handleClick(content.id)}
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
                                        {cryptoPrice}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={style.cell}
                                    >
                                        {content.circulating_supply}
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
}

