import create from "zustand";
import { RootPlugin } from "../../plugins/RootPlugin";
import { ExamplePlugin } from "../../plugins/ExamplePlugin";

const useStore = create(() => ({
  plugins: [RootPlugin, ExamplePlugin],
}));

export { useStore };
