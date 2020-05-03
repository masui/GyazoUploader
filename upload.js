
const { ipcRenderer } = window.native;

console.log(ipcRenderer)

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    // 受信時のコールバック関数
    console.log(arg) // pong
});

console.log(location.href)

function upload(url = '', data = {}) {
    console.log("upload()")
    ipcRenderer.send('asynchronous-message', 'aaaaaaaaaa')
    console.log("ipcRender sent aaaa")
}			   	


function sendfiles(files){
    for (let i=0;i<files.length;i++){
        file = files[i];
	//alert(file.name)
	//alert(file.stream())
	
	ipcRenderer.send('asynchronous-message', file.path, token)
	
    }
}

document.body.addEventListener('dragover', function(e){ // 何故かこれが必要
    e.stopPropagation();
    e.preventDefault();
    return false
})

document.body.addEventListener('drop', function(e){
    e.stopPropagation();
    e.preventDefault(); // デフォルトは「ファイルを開く」
    files = e.dataTransfer.files;
    sendfiles(files);
    if(e.dataTransfer){
	console.log("e is DragEvent");
    }
});


