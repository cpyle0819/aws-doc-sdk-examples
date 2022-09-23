import { assoc, ifElse, pipe, prop, __, gt, join, always, length } from "ramda";

/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

interface Validation<T> {
  subject: T;
  errors: string[];
}

const validate =
  <T>(messageFn: (actual: T) => string, fn: (x: T) => boolean) =>
  (v: Validation<T>) => {
    const pass = fn(v["subject"]);

    if (pass) {
      return v;
    } else {
      return assoc(
        "errors",
        [...prop("errors", v), messageFn(v["subject"])],
        v
      );
    }
  };

const validationErrors = pipe<Validation<unknown>[], string>(
  ifElse(
    pipe(prop("errors"), length, gt(__, 0)),
    pipe(prop("errors"), join("\n")),
    always("")
  )
);

export { validationErrors, validate, Validation };
