/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ CloudFront S3 websitehosting redirect Stack - Cloud Development Kit parameter.ts                                                                   ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This file that defines the parameters for each resource.                                                                                           ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";

/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ type (Define your own type)                                                                                                                        ║
╠═════════════════╤══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ vpcInfo         │ Type defined L1 Construct vpc configuration information.                                                                         ║
║ azInfo          │ Type defined Availavility Zone.                                                                                                  ║
║ subnetKey       │ Type defined Subnet Key.                                                                                                         ║
║ subnetInfo      │ Type defined L1 Construct subnet configuration information.                                                                      ║
║ protocolInfo    │ Type defined Protocol.                                                                                                           ║
║ naclInfo        │ Type defined L1 Construct NACL configuration information.                                                                        ║
║ gwInfo          │ Type defined Gateway.                                                                                                            ║
║ rtbInfo         │ Type defined L1 Construct RouteTable configuration information.                                                                  ║
║ gwVpcEpInfo     │ Type defined L1 Construct VPC Gateway Endpoint configuration information.                                                        ║
║ secgInfo        │ Type defined L2 Construct SecurityGroup.                                                                                         ║
║ iamRoleInfo     │ Type defined L2 Construct IAM Role information.                                                                                  ║
║ keypairInfo     │ Type defined L1 Construct KeyPair.                                                                                               ║
║ ec2Info         │ Type defined L1 Construct EC2 Instance.                                                                                          ║
╚═════════════════╧══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
export type vpcInfo = {
  id: string;
  cidrBlock: string;
  dnsHost: boolean;
  dnsSupport: boolean;
  tags: { key: string; value: string }[];
};

export type azInfo = "a" | "c" | "d";

export type subnetKey = "public-a" | "public-c" | "private-a" | "private-c";

export type subnetInfo = {
  id: string;
  key: subnetKey;
  availabilityZone: azInfo;
  cidrBlock: string;
  mapPublicIpOnLaunch: boolean;
  tags: { key: string; value: string }[];
}[];

export type protocolInfo = -1 | 6 | 17 | 1;

export type naclInfo = {
  id: string;
  rules: {
    id: string;
    protocol: protocolInfo;
    ruleAction: string;
    ruleNumber: number;
    cidrBlock: string;
    egress: boolean;
    portRange?: {
      fromPort: number;
      toPort: number;
    };
    icmp?: {
      code: number;
      type: number;
    };
  }[];
  tags: { key: string; value: string }[];
  assocSubnets: { id: string; key: subnetKey }[];
};

export type gwInfo = "igw" | "vgw" | "tgw" | "ngw";

export type rtbInfo = {
  id: string;
  name: string;
  routes?: {
    type: gwInfo;
    destinations: { id: string; value: string }[];
  }[];
  tags: { key: string; value: string }[];
  assocSubnets: { id: string; key: subnetKey }[];
};

export type gwVpcEpInfo = {
  type: string;
  id: string;
  name: string;
  service: string;
};

export type secgInfo = {
  id: string;
  sgName: string;
  description: string;
  tags: { key: string; value: string }[];
};

export type iamRoleInfo = {
  id: string;
  roleName: string;
  assumed: string;
  description: string;
  customManagedPolicyAdd: boolean;
  awsManagedPolicyAdd: boolean;
  awsManagedPolicyName?: { policyName: string }[];
  tags: { key: string; value: string }[];
};

export type keypairInfo = {
  id: string;
  keyName: string;
  keyType: string;
  keyFormat: string;
  removalPolicy: boolean;
  tags: { key: string; value: string }[];
};

export type ec2Info = {
  id: string;
  instanceType: string;
  apiTerm: boolean;
  ebsOpt: boolean;
  volSize: number;
  tags: { key: string; value: string }[];
};

/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Interface Parameter                                                                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
export interface Parameter extends cdk.StackProps {
  AppName: string;
  vpc: vpcInfo;
  subnets: subnetInfo;
  nacl: naclInfo;
  rtbPub: rtbInfo;
  rtbPri: rtbInfo;
  s3GwEp: gwVpcEpInfo;
  ec2Role: iamRoleInfo;
  keyPair: keypairInfo;
  sgEc2: secgInfo;
  sgAlb: secgInfo;
  sgEp: secgInfo;
  ec2: ec2Info;
}

/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ devParameter                                                                                                                                       ║
╠═════════════════╤══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ AppName         │ common tag value.                                                                                                                ║
║ vpc             │ VPC.                                                                                                                             ║
║ subnets         │ Subnets.                                                                                                                         ║
║ ec2Role         │ EC2 Role.                                                                                                                        ║
║ ssmPolicy       │ SSM Start SSH Session Policy.                                                                                                    ║
║ keyPair         │ KeyPair.                                                                                                                         ║
║ sgEc2           │ SecurityGroup for EC2.                                                                                                           ║
║ ec2             │ EC2 Instance.                                                                                                                    ║
╚═════════════════╧══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
export const devParameter: Parameter = {
  AppName: "dev",

  vpc: {
    id: "Vpc",
    cidrBlock: "10.0.0.0/16",
    dnsHost: true,
    dnsSupport: true,
    tags: [{ key: "Name", value: "vpc" }],
  },

  subnets: [
    {
      id: "PublicSubnetA",
      key: "public-a",
      availabilityZone: "a",
      cidrBlock: "10.0.1.0/24",
      mapPublicIpOnLaunch: true,
      tags: [{ key: "Name", value: "public-subnet-a" }],
    },
    {
      id: "PublicSubnetC",
      key: "public-c",
      availabilityZone: "c",
      cidrBlock: "10.0.2.0/24",
      mapPublicIpOnLaunch: true,
      tags: [{ key: "Name", value: "public-subnet-c" }],
    },
    {
      id: "PrivateSubnetA",
      key: "private-a",
      availabilityZone: "a",
      cidrBlock: "10.0.3.0/24",
      mapPublicIpOnLaunch: false,
      tags: [{ key: "Name", value: "private-subnet-a" }],
    },
    {
      id: "PrivateSubnetC",
      key: "private-c",
      availabilityZone: "c",
      cidrBlock: "10.0.4.0/24",
      mapPublicIpOnLaunch: false,
      tags: [{ key: "Name", value: "private-subnet-c" }],
    },
  ],

  nacl: {
    id: "NaclOpen",
    rules: [
      {
        id: "NaclOpenRuleIn100",
        protocol: -1,
        ruleAction: "allow",
        ruleNumber: 100,
        cidrBlock: "0.0.0.0/0",
        egress: false,
      },
      {
        id: "NaclOpenRuleOut100",
        protocol: -1,
        ruleAction: "allow",
        ruleNumber: 100,
        cidrBlock: "0.0.0.0/0",
        egress: true,
      },
    ],
    tags: [{ key: "Name", value: "nacl" }],
    assocSubnets: [
      { id: "NaclAssocPubSubA", key: "public-a" },
      { id: "NaclAssocPubSubC", key: "public-c" },
      { id: "NaclAssocPriSubA", key: "private-a" },
      { id: "NaclAssocPriSubC", key: "private-c" },
    ],
  },

  rtbPub: {
    id: "RtbPublicSubnet",
    name: "public-rtb",
    routes: [
      {
        type: "igw",
        destinations: [{ id: "OutRoute1", value: "0.0.0.0/0" }],
      },
    ],
    tags: [{ key: "Name", value: "public-rtb" }],
    assocSubnets: [
      { id: "RtbAssocPubSubA", key: "public-a" },
      { id: "RtbAssocPubSubC", key: "public-c" },
    ],
  },

  rtbPri: {
    id: "RtbPrivateSubnet",
    name: "private-rtb",
    tags: [{ key: "Name", value: "private-rtb" }],
    assocSubnets: [
      { id: "RtbAssocPriSubA", key: "private-a" },
      { id: "RtbAssocPriSubC", key: "private-c" },
    ],
  },

  s3GwEp: {
    type: "Gateway",
    id: "S3Gw",
    name: "s3-gw",
    service: "s3",
  },

  sgEc2: {
    id: "SecgEc2",
    sgName: "secg-ec2",
    description: "SG for EC2",
    tags: [{ key: "Name", value: "secg-ec2" }],
  },

  sgAlb: {
    id: "SecgAlb",
    sgName: "secg-alb",
    description: "SG for ALB",
    tags: [{ key: "Name", value: "secg-alb" }],
  },

  sgEp: {
    id: "SecgEp",
    sgName: "secg-ep",
    description: "SG for Endpoint",
    tags: [{ key: "Name", value: "secg-ep" }],
  },

  ec2Role: {
    id: "EC2Role",
    roleName: "iam-role-ec2",
    assumed: "ec2.amazonaws.com",
    description: "EC2 Role",
    customManagedPolicyAdd: false,
    awsManagedPolicyAdd: true,
    awsManagedPolicyName: [
      {
        policyName: "AmazonSSMManagedInstanceCore",
      },
    ],
    tags: [{ key: "Name", value: "iam-role-ec2" }],
  },

  keyPair: {
    id: "KeyPair",
    keyName: "dev-keypair",
    keyType: "rsa",
    keyFormat: "pem",
    removalPolicy: true,
    tags: [{ key: "Name", value: "dev-keypair" }],
  },

  ec2: {
    id: "EC2Instance",
    instanceType: "t3.large",
    apiTerm: false,
    ebsOpt: false,
    volSize: 30,
    tags: [{ key: "Name", value: "dev-ec2" }],
  },
};
