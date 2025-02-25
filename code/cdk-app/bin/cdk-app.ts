#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { TokyoStack } from "../lib/stack/TokyoStack";
import { VirginiaStack } from "../lib/stack/VirginiaStack";
import { devParameter } from "../parameter";

const app = new cdk.App();

const tokyo = new TokyoStack(app, "TokyoStack", devParameter);
cdk.Tags.of(tokyo).add("App", devParameter.AppName);

// const virginia = new VirginiaStack(app, "VirginiaStack", {});
