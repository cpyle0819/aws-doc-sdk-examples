import { prop, map, compose, project } from "ramda";

const selectPlugins = prop("plugins");

const selectPluginNavigationItems = compose(
  map(({ linkText, fragment }) => ({
    type: "link",
    text: linkText,
    href: fragment,
  })),
  selectPlugins
);

const selectPluginRoutes = compose(
  map(({ fragment, component }) => ({
    path: fragment,
    element: component,
  })),
  selectPlugins
);

export { selectPluginNavigationItems, selectPluginRoutes };
