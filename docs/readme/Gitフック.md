# Git フック

Git フックの設定に [Lefthook](https://github.com/evilmartians/lefthook) を使用しています。
パッケージインストール時に自動で `lefthook install` が実行されて Git フックが登録されます。
本プロジェクトで登録されるフックは以下のとおりです。

- pre-commit (コミットの前の実行される)
  - pnpm typecheck
  - pnpm lint
- post-merge (マージ後に実行される)
  - 最新コミットと現在のコミットを比べて依存パッケージに更新がある場合は自動で `pnpm install` を実行する

基本的にすべてのフックを有効にしておくことを推奨しますが、無効にしたいコマンドがある場合はプロジェクトのルートに `lefthook-local.yml` を作成して、以下のように記述することでコマンドの実行をスキップできます。

```yml
# lefthook-local.yml
# pre-commit をすべてスキップする場合
pre-commit:
	skip: true

# pre-commit の xxx コマンドのみを無効にする場合
pre-commit:
	commands:
		xxx:
			skip: true
```
