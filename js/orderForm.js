const jsonfile = require('jsonfile');
const {remote} = require('electron');
const app = remote.app;
const moment = require('moment');

jsonfile.readFile(app.getPath('userData') + '/trades.json', (err) => {
	if (err) {
		console.log('File not found, creating now...');
		jsonfile.writeFile(app.getPath('userData') + '/trades.json', [], (err) => {
			if (err) return err;
		});
	};
	return;
});

let trades = require(app.getPath('userData') + '/trades.json');
let tradeCount = trades.length;

let openPosition = document.querySelector('#openPositions');
for (trade of trades) {
	if(trade.status == 'open') {
		console.log('Found trade');
		let openTrade = document.createElement('OPTION');
		openTrade.innerHTML = `+${trade.amount} ${trade.ticker} ${trade.strategy}`;
		openTrade.setAttribute('id', trade.id);
		openPosition.appendChild(openTrade);
	}
}
openPosition.addEventListener('focus', () => {
	trades = require(app.getPath('userData') + '/trades.json');
	openPosition.innerHTML = '';
	let placehold = document.createElement('OPTION');
	placehold.setAttribute('value', '');
	placehold.textContent = 'OPEN POSITIONS';
	openPosition.appendChild(placehold);
	for (trade of trades) {
		if (trade.status == 'open') {
			console.log('Found trade');
			let openTrade = document.createElement('OPTION');
			openTrade.innerHTML = `+${trade.amount} ${trade.ticker} ${trade.strategy}`;
			openTrade.setAttribute('id', trade.id);
			openPosition.appendChild(openTrade);
		}
	}
})
openPosition.addEventListener('change', (event) => {
	if (event.target.value != '') {
		openPosition.classList = '';
		let trade = trades[openPosition.children[openPosition.selectedIndex].getAttribute('id')];
		if(trade.strategy == 'CALL') {
			strategy.selectedIndex = 0;
			strategy.classList = '';
		}
		else {
			strategy.selectedIndex = 1;
			strategy.classList = '';
		}
		ticker.value = trade.ticker;
		ticker.classList = '';
		amount.value = trade.amount;
		amount.classList = '';
		entry.value = trade.entry;
		entry.classList = '';
	}
	if (event.target.value == '') {
		openPosition.classList = 'empty';
		strategy.classList = 'empty';
		ticker.value = '';
		ticker.classList = 'empty';
		amount.value = '';
		amount.classList = 'empty';
		entry.value = '';
		entry.classList = 'empty';
		exit.value = '';
		exit.classList = 'empty';
	}
})

let strategy = document.querySelector('#strategy');
strategy.addEventListener('focus', () => {
	strategy.classList = '';
})

let ticker = document.querySelector('#ticker');
ticker.addEventListener('focus', () => {
	ticker.classList = '';
	ticker.addEventListener('focusout', (event) => {
		if (event.target.value != '') {
			ticker.classList = '';
		}
		if (event.target.value == '') {
			ticker.classList = 'empty';
		}
	});
});

let amount = document.querySelector('#amount');
amount.addEventListener('focus', () => {
	amount.classList = '';
	amount.addEventListener('focusout', (event) => {
		if (event.target.value != '') {
			amount.classList = '';
		}
		if (event.target.value == '') {
			amount.classList = 'empty';
		}
	});
});

let entry = document.querySelector('#entry');
entry.addEventListener('focus', () => {
	entry.classList = '';
	entry.addEventListener('focusout', (event) => {
		if (event.target.value != '') {
			entry.classList = '';
		}
		if (event.target.value == '') {
			entry.classList = 'empty';
		}
	});
});

let exit = document.querySelector('#exit');
exit.addEventListener('focus', () => {
	exit.classList = '';
	exit.addEventListener('focusout', (event) => {
		if (event.target.value != '') {
			exit.classList = '';
		}
		if (event.target.value == '') {
			exit.classList = 'empty';
		}
	});
});

let tradeAmount, tickerValue, strategyValue, entryValue, exitValue, status;

let submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', () => {
	tradeAmount = amount.value;
	tickerValue = ticker.value;
	if(strategy.selectedIndex == 0) {
		strategyValue = 'CALL'
	} else if(strategy.selectedIndex == 1) {
		strategyValue = 'PUT'
	}
	entryValue = entry.value;
	exitValue = exit.value;
	if(openPosition.selectedIndex != 0 && exitValue != '') {
		status='closed';
		trades.splice(openPosition.children[openPosition.selectedIndex].getAttribute('id'), 1, { "amount": tradeAmount, "ticker": tickerValue, "strategy": strategyValue, "entry": entryValue, "exit": exitValue, "status": status, "id": openPosition.selectedIndex != 0 ? openPosition.children[openPosition.selectedIndex].getAttribute('id') : tradeCount });
	} else if(exitValue != '') {
		status = 'closed';
		trades.push({ "amount": tradeAmount, "ticker": tickerValue, "strategy": strategyValue, 	"entry": entryValue, "exit": exitValue, "status": status, "id": tradeCount });
	} else {
		status = 'open';
		trades.push({ "amount": tradeAmount, "ticker": tickerValue, "strategy": strategyValue, "entry": entryValue, "exit": exitValue, "status": status, "id": tradeCount });
	};

	if(openPosition.selectedIndex == 0) {
		tradeCount++;
	}

	jsonfile.writeFile(app.getPath('userData') + '/trades.json', trades, (err) => {
		if (err) {
			console.log(moment().format('hh:mm:ss:ms') + ': The file could not be written.', err);
		}
		console.log(moment().format('hh:mm:ss:ms') + ': Trade has been successfully saved.');
	});

	openPosition.classList = 'empty';
	openPosition.selectedIndex = 0;
	strategy.classList = 'empty';
	ticker.value = '';
	ticker.classList = 'empty';
	amount.value = '';
	amount.classList = 'empty';
	entry.value = '';
	entry.classList = 'empty';
	exit.value = '';
	exit.classList = 'empty';

	trades = require(app.getPath('userData') + '/trades.json');
})


let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
	openPosition.classList = 'empty';
	openPosition.selectedIndex = 0;
	strategy.classList = 'empty';
	ticker.value = '';
	ticker.classList = 'empty';
	amount.value = '';
	amount.classList = 'empty';
	entry.value = '';
	entry.classList = 'empty';
	exit.value = '';
	exit.classList = 'empty';
})

// Instead of deleting and shifting I can replace values in the trades list