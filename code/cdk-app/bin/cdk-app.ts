#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { TokyoStack } from "../lib/stack/TokyoStack";
import { VirginiaStack } from "../lib/stack/VirginiaStack";
import { CrossRegionReferenceStack } from "../lib/stack/CrossRegionReferenceStack";
import { devParameter } from "../parameter";

const app = new cdk.App();

const virginia = new VirginiaStack(app, "VirginiaStack", {
  env: {
    region: "us-east-1",
  },
  description: "Virginia Region Stack.",
});
cdk.Tags.of(virginia).add("Env", "virginia");
new cdk.CfnOutput(virginia, "CrossAcmArn", { value: virginia.cfAcmArn });

const crossRegionOutput = new CrossRegionReferenceStack(
  app,
  "CrossReferenceStack",
  { virginia: virginia, description: "Cross Region Reference Stack." }
);

const tokyo = new TokyoStack(app, "TokyoStack", {
  ...devParameter,
  cfCertArn: crossRegionOutput.virginiaAcm,
  description: "Tokyo Region Stack.",
});
cdk.Tags.of(tokyo).add("Env", devParameter.EnvName);
