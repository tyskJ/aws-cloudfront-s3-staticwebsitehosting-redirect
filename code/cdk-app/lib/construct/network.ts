/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ CloudFront S3 websitehosting redirect Stack - Cloud Development Kit network.ts                                                                     ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This construct creates an L1 Construct VPC and an L1 Construct Subnet.                                                                             ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { vpcInfo } from "../../parameter";
import { subnetInfo } from "../../parameter";
import { subnetKey } from "../../parameter";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export interface NetworkProps extends cdk.StackProps {
  pseudo: cdk.ScopedAws;
  vpc: vpcInfo;
  subnets: subnetInfo;
}

export class Network extends Construct {
  public readonly vpc: ec2.CfnVPC;
  public readonly subnetObject: Record<subnetKey, ec2.CfnSubnet>;

  constructor(scope: Construct, id: string, props: NetworkProps) {
    super(scope, id);

    // VPC
    this.vpc = new ec2.CfnVPC(this, props.vpc.id, {
      cidrBlock: props.vpc.cidrBlock,
      enableDnsHostnames: props.vpc.dnsHost,
      enableDnsSupport: props.vpc.dnsSupport,
    });
    for (const tag of props.vpc.tags) {
      cdk.Tags.of(this.vpc).add(tag.key, tag.value);
    }

    // Subnets
    this.subnetObject = this.createSubnet(
      this,
      props.pseudo,
      this.vpc,
      props.subnets
    );
  }
  /*
  ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
  ║ Method (private)                                                                                                                                 ║
  ╠═══════════════════════════╤═════════════════════════╤════════════════════════════════════════════════════════════════════════════════════════════╣
  ║ createSubnet              │ ec2.CfnSubnet           │ Method to create Subnet for L1 constructs.                                                 ║
  ╚═══════════════════════════╧═════════════════════════╧════════════════════════════════════════════════════════════════════════════════════════════╝
  */
  private createSubnet(
    scope: Construct,
    pseudo: cdk.ScopedAws,
    vpc: ec2.CfnVPC,
    subnets: subnetInfo
  ): Record<subnetKey, ec2.CfnSubnet> {
    const subnetsObject = {} as Record<subnetKey, ec2.CfnSubnet>;
    for (const subnetDef of subnets) {
      const subnet = new ec2.CfnSubnet(scope, subnetDef.id, {
        vpcId: vpc.attrVpcId,
        cidrBlock: subnetDef.cidrBlock,
        availabilityZone: pseudo.region + subnetDef.availabilityZone,
        mapPublicIpOnLaunch: subnetDef.mapPublicIpOnLaunch,
      });
      for (const tag of subnetDef.tags) {
        cdk.Tags.of(subnet).add(tag.key, tag.value);
      }
      subnetsObject[subnetDef.key] = subnet;
    }
    return subnetsObject;
  }
}
