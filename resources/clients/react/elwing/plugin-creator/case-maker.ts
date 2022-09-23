import { pipe, split, toLower, join, adjust, toUpper, map } from "ramda";

const downcaseSplit = pipe(toLower, split("-"));

const capitalize = pipe<string[], string[], string[], string>(
  Array.from,
  adjust(0, toUpper),
  join("")
);

const kebabCase = pipe(downcaseSplit, join("-"));

const pascalCase = pipe<string[], string[], string[], string>(
  downcaseSplit,
  map(capitalize),
  join("")
);

const snakeCase = pipe(downcaseSplit, join("_"));

const titleCase = pipe(downcaseSplit, map(capitalize), join(" "));

export { capitalize, kebabCase, pascalCase, snakeCase, titleCase };
