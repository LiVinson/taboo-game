# Taboo

This project is a work in progress. Check back soon for a link to the deployed application.

## About 📝

## Run Locally 🏃🏿‍♀️

## Tools and Technology 💻

## Testing 🧪

Use yarn run tests to run tests.

Testing tools:

Jest: Test Runnner

React Test Renderer: Renders React component to pure JS objects. Used in conjunction with Jest to create snapshot files that determine if any UI changes have been made to component. This was used instead of enzyme with enzyme-to-json because this library rendered the entire theme object when rendering styled components. This meant that any change to the theme resulted ina change to the snapshot, even when unrelated to the component.

Enzyme: Provides shallow and full DOM rendering of components and an API to make assertions on  the comopnent instance. 

Jest Styled Components: Used to help testing styled components. Allows snapshots to be rendered with the exact style information in snapshot instead of ambigious class names. Allows for better testing React components that make use of the theme prop. 

## Contributions 🤝🏾

I am not open to contributions to the code at this time, but I am always happy to hear feedback and suggestions. Feel free to reach out to me at contact@lisavinson.

## License 🔓
