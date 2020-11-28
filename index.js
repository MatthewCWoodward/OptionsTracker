const { app, BrowserWindow, Menu, ipcMain } = require('electron');

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

ipcMain.on('exitButton', (e) => {
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