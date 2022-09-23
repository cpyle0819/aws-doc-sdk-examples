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

## Add a plugin

A plugin is just JS Object containing the following properties:

- `linkText` - The text of the link which will display in the sidebar navigation
- `fragment` - The url fragment to be used for routing, this needs to be unique from other plugins
- `component` - The component that will display when the link in the sidebar is clicked

### Example

```javascript
const ExamplePlugin = {
  linkText: "Plugin Example",
  fragment: "/my_plugin",
  component: () => <h1>Hello, Example!</h1>,
};

export { ExamplePlugin };
```
### Declare the plugin
The created plugin can then be declared in the store. Order is important.
The links in the sidebar will display in the same order as the list of plugins
in the store.

```javascript
const useStore = create(() => ({
  plugins: [RootPlugin, ExamplePlugin],
}));
```
