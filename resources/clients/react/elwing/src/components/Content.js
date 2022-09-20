import { Container } from "@cloudscape-design/components";
import { Routes, Route } from "react-router-dom";

const Content = ({ routes }) => (
  <Container>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}></Route>
      ))}
    </Routes>
  </Container>
);

export { Content };
