/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { existsSync, mkdirSync, readFileSync } from "fs";
import { identity, ifElse, pipe, tap, invoker, split } from "ramda";

const makeDir = ifElse(existsSync, identity, tap(mkdirSync));

const readLines = pipe(readFileSync, invoker(0, "toString"), split("\n"));

export { makeDir, readLines };
