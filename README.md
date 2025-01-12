# みんなで宝探し Geo-Hunter 🎉

位置情報やAR技術を活用し、宝探しを楽しめるアプリケーション「Geo-Hunter」へようこそ！友達や近くのプレイヤーと協力して、ARで表示される宝箱を探しましょう！


## 主な機能 ✨

- **AR宝探し**  
  近くに宝箱があると、ARで表示されます。
- **リアルタイムチャット**  
  近くのユーザーとチャット可能。
- **マップ表示**  
  自分や他のユーザーの位置を地図上に表示。


## 技術スタック 🛠️

- **フロントエンド:** HTML, CSS, JavaScript  
- **リアルタイム通信:** WebSocket  
- **バックエンド:** Node.js  
- **コンテナ化:** Docker  



## 開発環境の構築手順 🚀

### 1. Docker のインストール  
公式サイトの[Docker](https://www.docker.com/ja-jp/)からインストールしてください。

### 2. DevContainer の準備  
- VSCodeを開き、拡張機能「[Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)」をインストール。

### 3. 環境のセットアップ  
1. プロジェクトを VSCode で開く。  
2. 右下に「`Reopen in Container`」ボタンが表示されたらクリック。  
3. 以下のコマンドで必要なパッケージをインストール:  

    ```bash
    pnpm install
    ```

4. 開発サーバーを起動:  

    ```bash
    pnpm start
    ```

5. ブラウザで確認:  
   [http://localhost:3000](http://localhost:3000) にアクセス！


## ファイル構成 📁

- **`ar.html`**: AR機能の実装  
- **`index.html`**: メインページ  
- **`map.html`**: 地図機能の実装  
- **`chat_location.html`**: チャットと位置情報機能の統合版  
- **`public`**: 3Dモデルの配置場所


## 宝の位置の設定方法 🗺️

宝箱の位置は以下の方法で設定可能です。緯度・経度や標高を調整することでカスタマイズできます。

```html
<a-assets>
  <a-asset-items id="TreasureBox" src="/TreasureBox.glb"></a-asset-items>
</a-assets>
<a-entity
  gps-entity-place="latitude: 緯度; longitude: 経度;"
  gltf-model="#TreasureBox"
  look-at="[gps-camera]"
  scale="1 1 1"
  rotation="0 0 0"
  position="0 標高 0"
></a-entity>
```
- latitude: 緯度を指定
- longitude: 経度を指定
- position: 2つ目の値（例: 0 標高 0）で高さを調整

詳細な使い方は、[gps-entity-place](https://github.com/takusandayooo/geo-hunter-main/blob/703da56f91ec71473b3117a0e56a6c6306362fe9/ar.html#L59-L69)をご参照ください。
