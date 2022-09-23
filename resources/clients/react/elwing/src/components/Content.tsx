/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Container } from "@cloudscape-design/components";
import { Routes, Route, PathRouteProps } from "react-router-dom";

interface RouteProps {
  path: PathRouteProps["path"];
  element: () => JSX.Element;
}

interface ContentProps {
  routes: RouteProps[];
}

const Content = ({ routes }: ContentProps) => (
  <Container>
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<route.element />}
        ></Route>
      ))}
    </Routes>
  </Container>
);

export { Content, ContentProps, RouteProps };
