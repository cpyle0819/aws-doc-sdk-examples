/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { prop, map, compose } from "ramda";
import { AppPlugin } from "./store";
import { RouteProps } from "../components/Content";
import { NavigationItem } from "../components/Navigation";

const selectPlugins = prop("plugins");

const selectPluginNavigationItems = compose(
  map(
    ({ linkText, fragment }): NavigationItem => ({
      type: "link",
      text: linkText,
      href: fragment,
    })
  ),
  selectPlugins
);

const selectPluginRoutes = compose(
  map(
    ({ fragment, component }: AppPlugin): RouteProps => ({
      path: fragment,
      element: component,
    })
  ),
  selectPlugins
);

export { selectPluginNavigationItems, selectPluginRoutes };
