/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { existsSync, mkdirSync } from "fs";
import { identity, ifElse, tap } from "ramda";

const makeDir = ifElse(existsSync, identity, tap(mkdirSync));

export { makeDir };
