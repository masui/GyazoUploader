/*
 * main.js
 */

'use strict';

const path = require('path')
const fs = require('fs');
const Gyazo  = require('gyazo-api');
const { app, ipcMain, BrowserWindow } = require('electron')
const ExifImage = require('exif').ExifImage;


// 起動 URL
var currentURL = `file://${__dirname}/index.html`

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {  
    if (process.platform != 'darwin') {
	app.quit();
    }
});


let token = ''
let tokenpath = `${app.getPath('userData')}/gyazotoken`
try {
    fs.statSync(tokenpath)
    token = fs.readFileSync(tokenpath)
}
catch (err){
    // トークンがセーブされていない
}

let gyazo = new Gyazo(token);

//
// ブラウザプロセスから伝えられたアップロードファイルをGyazo.comに登録
//
ipcMain.on('file', (event, path, token) => {

    // 指定されたトークンをセーブしておく
    fs.writeFileSync(`${app.getPath('userData')}/gyazotoken`,token)
    
    let data = fs.readFileSync(path)
    let stat = fs.statSync(path)
    let t = Date.parse(stat.mtime)
    let desc =''
    try {
	let locinfo = ''
    	new ExifImage({ image : path }, function (error, exifData) {
            if(error){
		event.sender.send('gyazo', `Exif error: ${error.message}`);
	    }
            else {
		// ちょっと苦しいが2020:05:05みたいなのを2020/05/05に変換する
		t = Date.parse(exifData.image.ModifyDate.replace(/:/,'/').replace(/:/,'/'))
		desc = exifData.image.ModifyDate
		event.sender.send('gyazo', "Exif found");

		let lat = exifData.gps.GPSLatitude
		if(lat){
		    let la = lat[0] + lat[1]/60.0 + lat[2] / 3600.0
		    if(exifData.gps.GPSLatitudeRef == 'S'){
			la = -la
		    }
		    let long = exifData.gps.GPSLongitude
		    let lo = long[0] + long[1]/60.0 + long[2] / 3600.0
		    if(exifData.gps.GPSLongitudeRef == 'W'){
			lo = -lo
		    }
		    locinfo = `https://www.google.com/maps/@${la},${lo},19z`
		}
	    }
	})
	let stream = fs.createReadStream(path)
	gyazo.upload(stream, {
	    title: "localhost", // もっとちゃんとしたものを指定したい
	    desc: locinfo,
	    created_at: t / 1000.0
	})
	    .then(function(res){
		//console.log(res.data.image_id);
		//console.log(res.data.permalink_url);
		event.sender.send('gyazo', `Upload success: ${res.data.permalink_url}`);
		event.sender.send('gyazo', `Timestamp: ${new Date(t)}`)
	    })
	    .catch(function(err){
		event.sender.send('gyazo', `Upload error: ${error.message}`)
	    });
    }
    catch (err){
    }
})


// Electronの初期化完了後に実行
app.on('ready', function() {  
    let mainWindow = new BrowserWindow({
	width: 700,
	height: 600,
	webPreferences: {
	    preload: path.join(__dirname, 'preload.js')
	}
    });

    mainWindow.loadURL(`${currentURL}?token=${token}`);
    
    // デベロッパーツールを表示
    //mainWindow.toggleDevTools();
    
    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', function() {
	mainWindow = null;
    });
});
