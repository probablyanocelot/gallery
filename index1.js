// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')


// let display = mainWindow.screen.getPrimaryDisplay();
// let width = display.bounds.width;


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 150,
    // x: width - 700,
    // y: 0,
    transparent:true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // mainWindow.setPosition(500,0)

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

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
