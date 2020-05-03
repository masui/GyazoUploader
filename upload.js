//
// Drag&Dropしたとき呼ばれる
//
// 取得したファイル情報をメインプロセスに渡し、そちらでGyazoにアップロードしてもらう
//

const { ipcRenderer } = window.native;

console.log(ipcRenderer)

let token = ''
a = location.href.match(/token=(.*)$/)
if(a){
    token = a[1]
    document.getElementById('token').value = token
}
console.log(`token = ${token}`)

document.body.addEventListener('dragover', function(e){ // 何故かこれが必要
    e.stopPropagation();
    e.preventDefault();
    return false
})

document.body.addEventListener('drop', function(e){
    e.stopPropagation();
    e.preventDefault(); // デフォルトは「ファイルを開く」
    files = e.dataTransfer.files;
    token = document.getElementById('token').value
    for(let i=0;i<files.length;i++){
        file = files[i];
	ipcRenderer.send('asynchronous-message', file.path, token)
    }
});


