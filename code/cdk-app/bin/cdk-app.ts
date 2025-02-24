#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { TokyoStack } from "../lib/stack/TokyoStack";
import { VirginiaStack } from "../lib/stack/VirginiaStack";

const app = new cdk.App();
const tokyo = new TokyoStack(app, "TokyoStack", {});
const virginia = new VirginiaStack(app, "VirginiaStack", {});
