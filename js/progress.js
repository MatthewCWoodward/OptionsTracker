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

setProgress(15);

let dailyButton = document.querySelector('#daily');
dailyButton.addEventListener('click', () => {
	dailyButton.classList = 'timeFrame active';
	weeklyButton.classList = 'timeFrame';
	monthlyButton.classList = 'timeFrame';
	setProgress(15);
	progressText.textContent = '15%';
});

let weeklyButton = document.querySelector('#weekly');
weeklyButton.addEventListener('click', () => {
	dailyButton.classList = 'timeFrame';
	weeklyButton.classList = 'timeFrame active';
	monthlyButton.classList = 'timeFrame';
	setProgress(50);
	progressText.textContent = '50%';
});

let monthlyButton = document.querySelector('#monthly');
monthlyButton.addEventListener('click', () => {
	dailyButton.classList = 'timeFrame';
	weeklyButton.classList = 'timeFrame';
	monthlyButton.classList = 'timeFrame active';
	setProgress(75);
	progressText.textContent = '75%';
});