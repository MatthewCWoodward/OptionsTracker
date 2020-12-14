const electronModule = require('electron');
const momentDate = require('moment')
let remoteElectron = electronModule.remote.app;
let tradesProgress = require(remoteElectron.getPath('userData') + '/trades.json');
let goals = [25,90,350];
var circle = document.querySelector('.progress-ring__circle');
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
	const offset = circumference - percent / 100 * circumference;
	circle.style.strokeDashoffset = offset;
}

let progressText = document.querySelector('#progressText');
let dailyValue = 0;
let weeklyValue = 0;
if(momentDate().format('dddd') == 'Monday') {
	weeklyValue = 0;
} else {
	weeklyValue += tradesProgress[0].weeklyValues[tradesProgress[0].weeklyValues.length - 1] - tradesProgress[0].weeklyValues[0];
}
let monthlyValue = 0;
if(momentDate().format('LL').includes(' 1,')) {
	monthlyValue = 0;
} else {
	tradesProgress[1].monthlyValues[tradesProgress[1].monthlyValues.length - 1] - tradesProgress[1].monthlyValues[0];
}

progressText.textContent = `${dailyValue * 100 / goals[0]}%`;

document.querySelector('#submit').addEventListener('click', () => {
	if(document.querySelector('#exit') != '') {
		dailyValue += 100.0 * parseFloat(document.querySelector('#amount').value) * (parseFloat(document.querySelector('#exit').value) - parseFloat(document.querySelector('#entry').value));
		console.log(dailyValue);

		weeklyValue += 100.0 * parseFloat(document.querySelector('#amount').value) * (parseFloat(document.querySelector('#exit').value) - parseFloat(document.querySelector('#entry').value));

		monthlyValue += 100.0 * parseFloat(document.querySelector('#amount').value) * (parseFloat(document.querySelector('#exit').value) - parseFloat(document.querySelector('#entry').value));

		dailyButton.classList = 'timeFrame active';
		weeklyButton.classList = 'timeFrame';
		monthlyButton.classList = 'timeFrame';

		if (dailyValue >= 0) {
			setProgress(Math.min((dailyValue * 100 / goals[0]), 100));
			progressText.textContent = `${Math.min(Math.round(dailyValue * 100 / goals[0]), 100)}%`;
		} else {
			setProgress(0);
			progressText.textContent = `0%`;
		}
	}
})

let dailyButton = document.querySelector('#daily');
dailyButton.addEventListener('click', () => {
	dailyButton.classList = 'timeFrame active';
	weeklyButton.classList = 'timeFrame';
	monthlyButton.classList = 'timeFrame';
	if (dailyValue >= 0) {
		setProgress(Math.min((dailyValue * 100 / goals[0]), 100));
		progressText.textContent = `${Math.min(Math.round(dailyValue * 100 / goals[0]), 100)}%`;
	} else {
		setProgress(0);
		progressText.textContent = `0%`;
	}
});

let weeklyButton = document.querySelector('#weekly');
weeklyButton.addEventListener('click', () => {
	dailyButton.classList = 'timeFrame';
	weeklyButton.classList = 'timeFrame active';
	monthlyButton.classList = 'timeFrame';
	if (weeklyValue >= 0) {
		setProgress(Math.min((weeklyValue * 100 / goals[1]), 100));
		progressText.textContent = `${Math.min(Math.round(weeklyValue * 100 / goals[1]), 100)}%`;
	} else {
		setProgress(0);
		progressText.textContent = `0%`;
	}
});

let monthlyButton = document.querySelector('#monthly');
monthlyButton.addEventListener('click', () => {
	dailyButton.classList = 'timeFrame';
	weeklyButton.classList = 'timeFrame';
	monthlyButton.classList = 'timeFrame active';
	if (monthlyValue >= 0) {
		setProgress(Math.min((monthlyValue * 100 / goals[2]), 100));
		progressText.textContent = `${Math.min(Math.round(monthlyValue * 100 / goals[2]), 100)}%`;
	} else {
		setProgress(0);
		progressText.textContent = `0%`;
	}
});