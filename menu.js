export function applyMenuTemplate(mainWindow) {
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