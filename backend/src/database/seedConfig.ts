function isTruthy(value: string | undefined): boolean {
  if (!value) return false;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

export function shouldSeedOnBoot(value: string | undefined): boolean {
  return isTruthy(value);
}
