/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { pipe, length, equals, nth, test } from "ramda";
import { validate, validationErrors } from "../libs/validator";

const validateNumArgs = (numArgs: number) =>
  validate(
    (actual: string[]) =>
      `Invalid number of arguments. Expected [<arg>], but got [${actual
        .slice(2)
        .map((x) => "<arg>")}]`,
    pipe(length, equals(numArgs))
  );

const validateNthMatches = (n: number, pattern: RegExp) =>
  validate(
    (actual: string[]) =>
      `Invalid format. Expected <plugin-name> (no spaces, 1 dash, only letters), got ${actual[2]}.`,
    pipe(nth(n), test(pattern))
  );

const validateArgs = pipe(
  (args: string[]) => ({ subject: args, errors: [] }),
  validateNumArgs(3),
  validateNthMatches(2, /^[A-Za-z]+-?[A-Za-z]+$/)
);

const getArgValidationErrors = pipe(validateArgs, validationErrors);

export { getArgValidationErrors };
