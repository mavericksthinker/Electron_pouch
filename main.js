// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
var express = require('express')
var apps = express()
var PouchDB = require('pouchdb')
apps.use('/', require('express-pouchdb')(PouchDB))
apps.listen(3002);
var remoteCouch = 'http://admin:password@localhost:5984/todos';
var db = new PouchDB('todos');
db.changes({live: true,retry :true}).on('change', console.log)
db.sync(remoteCouch,{live:true,retry:true},function(){
console.log("remotePouchdb fauxton not found");
});
//replication can also be used but sync is a single line statement
//db.replicate.to(remoteCouch, {live:true, retry :true});
//db.replicate.from(remoteCouch, {live:true, retry :true});

