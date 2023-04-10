const information = document.getElementById("info");
information.innerText = `
Chrome (v${versions.chrome()}), 
Node.js (v${versions.node()}), 
Electron (v${versions.electron()})`;

console.log(versions);

const func = async () => {
  console.log(window.versions);
  const response = await window.versions.ping();
  console.log(response); // 打印 'pong'
};

func();
