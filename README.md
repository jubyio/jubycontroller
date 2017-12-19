# JUBYCONTROLLER

Installation :

- Install React Native (https://facebook.github.io/react-native/docs/getting-started.html)
- Install React Native CLI (`npm install react-native-cli`)
- Install package (`npm install`)
- Link in the native dependency (`react-native link`)

# Deployement

iOS: `react-native run-ios`

Android: `react-native run-android`

# Warning

### Limitation with VS Code

You can't debug the application with `react-native tools` in `vs code`.

Because we use `react-native-tcp` [package](https://github.com/PeelTechnologies/react-native-tcp) and the extension `react-native tools` use `process browserify` but `rect-native tools` use `process nodejs` and this make a error when launch the debugger