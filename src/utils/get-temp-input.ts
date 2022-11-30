export const getTempInput = (record: unknown, fn: (value: number) => void) => {
  if (typeof record === "object" && record !== null) {
    for (const [key, value] of Object.entries(record)) {
      if (key.endsWith("_input")) {
        return fn(value as number);
      }
    }
  }
};
