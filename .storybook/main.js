const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/vue",
  webpackFinal: async (config, { configType }) => {
    configType: process.env.NODE_ENV,
      config.module.rules.push({
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../")
      });
    return config;
  }
};
