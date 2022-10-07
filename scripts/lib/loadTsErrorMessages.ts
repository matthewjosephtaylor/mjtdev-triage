import fs from "fs/promises";
import { PROJECT_ROOT } from "../report";
import { TsCategoryCode } from "./TsCategoryCode";


export const loadTsErrorMessages = async () => {
  const text = (
    await fs.readFile(`${PROJECT_ROOT}/data/diagnosticMessages.json`)
  ).toString();

  return JSON.parse(text) as Record<string, TsCategoryCode>;
};
