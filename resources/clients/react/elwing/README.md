# Elwing 🕊️
Elwing is a bootstrapped companion app to the Cloudscape design system. It's opinionated
layout accelerates development time by exposing a simple plugin API allowing a developer
to focus on defining pages and content rather than app structure.

## Run
1. Run `yarn` from the same directory as this readme.
1. Run `yarn start`.
1. Navigate to the URL logged in the console.

## Add a plugin
A plugin is just JS Object containing the following properties:
 - linkText
 - fragment
 - component
 