const ALIGNMENT = "left"
const WIDTH = 10
const PADDING_LEFT = 50

const columns = [
    {
        id: 'rank',
        label: 'Rank',
        minWidth: WIDTH,
        align: ALIGNMENT,
        paddingLeft: PADDING_LEFT
        // format: value => value.toLocaleString(),
    },
    {
        id: 'name',
        label: 'Name',
        minWidth: WIDTH,
        align: ALIGNMENT,
        paddingLeft: PADDING_LEFT
    },
    {
        id: 'symbol',
        label: 'Symbol',
        minWidth: 10,
        align: ALIGNMENT,
        paddingLeft: PADDING_LEFT
    },
    {
        id: 'price',
        label: 'Price(INR)',
        minWidth: WIDTH,
        align: ALIGNMENT,
        paddingLeft: PADDING_LEFT
        // format: value => value.toLocaleString(),
    },
    {
        id: 'circulatingsupply',
        label: 'Circulating Supply',
        minWidth: WIDTH,
        align: ALIGNMENT,
        paddingLeft: PADDING_LEFT
        // format: value => value.toLocaleString(),
    },
];

export default columns