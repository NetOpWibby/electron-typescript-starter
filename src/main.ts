


//  N A T I V E

import * as path from "path";

//  I M P O R T S

import { app, BrowserWindow } from "electron";

//  U T I L S

let mainWindow: BrowserWindow | null;



//  P R O G R A M

app.on("activate", () => {
  if (mainWindow === null)
    createWindow();
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin")
    app.quit();
});



//  H E L P E R S

try {
  // Reload app when changes are made
  require("electron-reloader")(module);
} catch (_) {
  // Ignore error, app is in production
}

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
  });

  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
