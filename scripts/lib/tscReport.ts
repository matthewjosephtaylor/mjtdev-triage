import ts from "typescript";
import { addToCase } from "./addToCase";
import { codeToCaseCategory } from "./codeToCaseCategory";
import { loadMessagesByCode } from "./messagesByCode";
import { reportHighlevel } from "./reportHighlevel";
import path from "path";

export async function tscReport(
  props: {
    rootFile: string;
    triageRoot: string;
  } & Partial<{
    filterCodes: number[];
    detail: boolean;
    highlevel: boolean;
    addCases: boolean;
    rootFile: string;
  }>
): Promise<void> {
  const {
    addCases = false,
    filterCodes = [],
    detail = false,
    highlevel = false,
    rootFile,
    triageRoot,
  } = props;

  console.log("creating TS report...");
  console.log(`using root file: ${rootFile}`);

  const codeMessages = await loadMessagesByCode();

  const configFileName = ts.findConfigFile(
    ".",
    ts.sys.fileExists,
    "tsconfig.json"
  );

  console.log(`TS Config from: ${configFileName}`);
  if (!configFileName) {
    throw new Error("Unable to find tsconfig.json");
  }
  const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);

  const program = ts.createProgram({
    options: {
      ...configFile.config.compilerOptions,
      emit: false,
    },
    rootNames: [rootFile],
  });
  const diags = program.getSemanticDiagnostics();
  console.count(`diag total: ${diags.length}`);
  const codes = diags.map((d) => d.code);
  const codeCounts = codes.reduce((acc, cur) => {
    const count = acc[cur] ?? 0;
    acc[cur] = count + 1;
    return acc;
  }, {} as Record<number, number>);

  if (detail) {
    const errorMessages = await Promise.all(
      diags.map(async (diag) => {
        const { code, file, start } = diag;
        if (filterCodes.length > 0 && !filterCodes.includes(code)) {
          return undefined;
        }
        if (!file) {
          console.log({ diag });
          throw new Error("No file for diagnostic");
        }
        const { line, character } = ts.getLineAndCharacterOfPosition(
          file,
          start!
        );
        const flattenedText = ts.flattenDiagnosticMessageText(
          diag.messageText,
          " "
        );
        const fileName = path.relative(triageRoot, file.fileName);
        const caseName = fileName
          .replace(/\.\./g, "")
          .replace(/\//g, "-")
          .replace(/^-/, "");
        const message = `${flattenedText} ${fileName}:${line}:${character} `;
        const caseCategory = codeToCaseCategory(code, codeMessages);
        if (addCases) {
          await addToCase({
            caseCategory,
            caseName,
            flattenedText,
            fileName,
            lineNumber: line,
            triageRoot,
          });
        }
        return `${diag.code} triage/cases/${diag.code}/${caseName}.md ${message} `;
      })
    );
    errorMessages
      .filter((v) => typeof v !== "undefined")
      .forEach((m) => {
        console.log(m);
      });
  }

  if (highlevel) {
    await reportHighlevel(codeCounts);
  }
  console.log(`total: ${diags.length}`);
  return;
}
