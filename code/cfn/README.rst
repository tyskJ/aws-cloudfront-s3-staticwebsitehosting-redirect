.. image:: ./doc/001samune.png

=====================================================================
デプロイ - CloudFormation -
=====================================================================

作業環境 - ローカル -
=====================================================================
* 64bit版 Windows 11 Pro
* Visual Studio Code 1.96.2 (Default Terminal: Git Bash)
* Git 2.47.1.windows.2
* AWS CLI 2.22.19.0 (profile登録&rainで利用する)
* Rain v1.20.2 windows/amd64

前提条件
=====================================================================
* *AdministratorAccess* がアタッチされているIAMユーザーのアクセスキーID/シークレットアクセスキーを作成していること
* 実作業は *cfn* フォルダ配下で実施すること
* 以下コマンドを実行し、*admin* プロファイルを作成していること (デフォルトリージョンは *ap-northeast-1* )

.. code-block:: bash

  aws configure --profile admin

事前作業(1)
=====================================================================
1. 各種モジュールインストール
---------------------------------------------------------------------
* `GitHub <https://github.com/tyskJ/common-environment-setup>`_ を参照

事前作業(2)
=====================================================================
1. デプロイ用S3バケット作成(東京リージョン)
---------------------------------------------------------------------
.. code-block:: bash

  DATE=$(date '+%Y%m%d')
  aws s3 mb s3://cfn-$DATE-apne1 --profile admin

2. デプロイ用S3バケット作成(バージニア北部リージョン)
---------------------------------------------------------------------
.. code-block:: bash

  DATE=$(date '+%Y%m%d')
  aws s3 mb s3://cfn-$DATE-useast1 --region us-east-1 --profile admin

実作業 - ローカル -
=====================================================================
1. リダイレクトルールJSONファイル修正
---------------------------------------------------------------------
* *redirect-rule.json* ファイルの *HostName* をリダイレクト先FQDNに修正

.. code-block:: json

  {
    "RoutingRules": [
      {
        "RoutingRuleCondition": {
          "KeyPrefixEquals": "test1/"
        },
        "RedirectRule": {
          "HostName": "リダイレクト先FQDN",
          "ReplaceKeyPrefixWith": "test1/"
        }
      },
      {
        "RoutingRuleCondition": {
          "KeyPrefixEquals": "test2/"
        },
        "RedirectRule": {
          "HostName": "リダイレクト先FQDN",
          "ReplaceKeyPrefixWith": "test2/"
        }
      }
    ]
  }


2. リダイレクトルールJSONファイルアップロード
---------------------------------------------------------------------
* リダイレクトルールJSONファイルをデプロイ用S3バケットにアップロード

.. code-block:: bash

  aws s3 cp redirect-rule.json s3://cfn-$DATE-apne1 --profile admin


3. *webstack* デプロイ
---------------------------------------------------------------------
.. code-block:: bash

  rain deploy webstack.yaml WEBSTACK \
  --s3-bucket cfn-$DATE-apne1 \
  --config webstack-parameter.yaml --profile admin

* 以下プロンプトより入力

.. csv-table::

  "Parameter", "概要", "入力値"
  "LatestAmiId", "AmazonLinux2023最新AMIID", "何も入力せずEnter"
  "HostedZoneId", "Route 53 Public Hosted Zoneに登録しているドメインのHosted zone ID", "ご自身で登録したホストゾーンID"
  "Fqdn", "ALBのAliasレコードを登録するときのFQDN", "ご自身で登録したいFQDN"
  "S3RedirectBucketName", "Redirect用S3バケット名"
  "S3RedirectRuleFileS3Uri", "リダイレクトルールJSONファイルのS3URI"

.. note::

  * *RecordSet* 作成に *HostedZoneId* を指定している
  * *HostedZoneName* にしたい場合は、 *ルートドメイン(.)* が必要

4. HTMLファイルアップロード
---------------------------------------------------------------------
* *index.html*, *error.html* をリダイレクト用S3バケットにアップロード

.. code-block:: bash

  aws s3 cp index.html s3://デプロイしたS3バケット名 --profile admin
  aws s3 cp error.html s3://デプロイしたS3バケット名 --profile admin

5. *cloudfrontstack* デプロイ
---------------------------------------------------------------------
.. code-block:: bash

  rain deploy cloudfrontstack.yaml CLOUDFRONTSTACK \
  --s3-bucket cfn-$DATE-useast1 \
  --region us-east-1 --profile admin

* 以下プロンプトより入力

.. csv-table::

  "Parameter", "概要", "入力値"
  "HostedZoneId", "Route 53 Public Hosted Zoneに登録しているドメインのHosted zone ID", "ご自身で登録したホストゾーンID"
  "Fqdn", "CloudFrontのAliasレコードを登録するときのFQDN", "ご自身で登録したいFQDN"
  "BucketName", "Redirect用S3バケット名"
  "WebSiteEndpoint", "Redirect用S3バケットのウェブサイトエンドポイント名"


後片付け - ローカル -
=====================================================================
1. デプロイしたS3バケットのオブジェクト削除
---------------------------------------------------------------------
* 中身を空にする必要があるため削除

.. code-block:: bash

  aws s3 rm --recursive s3://デプロイしたS3バケット名 --profile admin

2. *webstack* 削除
---------------------------------------------------------------------
.. code-block:: bash

  rain rm WEBSTACK --profile admin

.. note::

  * webstack削除後、 *DNS検証* で自動作成されたホストゾーンの *CNAMEレコード* は残る
  * そのため、不要なら手動で *CNAMEレコード* を削除すること

3. デプロイ用S3バケット作成(東京リージョン)削除
---------------------------------------------------------------------
* 中身を空にしバケットを削除

.. code-block:: bash

  aws s3 rm --recursive s3://cfn-$DATE-apne1 --profile admin
  aws s3 rb s3://cfn-$DATE-apne1 --profile admin

4. デプロイ用S3バケット作成(バージニア北部リージョン)削除
---------------------------------------------------------------------
* 中身を空にしバケットを削除

.. code-block:: bash

  aws s3 rm --recursive s3://cfn-$DATE-useast1 --profile admin
  aws s3 rb s3://cfn-$DATE-useast1 --profile admin

参考資料
=====================================================================
リファレンス
---------------------------------------------------------------------
* `AWS CLI Command Reference <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html>`_
* `AWS CloudFormation ユーザーガイド <https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html>`_
* `Launching AL2023 using the SSM parameter and AWS CLI <https://docs.aws.amazon.com/linux/al2023/ug/ec2.html#launch-via-aws-cli>`_
