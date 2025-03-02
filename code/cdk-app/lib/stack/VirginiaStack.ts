import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Acm } from "../construct/acm";

export class VirginiaStack extends cdk.Stack {
  public readonly cfAcmArn: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ACM (us-east-1)
    const useast1Acm = new Acm(this, "UsEast1Acm", {
      hosted_zone_id: this.node.tryGetContext("hosted_zone_id_for_cf"),
      zone_apnex_name: this.node.tryGetContext("zone_apnex_name_for_cf"),
      issue_domain_name: this.node.tryGetContext("issue_domain_name_for_cf"),
    });
    this.cfAcmArn = useast1Acm.certificate.certificateArn;
  }
}
