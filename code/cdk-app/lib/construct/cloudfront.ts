/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ CloudFront S3 websitehosting redirect Stack - Cloud Development Kit cloudfront.ts                                                                  ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This construct creates an L2 Construct CloudFront Distribution and Alias RecordSet.                                                                ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";

export interface CloudFrontProps extends cdk.StackProps {
  bucket: s3.Bucket;
  cfFqdn: string;
  cfCertArn: string;
  // cfHostedZone: route53.IHostedZone;
}

export class CloudFront extends Construct {
  constructor(scope: Construct, id: string, props: CloudFrontProps) {
    super(scope, id);

    // // distribution
    // const ditribution = new cloudfront.Distribution(this, "Distri", {
    //   enabled: true,
    //   defaultRootObject: "index.html",
    //   defaultBehavior: {
    //     origin: new cloudfront_origins.S3StaticWebsiteOrigin(props.bucket, {
    //       originId: "S3CustomOrigin",
    //       httpPort: 80,
    //       protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
    //     }),
    //     viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    //   },
    //   errorResponses: [
    //     {
    //       httpStatus: 404,
    //       ttl: cdk.Duration.seconds(10),
    //       responseHttpStatus: 200,
    //       responsePagePath: "/error.html",
    //     },
    //   ],
    //   domainNames: [props.cfFqdn],
    // });
  }
}
