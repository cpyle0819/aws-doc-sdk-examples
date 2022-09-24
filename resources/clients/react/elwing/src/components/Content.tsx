/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Container } from "@cloudscape-design/components";
import { LazyExoticComponent } from "react";
import { Suspense } from "react";
import { Routes, Route, PathRouteProps } from "react-router-dom";

export interface RouteProps {
  path: PathRouteProps["path"];
  element: LazyExoticComponent<() => JSX.Element>;
}

export interface ContentProps {
  routes: RouteProps[];
}

export const Content = ({ routes }: ContentProps) => (
  <Container>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.element />}
          ></Route>
        ))}
      </Routes>
    </Suspense>
  </Container>
);
