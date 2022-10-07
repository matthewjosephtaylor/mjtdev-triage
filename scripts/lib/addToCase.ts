import fs from "fs/promises";

export const addToCase = async (props: {
  caseCategory: string;
  caseName: string;
  flattenedText: string;
  fileName: string;
  lineNumber: number;
  triageRoot: string;
}) => {
  const {
    caseName,
    caseCategory,
    flattenedText,
    fileName,
    lineNumber,
    triageRoot,
  } = props;
  const dir = `${triageRoot}/cases/${caseCategory}`;
  await fs.mkdir(dir, {
    recursive: true,
  });
  const filePath = `${dir}/${caseName}.md`;
  const line = `[${flattenedText}](../../${fileName}#L${lineNumber})`;
  return fs.appendFile(filePath, `${line}\n\n`);
};
