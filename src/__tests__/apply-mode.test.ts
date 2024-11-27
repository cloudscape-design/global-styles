// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { test, expect, beforeEach, afterEach } from 'vitest';
import { applyMode, Mode, applyDensity, Density } from '../index';

let originalClassName: string;

beforeEach(() => {
  originalClassName = document.body.className;
});

afterEach(() => {
  document.body.className = originalClassName;
});

test('applies dark mode correctly', () => {
  applyMode(Mode.Dark);
  expect(document.body).toHaveClass('awsui-dark-mode');
  applyMode(Mode.Light);
  expect(document.body).not.toHaveClass('awsui-dark-mode');
});

test('does not apply a non-existing mode', () => {
  // @ts-expect-error: This is for testing
  applyMode('non-existing');
  expect(document.body).not.toHaveClass('awsui-non-existing-mode');
  expect(document.body).not.toHaveClass('awsui-dark-mode');
  expect(document.body).not.toHaveClass('awsui-compact-mode');
});

test('removes modes of the specified type if null is passed', () => {
  applyMode(Mode.Dark);
  applyDensity(Density.Compact);
  expect(document.body).toHaveClass('awsui-dark-mode', 'awsui-compact-mode');
  applyMode(null);
  expect(document.body).not.toHaveClass('awsui-dark-mode');
  expect(document.body).toHaveClass('awsui-compact-mode');
  applyDensity(null);
  expect(document.body).not.toHaveClass('awsui-compact-mode');
});

test('persists existing classes when applying a mode', () => {
  document.body.className = 'xx-small device-mobile compact light';
  applyMode(Mode.Dark);
  expect(document.body).toHaveClass('xx-small device-mobile compact light');
  applyMode(Mode.Light);
  expect(document.body).toHaveClass('xx-small device-mobile compact light');
  applyDensity(Density.Compact);
  expect(document.body).toHaveClass('xx-small device-mobile compact light');
  applyDensity(Density.Comfortable);
  expect(document.body).toHaveClass('xx-small device-mobile compact light');
});

test('applies compact mode correctly', () => {
  applyDensity(Density.Compact);
  expect(document.body).toHaveClass('awsui-compact-mode');
  applyDensity(Density.Comfortable);
  expect(document.body).not.toHaveClass('awsui-compact-mode');
});

test('persists color mode when applying a density mode', () => {
  applyMode(Mode.Dark);
  expect(document.body).toHaveClass('awsui-dark-mode');
  applyDensity(Density.Compact);
  expect(document.body).toHaveClass('awsui-dark-mode', 'awsui-compact-mode');
});

test('persists density mode when applying a color mode', () => {
  applyDensity(Density.Compact);
  expect(document.body).toHaveClass('awsui-compact-mode');
  applyMode(Mode.Light);
  expect(document.body).toHaveClass('awsui-compact-mode');
});
