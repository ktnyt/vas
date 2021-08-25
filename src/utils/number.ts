export const convertToNumber = (value: string): number | null =>
  value.match(/^\d+$/) ? Number(value) : null;
