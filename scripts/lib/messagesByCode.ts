import { loadTsErrorMessages } from "./loadTsErrorMessages";

export type CodeToMessageCategory = Record<
  number,
  { message: string; category: string }
>;
export const loadMessagesByCode = async (): Promise<CodeToMessageCategory> => {
  const errorMessages = await loadTsErrorMessages();
  const entries = Object.entries(errorMessages).map((entry) => {
    const [message, catCode] = entry;
    const { category, code } = catCode;
    return [code, { message, category }] as const;
  });
  return Object.fromEntries(entries);
};
