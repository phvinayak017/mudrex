const ALIGNMENT = "left"
const WIDTH = 10
const PADDING_LEFT = 50

const columns = [
    {
        id: 'rank',
        label: 'Rank',
        minWidth: WIDTH,
        align: ALIGNMENT,
        paddingLeft: PADDING_LEFT,
        margin: 0,
        // format: value => value.toLocaleString(),
    },
    {
        id: 'name',
        label: 'Name',
        minWidth: WIDTH,
        align: ALIGNMENT,
        paddingLeft: PADDING_LEFT,
        margin: 0,
    },
    {
        id: 'symbol',
        label: 'Symbol',
        minWidth: 10,
        align: ALIGNMENT,
        paddingLeft: PADDING_LEFT,
        margin: 0,
    },
    {
        id: 'price',
        label: 'Price(INR)',
        minWidth: WIDTH,
        align: ALIGNMENT,
        paddingLeft: PADDING_LEFT,
        margin: 0,
        // format: value => value.toLocaleString(),
    },
    {
        id: 'circulatingsupply',
        label: 'Circulating Supply',
        minWidth: WIDTH,
        align: ALIGNMENT,
        paddingLeft: PADDING_LEFT,
        margin: 10,
        // format: value => value.toLocaleString(),
    },
    {
        id: 'buy_sell',
        label: 'Buy/Sell',
        minWidth: 1,
        align: ALIGNMENT,
        paddingLeft: 65,
        margin: "0 0 0 10px",
        // format: value => value.toLocaleString(),
    },
];

export default columns