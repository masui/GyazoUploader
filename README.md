<h1>写真をGyazoにアップロード</h1>

<ul>
  <li>Electronのメインプロセスで<a href="http://shokai.org/blog/archives/9465">Gyazo npm</a>を使ってアップロードする</li>
  <li>Drag&amp;Dropデータはレンダラプロセスで取得し、ファイル名をメインプロセスに通知する</li>
  <li>通知のためのIPC手順がイマイチ不明。<code>preload.js</code>を使って共有データを使うらしい...</li>
  <li>メインプロセスは普通のNodeなのでbrowserifyとかは不要</li>
  <li>Exifが存在しないときのエラー処理を加える必要あり</li>
</ul>
