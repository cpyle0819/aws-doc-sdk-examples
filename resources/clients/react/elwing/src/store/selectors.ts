/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppPlugin, AppState } from "./store";
import { RouteProps } from "../components/Content";
import { SideNavigationProps } from "@cloudscape-design/components";

const selectPluginNavigationItems = (state: AppState) =>
  state.plugins.map(
    ({ linkText, fragment }: AppPlugin): SideNavigationProps.Item => ({
      type: "link",
      text: linkText,
      href: fragment,
    })
  );

const selectPluginRoutes = (state: AppState) =>
  state.plugins.map(
    ({ fragment, component }: AppPlugin): RouteProps => ({
      path: fragment,
      element: component,
    })
  );

export { selectPluginNavigationItems, selectPluginRoutes };
