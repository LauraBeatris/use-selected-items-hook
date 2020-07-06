/**
 * toCamel
 * @description Convert a snake string to camel case
 */

export const toCamel = (value: string): string => (
  value.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
    .replace("-", "")
    .replace("_", ""))
);
