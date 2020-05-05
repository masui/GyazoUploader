//
// Electronのレンダラプロセス
//
// 取得したファイル情報をメインプロセスに渡し、そちらでGyazoにアップロードしてもらう
//

const { ipcRenderer } = window.native; // preload.js 経由で渡されるデータ

let token = ''
a = location.href.match(/token=(.*)$/)
if(a){
    token = a[1]
    document.getElementById('token').value = token
}

document.body.addEventListener('dragover', function(e){ // 何故かこれが必要
    e.stopPropagation();
    e.preventDefault();
    return false
})

//
// Drag & Dropしたとき呼ばれる
//
document.body.addEventListener('drop', function(e){
    e.stopPropagation();
    e.preventDefault(); // デフォルトは「ファイルを開く」なのでそれを無効にする
    files = e.dataTransfer.files;
    token = document.getElementById('token').value
    for(let i=0;i<files.length;i++){
        file = files[i];
	document.getElementById('info').value += `sending ${file.path}...\n`
	ipcRenderer.send('file', file.path, token)
    }
});

ipcRenderer.on('gyazo', (event, url) => { // メインプロセスから情報取得
    document.getElementById('info').value += `${url}\n`
})

ipcRenderer.on('error', (event, msg) => {
    document.getElementById('info').value += `${msg}\n`
})

