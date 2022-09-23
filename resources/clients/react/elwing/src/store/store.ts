/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import create from "zustand";
import { plugins } from '../../plugins';

interface AppPlugin {
  linkText: string;
  fragment: string;
  component: () => JSX.Element;
}

interface AppState {
  plugins: AppPlugin[];
}

const useStore = create<AppState>(() => ({ plugins }));

export { AppPlugin, useStore };
