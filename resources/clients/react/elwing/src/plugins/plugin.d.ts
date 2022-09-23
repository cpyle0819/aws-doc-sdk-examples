import { LazyExoticComponent } from "react";

declare interface AppPlugin {
  linkText: string;
  fragment: string;
  component: LazyExoticComponent<() => JSX.Element>;
}
