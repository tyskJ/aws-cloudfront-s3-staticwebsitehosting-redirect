/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ CloudFront S3 websitehosting redirect Stack - Cloud Development Kit alb.ts                                                                         ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This construct creates an L Construct .                                                                    ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { targetgrpInfo } from "../../parameter";
import { subnetKey } from "../../parameter";

export interface AlbProps extends cdk.StackProps {
  targetGrp: targetgrpInfo;
  ec2Instance: ec2.CfnInstance;
  vpc: ec2.CfnVPC;
  albSg: ec2.CfnSecurityGroup;
  subnets: Record<subnetKey, ec2.CfnSubnet>;
}

export class Alb extends Construct {
  constructor(scope: Construct, id: string, props: AlbProps) {
    super(scope, id);

    const targetGroup = new elbv2.CfnTargetGroup(this, props.targetGrp.id, {
      name: props.targetGrp.name,
      vpcId: props.vpc.attrVpcId,
      protocol: props.targetGrp.protocol,
      port: props.targetGrp.port,
      healthCheckEnabled: props.targetGrp.healthCheckEnabled,
      healthCheckIntervalSeconds: props.targetGrp.healthCheckIntervalSeconds,
      healthCheckPath: props.targetGrp.healthCheckPath,
      healthCheckPort: props.targetGrp.healthCheckPort,
      healthCheckProtocol: props.targetGrp.healthCheckProtocol,
      healthCheckTimeoutSeconds: props.targetGrp.healthCheckTimeoutSeconds,
      healthyThresholdCount: props.targetGrp.healthyThresholdCount,
      unhealthyThresholdCount: props.targetGrp.unhealthyThresholdCount,
      matcher: { httpCode: props.targetGrp.matcherCode },
      targets: [{ id: props.ec2Instance.attrInstanceId }],
    });
    for (const tag of props.targetGrp.tags) {
      cdk.Tags.of(targetGroup).add(tag.key, tag.value);
    }
  }
}
