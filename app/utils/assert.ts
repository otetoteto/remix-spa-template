export class AssertError extends Error {
  static {
    this.prototype.name = "AssertError";
  }

  constructor(message: string, options = {}) {
    super(message, options);
  }
}

export function assertNonNullable<T>(
  condition: T | null | undefined,
  message = "値は null または undefined であってはなりません",
): asserts condition {
  if (condition == null) {
    throw new AssertError(message);
  }
}
