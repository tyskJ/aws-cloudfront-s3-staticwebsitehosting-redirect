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
import { naclInfo } from "../../parameter";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export interface NetworkProps extends cdk.StackProps {
  pseudo: cdk.ScopedAws;
  vpc: vpcInfo;
  subnets: subnetInfo;
  nacl: naclInfo;
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

    // nacl
    this.createNacl(this, this.vpc, this.subnetObject, props.nacl);
  }
  /*
  ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
  ║ Method (private)                                                                                                                                 ║
  ╠═══════════════════════════╤═══════════════════════════════════╤══════════════════════════════════════════════════════════════════════════════════╣
  ║ createSubnet              │ Record<subnetKey, ec2.CfnSubnet>  │ Method to create Subnet for L1 constructs.                                       ║
  ║ createNacl                │ void                              │  Method to create Nacl for L1 constructs.                                        ║
  ╚═══════════════════════════╧═══════════════════════════════════╧══════════════════════════════════════════════════════════════════════════════════╝
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

  private createNacl(
    scope: Construct,
    vpc: ec2.CfnVPC,
    subnets: Record<subnetKey, ec2.CfnSubnet>,
    nacls: naclInfo
  ): void {
    const nacl = new ec2.CfnNetworkAcl(scope, nacls.id, {
      vpcId: vpc.attrVpcId,
    });
    for (const tag of nacls.tags) {
      cdk.Tags.of(nacl).add(tag.key, tag.value);
    }
    for (const rules of nacls.rules) {
      switch (rules.protocol) {
        case -1:
          new ec2.CfnNetworkAclEntry(scope, rules.id, {
            networkAclId: nacl.attrId,
            protocol: rules.protocol,
            ruleAction: rules.ruleAction,
            ruleNumber: rules.ruleNumber,
            cidrBlock: rules.cidrBlock,
            egress: rules.egress,
          });
          break;
        case 6:
        case 17:
          if (rules.portRange === undefined) {
            throw new Error("Port Range is required");
          }
          new ec2.CfnNetworkAclEntry(scope, rules.id, {
            networkAclId: nacl.attrId,
            protocol: rules.protocol,
            ruleAction: rules.ruleAction,
            ruleNumber: rules.ruleNumber,
            cidrBlock: rules.cidrBlock,
            egress: rules.egress,
            portRange: {
              from: rules.portRange.fromPort,
              to: rules.portRange.toPort,
            },
          });
          break;
        case 1:
          if (rules.icmp === undefined) {
            throw new Error("ICMP Range is required");
          }
          new ec2.CfnNetworkAclEntry(scope, rules.id, {
            networkAclId: nacl.attrId,
            protocol: rules.protocol,
            ruleAction: rules.ruleAction,
            ruleNumber: rules.ruleNumber,
            cidrBlock: rules.cidrBlock,
            egress: rules.egress,
            icmp: {
              code: rules.icmp.code,
              type: rules.icmp.type,
            },
          });
          break;
        default:
          const _: never = rules.protocol;
          throw new Error("Invalid Protocol");
      }
    }
    for (const association of nacls.assocSubnets) {
      new ec2.CfnSubnetNetworkAclAssociation(scope, association.id, {
        subnetId: subnets[association.key].attrSubnetId,
        networkAclId: nacl.attrId,
      });
    }
  }
}
