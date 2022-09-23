import { writeFileSync } from "fs";
import { format } from "prettier";
import { concat, join, map, pipe } from "ramda";
import { readSubdirSync } from "../../libs/utils/util-fs";
import { pascalCase } from "../../libs/utils/util-string";

const pluginsPath = `${__dirname}/../plugins`;
const manifestPath = `${__dirname}/../plugins/manifest.ts`;

const makeImport = (pluginName: string) =>
  `import { ${pascalCase(pluginName)} } from "./${pluginName}";`;

const makeImports = pipe(
  map(makeImport),
  join(""),
  concat('import { AppPlugin } from "./plugin";')
);

const makeDeclaration = (pluginNames: string[]) =>
  `const plugins: AppPlugin[] = [${map(pascalCase, pluginNames)}];`;

const makeExports = () => `export default plugins`;

const buildRegistryCode = () => {
  const pluginNames = readSubdirSync(pluginsPath, { withFileTypes: true });
  const imports = makeImports(pluginNames);
  const pluginDeclaration = makeDeclaration(pluginNames);
  const exports = makeExports();
  const code = `${imports}${pluginDeclaration}${exports}`;

  return format(code, { parser: "babel" });
};

const refreshRegistry = () => {
  const registryCode = buildRegistryCode();
  writeFileSync(manifestPath, registryCode);
};

export { refreshRegistry };
