# フォルダ構成

- フォルダ構成は以下の通り

```
.
`-- tf
    |-- envs
    |   |-- backend.tf                          tfstateファイル管理設定ファイル
    |   |-- data.tf                             外部データソース定義ファイル
    |   |-- locals.tf                           ローカル変数定義ファイル
    |   |-- main.tf                             リソース定義ファイル
    |   |-- output.tf                           リソース戻り値定義ファイル
    |   |-- provider.tf                         プロバイダー設定ファイル
    |   |-- variable.tf                         変数定義ファイル
    |   `-- version.tf                          プロバイダー＆Terraformバージョン管理ファイル
    `-- modules
        |-- acm                                 ACMモジュール
        |   |-- data.tf                           外部データソース定義ファイル
        |   |-- main.tf                           リソース定義ファイル
        |   |-- output.tf                         リソース戻り値定義ファイル
        |   |-- variable.tf                       変数定義ファイル
        |   `-- version.tf                        プロバイダーバージョン管理ファイル
        |-- cloudfront                          CloudFrontモジュール
        |   |-- data.tf                           外部データソース定義ファイル
        |   |-- main.tf                           リソース定義ファイル
        |   |-- output.tf                         リソース戻り値定義ファイル
        |   `-- variable.tf                       変数定義ファイル
        |-- s3                                  S3モジュール
        |   |-- data.tf                           外部データソース定義ファイル
        |   |-- html                              静的ウェブサイトホスティング用HTMLファイル
        |   |   |-- error.html
        |   |   `-- index.html
        |   |-- json                              バケットポリシー＆リダイレクトルールJSONファイル
        |   |   |-- bucket-policy.json
        |   |   `-- redirect-rule.json
        |   |-- main.tf                           リソース定義ファイル
        |   |-- output.tf                         リソース戻り値定義ファイル
        |   `-- variable.tf                       変数定義ファイル
        `-- web                                 WEBモジュール
            |-- data.tf                           外部データソース定義ファイル
            |-- json
            |   `-- ec2-trust-policy.json         EC2用信頼ポリシー
            |-- main.tf                           リソース定義ファイル
            |-- output.tf                         リソース戻り値定義ファイル
            |-- sh
            |   `-- userdata.sh                   UserDataスクリプト
            `-- variable.tf                       変数定義ファイル
```
