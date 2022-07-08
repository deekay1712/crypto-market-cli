#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
		$ crypto-market-cli

	Options
		--coins  "coins name separated by space"

	Examples
		$ crypto-market-cli --coins="bitcoin polkadot ethereum"
`);

render(React.createElement(ui, cli.flags));
