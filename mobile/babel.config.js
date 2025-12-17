module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // or 'module:metro-react-native-babel-preset'
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          envName: 'APP_ENV',
          path: ".env",
          allowUndefined: true,
        },
      ],
    ],
  };
};
