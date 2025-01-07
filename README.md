# みんなで宝探しGeo-Huter

## 事前開発環境を構築
1. Dockerをインストール
    Dockerは[公式サイト](https://www.docker.com/ja-jp/)からインストール。
2. DevContainerの拡張機能をVSCodeにインストール
   VSCodeの拡張機能から[Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)をインストール

## 開発方法
1. VSCodeで開く
2. 右下に`Reopen in Container`というボタンがあるので、それをクリック
3. パッケージをインストール
4. ```bash
    pnpm install
    ```
5. 開発サーバーを立ち上げる
    ```bash
     pnpm start
     ```
6. ブラウザでアクセス
    `http://localhost:3000` にアクセス

## ファイル構成
- `ar.html`: ARの実装
- `index.html`: メインページ
- `map.html`: マップの実装
- `chat.html`: チャットの実装
- `chat_location.html`: チャットの実装←こちらで実装している

