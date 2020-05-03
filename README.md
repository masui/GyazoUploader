<h1>写真をGyazoにアップロードするElectronアプリ</h1>

<ul>
  <li>アプリに写真をDrag&amp;DropするとExifの日付でGyazoにアップロードされる</li>
  <li>Electronのメインプロセス
    <code>main.js</code>で
    <a href="http://shokai.org/blog/archives/9465">Gyazo npm</a>
    を使ってアップロードする</li>
  <li><code>package.json</code>
    に記述されたNodeのメインプロセス
    <code>main.js</code>
    が最初に起動し、そこからブラウザウィンドウ
    <code>index.html</code>
    を開き、その中の
    <code>&lt;script&gt;</code>
    で
    <code>upload.js</code>
    を呼び出している
  <li>Drag&amp;Dropデータはレンダラプロセス
    <code>upload.js</code>
    が取得し、ファイル名をメインプロセスに通知する</li>
  <li>通知にはIPCを利用する。
    <code>preload.js</code>
    を使って共有データを使うらしい...</li>
  <li>メインプロセス
    <code>main.js</code>
    Nodeだが
    <code>upload.js</code>
    はブラウザJSである
  <li><a href="http://masui.org.s3.amazonaws.com/7/d/7d539286843ccd5b3ea22909423c0078.dmg">Mac版dmgダウンロード</a></li>
</ul>

<h2>Issues</h2>

<ul>
  <li>Exifが存在しないときのエラー処理</li>
  <li>いろいろメッセージを表示する</li>
</ul>
