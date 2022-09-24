import { LazyExoticComponent } from "react";

export interface AppPlugin {
  linkText: string;
  fragment: string;
  component: LazyExoticComponent<() => JSX.Element>;
}
