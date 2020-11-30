const isProduction: boolean = process.env.NODE_ENV === "production";

export default function devWarning(
  condition: any,
  message: string,
  elem?: HTMLElement
): void {
  // don't do anything in production
  if (!isProduction) {
    // condition passed: do not log
    if (condition) {
      return;
    }

    // Condition not passed
    const text: string = `Warning: ${message}`;

    if (typeof console != undefined) {
      window.console.warn(text, elem);
    }

    // Throwing an error and catching it immediately to improve debugging.
    try {
      throw Error(text);
    } catch (x) {}
  }
}
