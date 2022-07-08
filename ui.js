const React = require('react');
const Gradient = require('ink-gradient');
const BigText = require('ink-big-text');
const importJsx = require('import-jsx');
const Table = importJsx('./components/Table')

const App = ({coins = "bitcoin ethereum tether binancecoin ripple cardano solana dogecoin polkadot litecoin"}) => (
	<>
	<Gradient name="passion">
		<BigText text="crypto cli" align='center' font='chrome'/>
	</Gradient>
	<Table coins = {coins}/>
	</>
);

module.exports = App;
