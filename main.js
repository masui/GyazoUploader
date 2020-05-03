/*
 * main.js
 */

'use strict';

const path = require('path')

let token = ''

var { app, ipcMain, BrowserWindow } = require('electron')

// 起動 URL
var currentURL = 'file://' + __dirname + '/index.html';

// クラッシュレポート
// require('crash-reporter').start();
// 何故か動かない

// メインウィンドウ
var mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {  
    if (process.platform != 'darwin') {
	app.quit();
    }
});


var Gyazo  = require('gyazo-api');
var gyazo = new Gyazo(token);

const fs = require('fs');


// 非同期メッセージの受信と返信
ipcMain.on('asynchronous-message', (event, path, token) => {
    // 受信したコマンドの引数を表示する
    console.log(path)
    console.log(token)

    fs.writeFileSync(app.getPath('userData')+"/gyazotoken",token)

    let data = fs.createReadStream(path)
    gyazo.upload(data, {
	title: "my picture",
	desc: "upload from nodejs"
    })
	.then(function(res){
	    console.log("Success")
	    console.log(res.data.image_id);
	    console.log(res.data.permalink_url);
	})
	.catch(function(err){
	    console.log("ERROR")
	    console.error(err);
	});
  // 送信元のチャンネル('asynchronous-reply')に返信する
  // event.reply('asynchronous-reply', 'pong')
})



// Electronの初期化完了後に実行
app.on('ready', function() {  
    // メイン画面のサイズ
    mainWindow = new BrowserWindow({
	width: 800,
	height: 600,
	webPreferences: {
	    preload: path.join(__dirname, 'preload.js')
	}
    });
    // 起動 url を指定
    mainWindow.loadURL(currentURL + "?token=" + token);
    
    // デベロッパーツールを表示
    // 不要であればコメントアウト
    mainWindow.toggleDevTools();
    
    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', function() {
	mainWindow = null;
    });
});
