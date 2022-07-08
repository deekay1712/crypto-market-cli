const React = require('react');
const { useState, useEffect } = require('react');
const { Box, Text, Newline } = require('ink');
const axios = require('axios')

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false";
const Table = (props) => {
  const coins = props.coins.split(' ');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url)
        .then(response => setData(response.data))
        .catch(e => console.log(e))
  }, []);

  const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval = null;
    if(loading) {
      interval = setInterval(() => {
        setIndex(index => (index + 1) % spinner.length);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [loading]);

  var dataFiltered = coins.map(coin => data.find(data => data.id === coin));
  dataFiltered = dataFiltered.filter(data => data !== undefined);

  useEffect(() => {
    if (dataFiltered.length > 0) {
      setLoading(false);
    }
  }, [dataFiltered.length]);

  return (
    <Box borderStyle='single' padding={2} flexDirection='column'>
      {
        dataFiltered.length === 0 ?
        <Box>
          <Text>{spinner[index]}</Text>
        </Box>:
        <Box flexDirection='column'>
          <Box>
            <Box width='25%'><Text>COIN</Text></Box>
            <Box width='25%'><Text>PRICE (INR)</Text></Box>
            <Box width='25%'><Text>24 HOUR CHANGE</Text></Box>
            <Box width='25%'><Text>ALL TIME HIGH</Text></Box>
          </Box>
          <Newline />
          {
            dataFiltered.map(({ id, name, current_price, price_change_percentage_24h, ath }) => (
              <Box key={id}>
                <Box width='25%'><Text>{name}</Text></Box>
                <Box width='25%'><Text color='cyan'>{'₹' + current_price.toLocaleString()}</Text></Box>
                <Box width='25%'><Text backgroundColor={price_change_percentage_24h < 0 ? 'red' : 'green'}>{price_change_percentage_24h.toFixed(2) + '%'}</Text></Box>
                <Box width='25%'><Text color='green'>{'₹' + ath.toLocaleString()}</Text></Box>
              </Box>
            ))
          }
        </Box>
      }
    </Box>
  )
}

module.exports = Table;