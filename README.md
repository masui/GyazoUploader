<h1>写真をGyazoにアップロード</h1>

<ul>
  <li>Electronのメインプロセスで<a href="http://shokai.org/blog/archives/9465">Gyazo npm</a>でアップロードする</li>
  <li>Drag&amp;Dropデータはレンダラプロセスで取得し、ファイル名をメインプロセスに通知する</li>
  <li>通知のためのIPC手順がイマイチ不明</li>
  <li>メインプロセスは普通のNodeなのでbrowserifyとかは不要</li>
</ul>
