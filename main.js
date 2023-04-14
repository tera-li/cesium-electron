const {
  app,
  BrowserWindow,
  BrowserView,
  ipcMain,
  Menu,
  dialog,
  shell,
} = require("electron");
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

  // 创建原生应用菜单和上下文菜单
  handleMenu(win);
  // 创建和控制视图
  handleView(win);
  // 创建子窗口
  // handleChild(win);
  // 打开和保存文件、警报等的本机系统对话框
  // handleDialog(win);

  // win.webContents.openDevTools();
  // view.webContents.openDevTools();

  // 使用默认应用程序管理文件和 url
  // shell.openExternal("https://github.com");
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

  // 主进程监听事件，并print value
  ipcMain.on("counter-value", (_event, value) => {
    console.log(value); // will print value to Node console
  });

  console.log(process.execPath);

  // app.setLoginItemSettings({
  //   // 设置为true注册开机自起
  //   openAtLogin: true,
  //   openAsHidden: false, //macOs
  //   path: process.execPath,
  //   args: ["--processStart"],
  // });

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

// 创建原生应用菜单和上下文菜单
const handleMenu = (win) => {
  const menu = Menu.buildFromTemplate([
    {
      label: "1234",
      submenu: [],
    },
    {
      label: "Increment and Decrement",
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
};

// 创建和控制视图
const handleView = (win) => {
  // const view = new BrowserView();
  // win.setBrowserView(view);
  // view.setBounds({ x: 0, y: 300, width: 1000, height: 300 }); // 设置界限
  // view.webContents.loadURL("https://electronjs.org");
  win.loadFile("public/index.html");
};

// 创建子窗口
const handleChild = (win) => {
  // 设置模态窗口
  const child = new BrowserWindow({ parent: win, modal: false, show: false });
  child.loadURL("https://github.com");
  child.once("ready-to-show", () => {
    child.show();
  });
};

// 打开和保存文件、警报等的本机系统对话框
const handleDialog = () => {
  dialog
    .showOpenDialog({ properties: ["openFile", "multiSelections"] })
    .then((result) => {
      console.log(result.canceled);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  dialog.showMessageBox({ message: "123" });
  dialog.showErrorBox("title", "error123");
};
