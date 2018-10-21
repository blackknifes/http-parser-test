const { app, BrowserWindow } = require("electron");

let mainWindow;
app.once("ready", ()=>{
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile("./page.html");
});

app.on("window-all-closed", ()=>{
    app.quit();
});