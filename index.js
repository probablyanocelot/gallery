// Modules to control application life and create native browser window
const { app, screen, BrowserWindow } = require('electron');
const { Menu } = require('electron/main');
const path = require('path')
const url = require('url')
// const { applyMenuTemplate } = require('./menu.js')

let hasMenuTemplate = true


function applyMenuTemplate(mainWindow) {
	mainWindow.loadURL(url.format({
		// get cd, add desired file to end
		pathname: path.join(__dirname, 'mainWindow.html'),
		protocol: 'file:',
		slashes: true
	}))
	
	// Build menu from template
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	// Insert menu
	Menu.setApplicationMenu(mainMenu);
}

const mainMenuTemplate = [
	{
		label: 'File'
	}
];


const createWindow = (template) => {
	const {width,height} = screen.getPrimaryDisplay().workAreaSize;
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		// width: 700,
		// height: 150,
		// x: width - 700,
		// y: height - 150,

		transparent:false,
		frame: true,
		useContentSize: true,
		resizable: true,

		// FOR ALWAYS-ON-TOP
		// visibleOnAllWorkspaces: true,

		webPreferences: {
				nodeIntegration: true,
				enableRemoteModule: true,
				preload: path.join(__dirname, 'preload.js'),
		}
	})

	if (hasMenuTemplate) applyMenuTemplate(mainWindow);

	app.on('display-metrics-changed', (event, display, changedMetrics) =>
	{
		// console.log(display, changedMetrics);
		const {x, y, width, height} = display.workArea;
		// console.log(x, y, width, height);
		mainWindow.setBounds({x: width - 500, y: height - 450, width: 500, height: 500})
	});


	// Load the index.html of the app.
	mainWindow.loadFile('index.html')


	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	if (hasMenuTemplate) createWindow(applyMenuTemplate)
	if (!hasMenuTemplate) createWindow()

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
