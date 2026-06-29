// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { test, expect, beforeEach, afterEach } from 'vitest';
import { applyTheme, Theme } from '../index';

let originalClassName: string;

beforeEach(() => {
  originalClassName = document.body.className;
});

afterEach(() => {
  document.body.className = originalClassName;
});

test('applies one-theme correctly', () => {
  applyTheme(Theme.OneTheme);
  expect(document.body).toHaveClass('awsui-one-theme');
  applyTheme(Theme.Default);
  expect(document.body).not.toHaveClass('awsui-one-theme');
});

test('applies visual-refresh correctly', () => {
  applyTheme(Theme.VisualRefresh);
  expect(document.body).toHaveClass('awsui-visual-refresh');
  applyTheme(Theme.Default);
  expect(document.body).not.toHaveClass('awsui-visual-refresh');
});

test('themes are mutually exclusive', () => {
  applyTheme(Theme.VisualRefresh);
  expect(document.body).toHaveClass('awsui-visual-refresh');
  expect(document.body).not.toHaveClass('awsui-one-theme');

  applyTheme(Theme.OneTheme);
  expect(document.body).toHaveClass('awsui-one-theme');
  expect(document.body).not.toHaveClass('awsui-visual-refresh');
});

test('removes the theme class when null is passed', () => {
  applyTheme(Theme.OneTheme);
  expect(document.body).toHaveClass('awsui-one-theme');
  applyTheme(null);
  expect(document.body).not.toHaveClass('awsui-one-theme');
});

test('does not apply a non-existing theme', () => {
  // @ts-expect-error: This is for testing
  applyTheme('non-existing');
  expect(document.body).not.toHaveClass('awsui-one-theme');
});

test('does not interfere with mode/density classes', () => {
  document.body.classList.add('awsui-dark-mode', 'awsui-compact-mode');
  applyTheme(Theme.OneTheme);
  expect(document.body).toHaveClass('awsui-dark-mode', 'awsui-compact-mode', 'awsui-one-theme');
  applyTheme(Theme.Default);
  expect(document.body).toHaveClass('awsui-dark-mode', 'awsui-compact-mode');
  expect(document.body).not.toHaveClass('awsui-one-theme');
});
