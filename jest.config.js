// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export default {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'src/__tests__/tsconfig.json',
    },
  },
  testRegex: '/__tests__/.*(\\.|/)test\\.ts$',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
};
