const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const jsonfile = require('jsonfile');

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
	trades.splice(0, 1, { "value1": trades[0].value2, "value2": trades[0].value3, "value3": trades[0].value4, "value4": trades[0].value5, "value5": trades[0].value6, "value6": trades[0].value7, "value7": trades[0].value8, "value8": trades[0].value9, "value9": trades[0].value10, "value10": trades[0].value11, "value11": trades[0].value12, "value12": trades[0].value13, "value13": trades[0].value14, "value14": trades[0].value15, "value15": trades[0].value16, "value16": trades[0].value17, "value17": trades[0].value18, "value18": trades[0].value19, "value19": trades[0].value20, "value20": trades[0].value21, "value21": trades[0].value22, "value22": trades[0].value23, "value23": trades[0].value24, "value24": trades[0].value25, "value25": trades[0].value26, "value26": trades[0].value27, "value27": trades[0].value28, "value28": trades[0].value29, "value29": trades[0].value30, "value30": ending});
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