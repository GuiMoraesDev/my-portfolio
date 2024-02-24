import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
};

export default config;
