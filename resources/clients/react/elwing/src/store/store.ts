/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import create from "zustand";
import plugins from "../plugins/manifest";
import { RootPluginComponent } from "../root-plugin";
import { AppPlugin } from "../plugins/plugin.d";

interface AppState {
  plugins: AppPlugin[];
}

const useStore = create<AppState>(() => ({
  plugins: [RootPluginComponent, ...plugins],
}));

export { AppPlugin, useStore };
