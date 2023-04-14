import type { StorybookConfig } from "@storybook/vue3-vite";
import { loadConfigFromFile, mergeConfig } from 'vite'
import { join, resolve } from 'path'
import { smartyServerPlugin } from '../dist/server.esm'

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        smartyServerPlugin({
          templateDir: join(process.cwd(), './src/components'),
        }),
      ],
    });
  },
  docs: {
    autodocs: "tag",
  },
};


export default config;
