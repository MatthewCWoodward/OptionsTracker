const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const jsonfile = require('jsonfile');
const moment = require('moment');

let win;

app.on('ready', () => {
	win = new BrowserWindow({
		minWidth: 800,
		minHeight: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true
		},
		frame: false
	})

	win.loadFile('index.html')
	win.webContents.openDevTools()
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

app.on('window-all-closed', () => {
	app.quit();
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

ipcMain.on('exitButton', (e, ending) => {
	let trades = require(app.getPath('userData') + '/trades.json');
	if(moment().format('dddd') == 'Monday') {
		trades.splice(0, 1, { "weeklyValues": [ending]})
	} else {
		let week = trades[0].weeklyValues;
		if(week.length == 5) {
			week.shift();
		}
		week.push(ending);
		trades.splice(0, 1, { "weeklyValues": week })
	}
	if(moment().format('LL').includes(' 1,')) {
		trades.splice(1, 1, { "monthlyValues": [ending] });
	} else {
		let month = trades[1].monthlyValues;
		month.push(ending)
		trades.splice(1, 1, { "monthlyValues": month});
	}
	jsonfile.writeFile(app.getPath('userData') + '/trades.json', trades);
	app.quit();
});

ipcMain.on('minimizeButton', () => {
	win.minimize();
})

const mainMenuTemplate = [
	{
		label: ''
	},
	{
		label: 'File',
		submenu: [
			{ label: 'Quit', accelerator: 'CmdOrCtrl+Q', click() { app.quit(); } }
		]
	},
	{
		label: 'Edit',
		submenu: [
			{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
			{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
			{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
			{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
			{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
			{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
		]
	}
]

try {
	require('electron-reloader')(module)
} catch (_) { }