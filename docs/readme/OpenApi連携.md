# OpenApi 連携

openapi スキーマからの型定義生成には [openapi-typescript](https://openapi-ts.pages.dev/introduction) を使用します。

その型定義を利用した api client として [openap-fetch](https://openapi-ts.pages.dev/openapi-fetch/) を使用します。

以下コマンドで型定義ファイルの自動生成を行います。

```sh
pnpm gen:openapi
```

自動生成された型定義ファイルは `app/generated/openapi/schema.ts` になります。
