import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "^next-intl$": "<rootDir>/__mocks__/next-intl.ts",
  },
  modulePathIgnorePatterns: ["<rootDir>/src/tests"],
};

export default createJestConfig(config);
