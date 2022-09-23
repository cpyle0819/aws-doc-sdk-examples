import create from "zustand";
import { RootPlugin } from "./RootPlugin";

interface AppPlugin {
  linkText: string;
  fragment: string;
  component: () => JSX.Element;
}

interface AppState {
  plugins: AppPlugin[];
}

const useStore = create<AppState>(() => ({
  plugins: [RootPlugin],
}));

export { useStore };
