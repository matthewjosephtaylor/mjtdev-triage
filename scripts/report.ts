#!/usr/bin/env NODE_NO_WARNINGS=1 npx ts-node

import arg from "arg";
import { tscReport } from "./lib/tscReport";
import fs from "fs/promises";

export const PROJECT_ROOT = `${__dirname}`;
export const CASE_ROOT = `${PROJECT_ROOT}/cases`;

(async () => {
  try {
    const args = arg({
      "--code": [Number],
      "-c": "--code",
      "--highlevel": Boolean,
      "-h": "--highlevel",
      "--detail": Boolean,
      "-d": "--detail",
      "--add-cases": Boolean,
      "-a": "--add-cases",
      "--rootFile": String,
      "-r": "--rootFile",
      "--triageRoot": String,
      "-t": "--triageRoot",
    });
    const addCases = args["--add-cases"] ?? false;
    const filterCodes = args["--code"] ?? [];
    const highlevel = args["--highlevel"] ?? false;
    const detail = args["--detail"] || filterCodes.length > 0;
    const rootFile = args["--rootFile"];
    const triageRoot = args["--triageRoot"] || "./triage";

    await fs.mkdir(triageRoot, {
      recursive: true,
    });

    // process.chdir(triageRoot);

    console.log(`using triage root: ${triageRoot}`);

    if (!rootFile) {
      throw new Error("Root File is required");
    }
    await tscReport({
      filterCodes,
      highlevel,
      detail,
      addCases,
      rootFile,
      triageRoot,
    });
  } catch (error) {
    console.error(error);
  }
})();
