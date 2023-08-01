module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          '@shared': './src/shared',
          '@features': './src/features',
          libgen: './libgen',
          externalStorage: './externalStorage',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    'react-native-reanimated/plugin',
  ],
};
