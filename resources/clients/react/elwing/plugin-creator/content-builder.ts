/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { format } from "prettier";
import { pascalCase, snakeCase, titleCase } from "../libs/utils/util-string";

const makePluginContents = (pluginName: string) => {
  const fileData = `
    const ${pascalCase(pluginName)} = {
      linkText: "${titleCase(pluginName)}",
      fragment: "/${snakeCase(pluginName)}",
      component: () => <h1>Hello, ${titleCase(pluginName)}!</h1>,
    };

    export { ${pascalCase(pluginName)} };`;
  return format(fileData, { parser: "babel" });
};

export { makePluginContents };
