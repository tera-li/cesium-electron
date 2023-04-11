const { contextBridge, ipcRenderer } = require("electron");

// 创建上下文桥梁，暴露字段在window上
contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 能暴露的不仅仅是函数，我们还可以暴露变量
  // 从渲染器进程到主进程的异步通信，invoke method name
  ping: () => ipcRenderer.invoke("ping"),
});

// 创建上下文桥梁，暴露字段在window上
contextBridge.exposeInMainWorld("setApi", {
  setPing: (title) => ipcRenderer.send("set-ping", title),
});
