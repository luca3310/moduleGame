import { app, BrowserWindow } from "electron";
import path from "path";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window in fullscreen.
  const mainWindow = new BrowserWindow({
    fullscreen: true, // This will open the window in fullscreen mode
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    const indexPath = path.join(__dirname, "../mainMenu/index.html");
    mainWindow.loadFile(indexPath);
  }

  // Optionally open the DevTools (you may want to disable this in production)
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
