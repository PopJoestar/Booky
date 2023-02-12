module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          '@shared': './src/shared',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    'react-native-reanimated/plugin',
  ],
};
