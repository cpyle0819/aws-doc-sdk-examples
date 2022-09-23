import { existsSync, mkdirSync, writeFileSync } from "fs";
import { format } from "prettier";
import { kebabCase, pascalCase, snakeCase, titleCase } from "./case-maker";
import {
  always,
  equals,
  gt,
  ifElse,
  join,
  length,
  nth,
  pipe,
  prop,
  test,
  __,
} from "ramda";
import { validate } from "./validator";

const createFolder = (path: string) => {
  if (existsSync(path)) {
    throw new Error(`${path} already exists.`);
  } else {
    mkdirSync(path);
  }
};

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

const pluginNameFromArgs = pipe(nth(2), kebabCase);

const lengthIs = (num: number) => pipe(length, equals(num));

const validateArgs = pipe(
  (thing: string[]) => ({ subject: thing, errors: [] }),
  validate(
    (actual) =>
      `Invalid number of arguments. Expected [<arg>], but got [${actual.slice(2).map(
        (x) => "<arg>"
      )}]`,
    lengthIs(3)
  ),
  validate(
    (actual) =>
      `Invalid format. Expected <plugin-name> (no spaces, 1 dash, only letters), got ${actual[2]}.`,
    pipe(nth(2), test(/^[A-Za-z]+-?[A-Za-z]+$/))
  )
);

const makePath = (pluginName: string) =>
  `${__dirname}/../plugins/${kebabCase(pluginName)}`;

const getValidationErrors = pipe(
  validateArgs,
  ifElse(
    pipe(prop("errors"), length, gt(__, 0)),
    pipe(prop("errors"), join("\n")),
    always("")
  )
);

(async () => {
  const errors = getValidationErrors(process.argv);

  if (errors) {
    console.error(errors);
    return;
  }

  const pluginName = pluginNameFromArgs(process.argv);
  const path = makePath(pluginName);
  createFolder(path);
  const pluginContents = makePluginContents(pluginName);
  writeFileSync(`${path}/${pascalCase(pluginName)}.tsx`, pluginContents);
})();
// TODO: clean this up and automatically add plugin to store