let pathGraph = document.querySelector('#pathGraph');
let pathGraph2 = document.querySelector('#pathGraph2');
let pathGraph3 = document.querySelector('#pathGraph3');
let pathGraph4 = document.querySelector('#pathGraph4');
let pathGraph5 = document.querySelector('#pathGraph5');
let portfolio = [420, 421, 423, 420, 415];
let portfolioMin = Math.min(...portfolio);
let portfolioMax = Math.max(...portfolio);
let portfolioRange = portfolioMax - portfolioMin;
let portfolioScale = portfolioRange / 160;
let baseY = 84;
let baseYDollar = portfolioMax - portfolioRange * .5;
let startingOpen, startingBezier, secondBezier, thirdBezier, fourthBezier, fifthBezier;

document.querySelector('#chartTile h2').textContent = portfolio[4];

startingOpen = baseY + (baseYDollar - portfolio[0]) / portfolioScale;
startingBezier = baseY + (baseYDollar - portfolio[0]) / portfolioScale;
secondBezier = startingBezier - (portfolio[1] - portfolio[0]) / portfolioScale;
thirdBezier = secondBezier - (portfolio[2] - portfolio[1]) / portfolioScale;
fourthBezier = thirdBezier - (portfolio[3] - portfolio[2]) / portfolioScale;
fifthBezier = fourthBezier - (portfolio[4] - portfolio[3]) / portfolioScale;

pathGraph.setAttribute('d', `M 0 ${startingOpen} C 20 ${startingBezier} 40 ${startingBezier}, 60 ${startingBezier} `);
pathGraph2.setAttribute('d', `M 60 ${startingBezier} C 80 ${startingBezier} 80 ${secondBezier} 120 ${secondBezier}`);
pathGraph3.setAttribute('d', `M 120 ${secondBezier} C 160 ${secondBezier} 160 ${thirdBezier} 180 ${thirdBezier}`);
pathGraph4.setAttribute('d', `M 180 ${thirdBezier} C 200 ${thirdBezier} 220 ${fourthBezier} 240 ${fourthBezier}`);
pathGraph5.setAttribute('d', `M 240 ${fourthBezier} C 260 ${fourthBezier} 280 ${fifthBezier} 300 ${fifthBezier}`);


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