// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
//
// IPCで必要になる「ipcRenderer」をここで定義
//

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
	const element = document.getElementById(selector)
	if (element) element.innerText = text
    }
    
    for (const type of ['chrome', 'node', 'electron']) {
	replaceText(`${type}-version`, process.versions[type])
    }
})

const { ipcRenderer } = require('electron');

process.once('loaded', () => {
    global.native = {
	ipcRenderer: ipcRenderer,
    };
});
