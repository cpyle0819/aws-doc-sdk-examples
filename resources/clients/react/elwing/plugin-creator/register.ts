import { appendFileSync, writeFileSync } from "fs";
import { format } from "prettier";
import { join, map, pipe } from "ramda";
import { readLines } from "../libs/utils/util-fs";
import { pascalCase } from "../libs/utils/util-string";

const manifestPath = `${__dirname}/../plugins/manifest.txt`;
const registryPath = `${__dirname}/../plugins/index.ts`;

const updateManifest = (entry: string) => {
  appendFileSync(manifestPath, `\n${entry}`);
};

const makeImport = (pluginName: string) =>
  `import { ${pascalCase(pluginName)} } from "./${pluginName}/${pascalCase(pluginName)}";`;
const makeImports = pipe(map(makeImport), join(""));

const makeDeclaration = (pluginNames: string[]) =>
  `const plugins = [${map(pascalCase, pluginNames)}];`;

const makeExports = () => `export { plugins }`;

const buildRegistryCode = () => {
  const manifest = readLines(manifestPath);
  const imports = makeImports(manifest);
  const pluginDeclaration = makeDeclaration(manifest);
  const exports = makeExports();
  const code = `${imports}${pluginDeclaration}${exports}`;

  return format(code, { parser: "babel" });
};

const refreshRegistry = () => {
  const registryCode = buildRegistryCode();
  writeFileSync(registryPath, registryCode);
}

const registerPlugin = (pluginName: string) => {
  updateManifest(pluginName);
  refreshRegistry();
};

export { registerPlugin, refreshRegistry };
