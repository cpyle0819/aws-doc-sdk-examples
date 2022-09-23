/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { writeFileSync } from "fs";
import { kebabCase, pascalCase } from "../libs/utils/util-string";
import { getArgValidationErrors } from "./validations";
import { nthAdjust } from "../libs/ext-ramda";
import { makePluginPath } from "./path-builder";
import { makePluginContents } from "./content-builder";

(async () => {
  const errors = getArgValidationErrors(process.argv);

  if (errors) {
    console.error(errors);
    return;
  }

  const pluginName = nthAdjust(2, kebabCase, process.argv);
  const path = makePluginPath(pluginName);
  const pluginContents = makePluginContents(pluginName);
  writeFileSync(`${path}/${pascalCase(pluginName)}.tsx`, pluginContents);
})();
