import * as cdk from "aws-cdk-lib";
import * as cdk_remote_stack from "cdk-remote-stack";
import { Construct } from "constructs";
import { VirginiaStack } from "./VirginiaStack";

export interface CrossRegionReferenceStackProps extends cdk.StackProps {
  virginia: VirginiaStack;
}

export class CrossRegionReferenceStack extends cdk.Stack {
  public readonly virginiaAcm: string;

  constructor(
    scope: Construct,
    id: string,
    props: CrossRegionReferenceStackProps
  ) {
    super(scope, id, props);

    // dependency
    this.addDependency(props.virginia);

    // Output
    const outputs = new cdk_remote_stack.RemoteOutputs(this, "AcmOutPuts", {
      stack: props.virginia,
    });
    this.virginiaAcm = outputs.get("CrossAcmArn");
  }
}
