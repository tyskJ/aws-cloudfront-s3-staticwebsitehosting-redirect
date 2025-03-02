/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ CloudFront S3 websitehosting redirect Stack - Cloud Development Kit cloudfront.ts                                                                  ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This construct creates an L2 Construct CloudFront Distribution and Alias RecordSet.                                                                ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export interface CloudFrontProps extends cdk.StackProps {}

export class CloudFront extends Construct {
  constructor(scope: Construct, id: string, props: CloudFrontProps) {
    super(scope, id);
  }
}
