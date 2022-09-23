/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { format } from "prettier";
import { pascalCase, snakeCase, titleCase } from "../../libs/utils/util-string";

const makePluginContents = (pluginName: string) => {
  const fileData = `
    import { lazy } from "react";

    const ${pascalCase(pluginName)} = {
      linkText: "${titleCase(pluginName)}",
      fragment: "/${snakeCase(pluginName)}",
      component: lazy(() => import("./${pascalCase(pluginName)}Component"))
    };

    export { ${pascalCase(pluginName)} };`;

  return format(fileData, { parser: "babel" });
};

const makeComponentContents = (componentName: string) => {
  const fileData = `
    const component = () => <h1>Hello, ${titleCase(componentName)}!</h1>
    export default component;
  `;

  return format(fileData, { parser: "babel" });
};

export { makePluginContents, makeComponentContents };
