// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { test, expect, beforeEach, afterEach } from 'vitest';
import { setThemeClass, applyTheme, Theme } from '../index';

let originalClassName: string;

beforeEach(() => {
  originalClassName = document.body.className;
});

afterEach(() => {
  document.body.className = originalClassName;
});

test('applies one-theme correctly', () => {
  setThemeClass(Theme.OneTheme);
  expect(document.body).toHaveClass('awsui-one-theme');
  setThemeClass(Theme.Default);
  expect(document.body).not.toHaveClass('awsui-one-theme');
});

test('applies visual-refresh correctly', () => {
  setThemeClass(Theme.VisualRefresh);
  expect(document.body).toHaveClass('awsui-visual-refresh');
  setThemeClass(Theme.Default);
  expect(document.body).not.toHaveClass('awsui-visual-refresh');
});

test('themes are mutually exclusive', () => {
  setThemeClass(Theme.VisualRefresh);
  expect(document.body).toHaveClass('awsui-visual-refresh');
  expect(document.body).not.toHaveClass('awsui-one-theme');

  setThemeClass(Theme.OneTheme);
  expect(document.body).toHaveClass('awsui-one-theme');
  expect(document.body).not.toHaveClass('awsui-visual-refresh');
});

test('removes the theme class when null is passed', () => {
  setThemeClass(Theme.OneTheme);
  expect(document.body).toHaveClass('awsui-one-theme');
  setThemeClass(null);
  expect(document.body).not.toHaveClass('awsui-one-theme');
});

test('does not apply a non-existing theme', () => {
  // @ts-expect-error: This is for testing
  setThemeClass('non-existing');
  expect(document.body).not.toHaveClass('awsui-one-theme');
});

test('does not interfere with mode/density or unrelated classes', () => {
  document.body.classList.add('awsui-dark-mode', 'awsui-compact-mode', 'custom-class');
  setThemeClass(Theme.OneTheme);
  expect(document.body).toHaveClass('awsui-dark-mode', 'awsui-compact-mode', 'custom-class', 'awsui-one-theme');
  setThemeClass(Theme.Default);
  expect(document.body).toHaveClass('awsui-dark-mode', 'awsui-compact-mode', 'custom-class');
  expect(document.body).not.toHaveClass('awsui-one-theme');
});

test('deprecated applyTheme delegates to setThemeClass', () => {
  applyTheme(Theme.OneTheme);
  expect(document.body).toHaveClass('awsui-one-theme');
  applyTheme(null);
  expect(document.body).not.toHaveClass('awsui-one-theme');
});
