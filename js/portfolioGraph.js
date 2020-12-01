const electron = require('electron');
const remoteApp = electron.remote.app;

let pathGraph = document.querySelector('#pathGraph');
let pathGraph2 = document.querySelector('#pathGraph2');
let pathGraph3 = document.querySelector('#pathGraph3');
let pathGraph4 = document.querySelector('#pathGraph4');
let pathGraph5 = document.querySelector('#pathGraph5');
let portfolioData = require(remoteApp.getPath('userData') + '/trades.json');
let portfolio = [];
for(i = 4; i >= 0; i--) {
	if(portfolioData[0].weeklyValues[portfolioData[0].weeklyValues.length - 1 - i] != undefined) {
		portfolio.push(portfolioData[0].weeklyValues[portfolioData[0].weeklyValues.length - 1 - i])
	} else {
		portfolio.push(0);
	}
}
let portfolioMin = Math.min(...portfolio);
let portfolioMax = Math.max(...portfolio);
let portfolioRange = portfolioMax - portfolioMin;
let portfolioScale = portfolioRange / 160;
let baseY = 84;
let baseYDollar = portfolioMax - portfolioRange * .5;
let startingOpen, startingBezier, secondBezier, thirdBezier, fourthBezier, fifthBezier;

document.querySelector('#chartTile h2').textContent = portfolio[4];

function calculateValues() {
	startingOpen = baseY + (baseYDollar - portfolio[0]) / portfolioScale;
	startingBezier = baseY + (baseYDollar - portfolio[0]) / portfolioScale;
	secondBezier = startingBezier - (portfolio[1] - portfolio[0]) / portfolioScale;
	thirdBezier = secondBezier - (portfolio[2] - portfolio[1]) / portfolioScale;
	fourthBezier = thirdBezier - (portfolio[3] - portfolio[2]) / portfolioScale;
	fifthBezier = fourthBezier - (portfolio[4] - portfolio[3]) / portfolioScale;
}
calculateValues();

pathGraph.setAttribute('d', `M 0 ${startingOpen} C 20 ${startingBezier} 40 ${startingBezier}, 60 ${startingBezier} `);
pathGraph2.setAttribute('d', `M 60 ${startingBezier} C 80 ${startingBezier} 80 ${secondBezier} 120 ${secondBezier}`);
pathGraph3.setAttribute('d', `M 120 ${secondBezier} C 160 ${secondBezier} 160 ${thirdBezier} 180 ${thirdBezier}`);
pathGraph4.setAttribute('d', `M 180 ${thirdBezier} C 200 ${thirdBezier} 220 ${fourthBezier} 240 ${fourthBezier}`);
pathGraph5.setAttribute('d', `M 240 ${fourthBezier} C 260 ${fourthBezier} 280 ${fifthBezier} 300 ${fifthBezier}`);

function eventListeners() {
	pathGraph.addEventListener('mouseover', () => {
		document.querySelector('#chartTile h2').textContent = portfolio[0];
		pathGraph2.style = 'opacity: 0.4;'
		pathGraph3.style = 'opacity: 0.4;'
		pathGraph4.style = 'opacity: 0.4;'
		pathGraph5.style = 'opacity: 0.4;'

		pathGraph.addEventListener('mouseout', () => {
			setTimeout(() => {
				document.querySelector('#chartTile h2').textContent = portfolio[4];
				pathGraph2.style = 'opacity: 1;'
				pathGraph3.style = 'opacity: 1;'
				pathGraph4.style = 'opacity: 1;'
				pathGraph5.style = 'opacity: 1;'
			}, 75);
		})
	})
	pathGraph2.addEventListener('mouseover', () => {
		document.querySelector('#chartTile h2').textContent = portfolio[1];
		pathGraph.style = 'opacity: 0.4;'
		pathGraph3.style = 'opacity: 0.4;'
		pathGraph4.style = 'opacity: 0.4;'
		pathGraph5.style = 'opacity: 0.4;'

		pathGraph2.addEventListener('mouseout', () => {
			setTimeout(() => {
				document.querySelector('#chartTile h2').textContent = portfolio[4];
				pathGraph.style = 'opacity: 1;'
				pathGraph3.style = 'opacity: 1;'
				pathGraph4.style = 'opacity: 1;'
				pathGraph5.style = 'opacity: 1;'
			}, 75);
		})
	})
	pathGraph3.addEventListener('mouseover', () => {
		document.querySelector('#chartTile h2').textContent = portfolio[2];
		pathGraph2.style = 'opacity: 0.4;'
		pathGraph.style = 'opacity: 0.4;'
		pathGraph4.style = 'opacity: 0.4;'
		pathGraph5.style = 'opacity: 0.4;'

		pathGraph3.addEventListener('mouseout', () => {
			setTimeout(() => {
				document.querySelector('#chartTile h2').textContent = portfolio[4];
				pathGraph2.style = 'opacity: 1;'
				pathGraph.style = 'opacity: 1;'
				pathGraph4.style = 'opacity: 1;'
				pathGraph5.style = 'opacity: 1;'
			}, 75);
		})
	})
	pathGraph4.addEventListener('mouseover', () => {
		document.querySelector('#chartTile h2').textContent = portfolio[3];
		pathGraph2.style = 'opacity: 0.4;'
		pathGraph3.style = 'opacity: 0.4;'
		pathGraph.style = 'opacity: 0.4;'
		pathGraph5.style = 'opacity: 0.4;'

		pathGraph4.addEventListener('mouseout', () => {
			setTimeout(() => {
				document.querySelector('#chartTile h2').textContent = portfolio[4];
				pathGraph2.style = 'opacity: 1;'
				pathGraph3.style = 'opacity: 1;'
				pathGraph.style = 'opacity: 1;'
				pathGraph5.style = 'opacity: 1;'
			}, 75);
		})
	})
	pathGraph5.addEventListener('mouseover', () => {
		document.querySelector('#chartTile h2').textContent = portfolio[4];
		pathGraph2.style = 'opacity: 0.4;'
		pathGraph3.style = 'opacity: 0.4;'
		pathGraph4.style = 'opacity: 0.4;'
		pathGraph.style = 'opacity: 0.4;'

		pathGraph5.addEventListener('mouseout', () => {
			setTimeout(() => {
				document.querySelector('#chartTile h2').textContent = portfolio[4];
				pathGraph2.style = 'opacity: 1;'
				pathGraph3.style = 'opacity: 1;'
				pathGraph4.style = 'opacity: 1;'
				pathGraph.style = 'opacity: 1;'
			}, 75);
		})
	})
}
eventListeners();

document.querySelector('#submit').addEventListener('click', () => {
	if(document.querySelector('#entry').value != '' && document.querySelector('#exit').value != '') {
		let newPortfolioValue = portfolio[4] + 100.0 * parseFloat(document.querySelector('#amount').value) * (parseFloat(document.querySelector('#exit').value) - parseFloat(document.querySelector('#entry').value));
		portfolio.splice(4, 1, newPortfolioValue);

		portfolioMin = Math.min(...portfolio);
		portfolioMax = Math.max(...portfolio);
		portfolioRange = portfolioMax - portfolioMin;
		portfolioScale = portfolioRange / 160;
		baseY = 84;
		baseYDollar = portfolioMax - portfolioRange * .5;

		calculateValues();

		document.querySelector('#lineChart').removeChild(document.querySelector(`#pathGraph`))
		for (i = 2; i <= 5; i++) {
			document.querySelector('#lineChart').removeChild(document.querySelector(`#pathGraph${i}`))
		}

		let element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		element.setAttribute('stroke', '#14CF66');
		element.setAttribute('fill', 'transparent');
		element.setAttribute('stroke-width', '3');
		element.setAttribute('id', 'pathGraph');
		element.setAttribute('class','path');
		element.setAttribute('d', `M 0 ${startingOpen} C 20 ${startingBezier} 40 ${startingBezier}, 60 ${startingBezier} `);
		document.querySelector('#lineChart').appendChild(element);

		let element2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		element2.setAttribute('stroke', '#14CF66');
		element2.setAttribute('fill', 'transparent');
		element2.setAttribute('stroke-width', '3');
		element2.setAttribute('id', 'pathGraph2');
		element2.setAttribute('class','path');
		element2.setAttribute('d', `M 60 ${startingBezier} C 80 ${startingBezier} 80 ${secondBezier} 120 ${secondBezier}`);
		document.querySelector('#lineChart').appendChild(element2);

		let element3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		element3.setAttribute('stroke', '#14CF66');
		element3.setAttribute('fill', 'transparent');
		element3.setAttribute('stroke-width', '3');
		element3.setAttribute('id', 'pathGraph3');
		element3.setAttribute('class','path');
		element3.setAttribute('d', `M 120 ${secondBezier} C 160 ${secondBezier} 160 ${thirdBezier} 180 ${thirdBezier}`);
		document.querySelector('#lineChart').appendChild(element3);

		let element4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		element4.setAttribute('stroke', '#14CF66');
		element4.setAttribute('fill', 'transparent');
		element4.setAttribute('stroke-width', '3');
		element4.setAttribute('id', 'pathGraph4');
		element4.setAttribute('class','path');
		element4.setAttribute('d', `M 180 ${thirdBezier} C 200 ${thirdBezier} 220 ${fourthBezier} 240 ${fourthBezier}`);
		document.querySelector('#lineChart').appendChild(element4);

		let element5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		element5.setAttribute('stroke', '#14CF66');
		element5.setAttribute('fill', 'transparent');
		element5.setAttribute('stroke-width', '3');
		element5.setAttribute('id', 'pathGraph5');
		element5.setAttribute('class','path');
		element5.setAttribute('d', `M 240 ${fourthBezier} C 260 ${fourthBezier} 280 ${fifthBezier} 300 ${fifthBezier}`);
		document.querySelector('#lineChart').appendChild(element5);

		pathGraph = document.querySelector('#pathGraph');
		pathGraph2 = document.querySelector('#pathGraph2');
		pathGraph3 = document.querySelector('#pathGraph3');
		pathGraph4 = document.querySelector('#pathGraph4');
		pathGraph5 = document.querySelector('#pathGraph5');

		eventListeners();
		document.querySelector('#chartTile h2').textContent = portfolio[4];
	}
})