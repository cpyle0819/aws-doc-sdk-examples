import { lazy } from "react";

const RootPluginComponent = {
  linkText: "Get Started",
  fragment: "/",
  component: lazy(() => import("./RootPluginComponent")),
};

export { RootPluginComponent };
