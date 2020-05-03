<h1>写真をGyazoにアップロードするElectronアプリ</h1>

<ul>
  <li>Electronのメインプロセス
    <code>main.js</code>で
    <a href="http://shokai.org/blog/archives/9465">Gyazo npm</a>
    を使ってアップロードする</li>
  <li>Drag&amp;Dropデータはレンダラプロセス
    <code>upload.js</code>
    で取得し、ファイル名をメインプロセスに通知する</li>
  <li>通知のためのIPC手順がイマイチ不明。
    <code>preload.js</code>
    を使って共有データを使うらしい...</li>
  <li>メインプロセス
    <code>main.js</code>
    は普通のNodeなのでbrowserifyとかは不要</li>
  <li><a href="http://masui.org.s3.amazonaws.com/7/d/7d539286843ccd5b3ea22909423c0078.dmg">Mac版dmgダウンロード</a></li>
</ul>

<h2>Issues</h2>

<ul>
  <li>Exifが存在しないときのエラー処理</li>
  <li>いろいろメッセージを表示する</li>
</ul>
