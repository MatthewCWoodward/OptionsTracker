const electronModule = require('electron');
let remoteElectron = electronModule.remote.app;
let tradesProgress = require(remoteElectron.getPath('userData') + '/trades.json');
tradesProgress = tradesProgress[0];
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
weeklyValue += tradesProgress.value26 - tradesProgress.value25;
weeklyValue += tradesProgress.value27 - tradesProgress.value26;
weeklyValue += tradesProgress.value28 - tradesProgress.value27;
weeklyValue += tradesProgress.value29 - tradesProgress.value28;
weeklyValue += tradesProgress.value30 - tradesProgress.value29;
let monthlyValue = 0;
monthlyValue += tradesProgress.value2 - tradesProgress.value1;
monthlyValue += tradesProgress.value3 - tradesProgress.value2;
monthlyValue += tradesProgress.value4 - tradesProgress.value3;
monthlyValue += tradesProgress.value5 - tradesProgress.value4;
monthlyValue += tradesProgress.value6 - tradesProgress.value5;
monthlyValue += tradesProgress.value7 - tradesProgress.value6;
monthlyValue += tradesProgress.value8 - tradesProgress.value7;
monthlyValue += tradesProgress.value9 - tradesProgress.value8;
monthlyValue += tradesProgress.value10 - tradesProgress.value9;
monthlyValue += tradesProgress.value11 - tradesProgress.value10;
monthlyValue += tradesProgress.value12 - tradesProgress.value11;
monthlyValue += tradesProgress.value13 - tradesProgress.value12;
monthlyValue += tradesProgress.value14 - tradesProgress.value13;
monthlyValue += tradesProgress.value15 - tradesProgress.value14;
monthlyValue += tradesProgress.value16 - tradesProgress.value15;
monthlyValue += tradesProgress.value17 - tradesProgress.value16;
monthlyValue += tradesProgress.value18 - tradesProgress.value17;
monthlyValue += tradesProgress.value19 - tradesProgress.value18;
monthlyValue += tradesProgress.value20 - tradesProgress.value19;
monthlyValue += tradesProgress.value21 - tradesProgress.value20;
monthlyValue += tradesProgress.value22 - tradesProgress.value21;
monthlyValue += tradesProgress.value23 - tradesProgress.value22;
monthlyValue += tradesProgress.value24 - tradesProgress.value23;
monthlyValue += tradesProgress.value25 - tradesProgress.value24;
monthlyValue += tradesProgress.value26 - tradesProgress.value25;
monthlyValue += tradesProgress.value27 - tradesProgress.value26;
monthlyValue += tradesProgress.value28 - tradesProgress.value27;
monthlyValue += tradesProgress.value29 - tradesProgress.value28;
monthlyValue += tradesProgress.value30 - tradesProgress.value29;

progressText.textContent = `${dailyValue * 100 / goals[0]}%`;

document.querySelector('#submit').addEventListener('click', () => {
	dailyValue += 100.0 * parseFloat(document.querySelector('#amount').value) * (parseFloat(document.querySelector('#exit').value) - parseFloat(document.querySelector('#entry').value));
	console.log(dailyValue);
	
	weeklyValue += 100.0 * parseFloat(document.querySelector('#amount').value) * (parseFloat(document.querySelector('#exit').value) - parseFloat(document.querySelector('#entry').value));
	console.log(dailyValue);

	monthlyValue += 100.0 * parseFloat(document.querySelector('#amount').value) * (parseFloat(document.querySelector('#exit').value) - parseFloat(document.querySelector('#entry').value));
	console.log(dailyValue);

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
})

let dailyButton = document.querySelector('#daily');
dailyButton.addEventListener('click', () => {
	dailyButton.classList = 'timeFrame active';
	weeklyButton.classList = 'timeFrame';
	monthlyButton.classList = 'timeFrame';
	if (dailyButton >= 0) {
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