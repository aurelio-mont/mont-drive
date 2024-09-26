export const convertToNumber = (
  value: unknown,
  defaultValue: number = 0
): number => {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const intValue = parseInt(value);
    if (isNaN(intValue)) {
      return defaultValue;
    }

    return intValue;
  }

  return defaultValue;
};
