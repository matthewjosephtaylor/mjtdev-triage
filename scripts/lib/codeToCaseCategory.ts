import { CodeToMessageCategory } from "./messagesByCode";



export const codeToCaseCategory = (
  code: number,
  codeMessages: CodeToMessageCategory
) => {
  const { message } = codeMessages[code];
  const safeMessage = message.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  return `${code}-${safeMessage}`;
};
