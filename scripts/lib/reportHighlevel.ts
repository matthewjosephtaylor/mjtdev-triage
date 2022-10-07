import { loadMessagesByCode } from "./messagesByCode";

export const reportHighlevel = async (codeCounts: Record<number, number>) => {
  const codeMessages = await loadMessagesByCode();
  const reportLines = Object.entries(codeCounts).map((entry) => {
    const [code, count] = entry;
    const messageCategory = codeMessages[Number(code)];
    return {
      code,
      count,
      ...messageCategory,
    };
  });
  reportLines.forEach((rl) => {
    const { code, count, category, message } = rl;
    console.log(`${count} ${message} ${category} ${code}`);
  });
};
