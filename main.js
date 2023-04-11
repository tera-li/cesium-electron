const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");

const createWindow = () => {
  // 创建和管理应用窗口
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    // 网页功能设置
    webPreferences: {
      // 在页面运行其他脚本之前 预加载的脚本
      preload: path.join(__dirname, "/public/preload.js"),
    },
  });
  // return EventEmitter
  console.log(win.webContents.send);

  const menu = Menu.buildFromTemplate([
    {
      label: "123",
      submenu: [
        {
          click: () => win.webContents.send("update-counter", 1),
          label: "Increment",
        },
        {
          click: () => win.webContents.send("update-counter", -1),
          label: "Decrement",
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  // 主进程监听事件，并返回值
  win.loadFile("public/index.html");

  win.webContents.openDevTools();
};

// app 为整个应用的事件生命周期，当准备好后，触发promise
app.whenReady().then(() => {
  createWindow();

  // 来自渲染器进程 监听 invoke 事件
  ipcMain.handle("ping", () => "pong");

  // 来自渲染器进程 监听 send 事件
  ipcMain.on("set-ping", () => {
    console.log(123456);
  });

  ipcMain.on("counter-value", (_event, value) => {
    console.log(value); // will print value to Node console
  });

  app.on("activate", () => {
    console.log(BrowserWindow.getAllWindows().length);
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
