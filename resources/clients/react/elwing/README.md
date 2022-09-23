# Elwing 🕊️

Elwing is a bootstrapped companion app to the Cloudscape design system. It's opinionated
layout accelerates development time by exposing a simple plugin API allowing a developer
to focus on defining pages and content rather than app structure.

## Prerequisites

1. Install NodeJS 18

## Run

1. Run `yarn` from the same directory as this readme.
1. Run `yarn start`.
1. Navigate to the URL logged in the console.

### What is a plugin?

A plugin is just JS Object containing the following properties:

- `linkText` - The text of the link which will display in the sidebar navigation
- `fragment` - The url fragment to be used for routing, this needs to be unique from other plugins
- `component` - The component that will display when the link in the sidebar is clicked

## Add a plugin
> ⚠️**WARNING:** The automated steps will overwrite the `manifest.ts` file with the latest
> plugins from the `plugins` directory. 

### Automated steps
A convenience script has been added to support the quick creation of a plugin.

1. `yarn create-plugin <plugin-name>`
2. Find your plugin in the `plugins` directory.
3. Make it your own!


### Manual steps
If you want to create a plugin manually instead of using the script, you can do so.

1. Create a new folder in the plugins directory, e.g. `my-plugin`
2. Add an `index.ts` file to the folder and populate it using the below as an example.
  ```javascript
    const ExamplePlugin = {
      linkText: "My Plugin",
      fragment: "/my_plugin",
      component: lazy(() => import("./MyPluginComponent"),
    };

    export { ExamplePlugin };
  ```
3. Add a `MyPlugin.tsx` file to the folder and populate it with component code.
  ```javascript
  const component = () => <h1>Hello, my-component!</h1>;
  export default component;
  ```
4. Open `plugins/manifest.ts` and add your plugin to the `plugins` array.
  ```javascript
  import { RootPlugin } from "./root-plugin";
  import { MyPlugin } from "./my-plugin";
  const plugins = [RootPlugin, MyPlugin];
  export default plugins;
  ```