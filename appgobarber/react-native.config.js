// External assets, link fonts, need to be added to the native code, so we are exporting these assets and linking(adding) them to te native code using the command: npx react-native link
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
