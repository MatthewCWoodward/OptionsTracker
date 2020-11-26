let openPosition = document.querySelector('#openPositions');
openPosition.addEventListener('change', (event) => {
	if (event.target.value != '0') {
		openPosition.classList = '';
	}
	if (event.target.value == '0') {
		openPosition.classList = 'empty';
	}
})
let strategy = document.querySelector('#strategy');
strategy.addEventListener('focus', () => {
	strategy.classList = '';
})
let ticker = document.querySelector('#ticker');
ticker.addEventListener('focus', () => {
	ticker.classList = '';
});
ticker.addEventListener('change', (event) => {
	if (event.target.value != '') {
		ticker.classList = '';
	}
	if (event.target.value == '') {
		ticker.classList = 'empty';
	}
});
let entry = document.querySelector('#entry');
entry.addEventListener('focus', () => {
	entry.classList = '';
});
entry.addEventListener('change', (event) => {
	if (event.target.value != '') {
		entry.classList = '';
	}
	if (event.target.value == '') {
		entry.classList = 'empty';
	}
});
let exit = document.querySelector('#exit');
exit.addEventListener('focus', () => {
	exit.classList = '';
});
exit.addEventListener('change', (event) => {
	if (event.target.value != '') {
		exit.classList = '';
	}
	if (event.target.value == '') {
		exit.classList = 'empty';
	}
});