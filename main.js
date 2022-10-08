const path = require("path");
const { app, BrowserWindow } = require("electron");

const isDev = false; //process.env.NODE_ENV !== "production"; //! return undefined for now
const isMac = process.platform === "darwin";

console.log(process.env.NODE_ENV, isDev);

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Resizer",
    width: 500, //isDev ? 1000 : 500,
    height: 600,
    webPreferences: {
      devTools: isDev,
    },
  });

  // devtools setting
  /* if (isDev) {
    mainWindow.webContents.openDevTools();
  } */

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Menu template
const menu = [
  {
    label: "File",
  },
];

// closing windows on mac
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
