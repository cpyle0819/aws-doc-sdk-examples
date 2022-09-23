/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { writeFileSync } from "fs";
import { kebabCase, pascalCase } from "../libs/utils/util-string";
import { nthAdjust } from "../libs/ext-ramda";
import { getArgValidationErrors } from "./validations";
import { makePluginPath } from "./path-builder";
import { makePluginContents } from "./content-builder";
import { registerPlugin } from './register';

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
  registerPlugin(pluginName);
})();
