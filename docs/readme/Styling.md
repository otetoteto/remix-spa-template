# Styling

スタイリングには [Tailwind CSS](https://tailwindcss.com/) を使用します。
なので追加でコンポーネントライブラリの選定する場合はヘッドレスであることが望ましいです。([React Aria](https://react-spectrum.adobe.com/react-aria/) など)

## 基本ルール

`className` にそのままユーティリティクラスを書く運用はなるべく避けて、 Variant パターンで書くようにします。そのために本プロジェクトでは [Tailwind Variants](https://www.tailwind-variants.org/) を使用します。
