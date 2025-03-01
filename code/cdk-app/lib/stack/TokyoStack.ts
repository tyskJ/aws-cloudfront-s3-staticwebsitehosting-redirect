import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Parameter } from "../../parameter";
import { Network } from "../construct/network";
import { Acm } from "../construct/acm";

export class TokyoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Parameter) {
    super(scope, id, {
      ...props,
      description: "Tokyo Region Stack.",
    });

    // // Pseudo Parameters
    const pseudo = new cdk.ScopedAws(this);

    // // Network Construct
    // const nw = new Network(this, "Network", {
    //   pseudo: pseudo,
    //   vpc: props.vpc,
    //   subnets: props.subnets,
    //   nacl: props.nacl,
    //   rtbPub: props.rtbPub,
    //   rtbPri: props.rtbPri,
    //   s3GwEp: props.s3GwEp,
    //   sgEc2: props.sgEc2,
    //   sgAlb: props.sgAlb,
    //   sgEp: props.sgEp,
    // });

    // ACM (ap-northeast-1)
    const apne1Acm = new Acm(this, "Apne1Acm", {
      hosted_zone_id: this.node.tryGetContext("hosted_zone_id_for_alb"),
      zone_apnex_name: this.node.tryGetContext("zone_apnex_name_for_alb"),
      issue_domain_name: this.node.tryGetContext("issue_domain_name_for_alb"),
    });
  }
}
