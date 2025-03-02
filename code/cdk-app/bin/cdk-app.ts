#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { TokyoStack } from "../lib/stack/TokyoStack";
import { VirginiaStack } from "../lib/stack/VirginiaStack";
import { devParameter } from "../parameter";

const app = new cdk.App();

const tokyo = new TokyoStack(app, "TokyoStack", {
  ...devParameter,
  description: "Tokyo Region Stack.",
});
cdk.Tags.of(tokyo).add("Env", devParameter.EnvName);

// const virginia = new VirginiaStack(app, "VirginiaStack", {
//   env: {
//     region: "us-east-1",
//   },
//   description: "Virginia Region Stack.",
// });
// cdk.Tags.of(virginia).add("Env", "virginia");
