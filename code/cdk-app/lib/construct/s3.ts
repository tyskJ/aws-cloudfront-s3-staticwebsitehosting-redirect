/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ CloudFront S3 websitehosting redirect Stack - Cloud Development Kit s3.ts                                                                          ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This construct creates an L2 Construct S3 Bucket and policy.                                                                                       ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3_deployment from "aws-cdk-lib/aws-s3-deployment";
import { bucketInfo } from "../../parameter";
import * as fs from "fs";
import * as path from "path";

export interface S3Props extends cdk.StackProps {
  bucket: bucketInfo;
  albFqdn: string;
}

export class S3 extends Construct {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: S3Props) {
    super(scope, id);

    // import redirect rule file
    const jsonData = fs.readFileSync(
      path.join(`${__dirname}`, "../json/redirect-rule.json"),
      "utf8"
    );
    const redirectRule = JSON.parse(
      jsonData.replace(/{RedirectHost}/g, props.albFqdn)
    );

    // S3 Bucket
    this.bucket = new s3.Bucket(this, "RedirectBucket", {
      bucketName: props.bucket.bucketName,
      autoDeleteObjects: props.bucket.autoDeleteObjects,
      bucketKeyEnabled: props.bucket.bucketKeyEnabled,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: props.bucket.blockPublicAccess.blockPublicAcls,
        ignorePublicAcls: props.bucket.blockPublicAccess.ignorePublicAcls,
        blockPublicPolicy: props.bucket.blockPublicAccess.blockPublicPolicy,
        restrictPublicBuckets:
          props.bucket.blockPublicAccess.restrictPublicBuckets,
      }),
      websiteIndexDocument: props.bucket.websiteIndexDocument,
      websiteErrorDocument: props.bucket.websiteErrorDocument,
      websiteRoutingRules: redirectRule,
    });

    // Bucket Policy
    const bucketPolicy = new s3.CfnBucketPolicy(this, "CfnBucketPolicy", {
      bucket: this.bucket.bucketName,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "AllowCloudFrontServicePrincipalReadWrite",
            Effect: "Allow",
            Principal: "*",
            Action: ["s3:GetObject"],
            Resource: `${this.bucket.bucketArn}/*`,
            Condition: {
              StringEquals: {
                "aws:UserAgent": "Amazon CloudFront",
              },
            },
          },
        ],
      },
    });

    // Object Uploads
    new s3_deployment.BucketDeployment(this, "UpdateHtml", {
      destinationBucket: this.bucket,
      sources: [
        s3_deployment.Source.asset(path.join(`${__dirname}`, "../html")),
      ],
    });
  }
}
