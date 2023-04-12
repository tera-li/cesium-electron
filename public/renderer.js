const information = document.getElementById("info");
information.innerText = `
Chrome (v${versions.chrome()}), 
Node.js (v${versions.node()}), 
Electron (v${versions.electron()})`;

console.log(versions);

const counter = document.getElementById("counter");

const func = async () => {
  console.log(window.versions);
  const response = await window.versions.ping();
  console.log(response); // 打印 'pong'

  window.setApi.handleCounter((event, value) => {
    const oldValue = Number(counter.innerText);
    const newValue = oldValue + value;
    counter.innerText = newValue;
    // 回复主进程消息
    event.sender.send("counter-value", newValue);
  });
};

func();

document.getElementById("info").onclick = () => {
  console.log(window.setApi);
  window.setApi.setPing("title");

  // 从渲染进程打开窗口
  // window.open(
  //   "https://github.com",
  //   "_blank",
  //   "top=100,left=200,frame=false,nodeIntegration=no"
  // );
};
