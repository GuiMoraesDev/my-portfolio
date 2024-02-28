import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/src/tests"],
};

export default createJestConfig(config);
