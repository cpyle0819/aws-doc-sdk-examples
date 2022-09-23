import { assoc, prop } from "ramda";

interface Validation<T> {
  subject: T;
  errors: string[];
}

const validate =
  <T>(messageFn: (actual: T) => string, fn: (x: T) => boolean) => (v: Validation<T>) => {
    const pass = fn(v["subject"]);

    if (pass) {
      return v;
    } else {
      return assoc("errors", [...prop("errors", v), messageFn(v["subject"])], v);
    }
  };

export { validate, Validation };
