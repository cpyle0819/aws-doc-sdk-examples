/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import create from "zustand";
import plugins from "../plugins/manifest";
import { RootPluginComponent } from "../root-plugin";
import type { AppPlugin } from "../plugins/plugin.d";
export type { AppPlugin } from "../plugins/plugin.d";

export interface AppState {
  plugins: AppPlugin[];
}

export const useStore = create<AppState>(() => ({
  plugins: [RootPluginComponent, ...plugins],
}));
