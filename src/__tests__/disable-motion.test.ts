// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { test, expect, beforeEach, afterEach } from 'vitest';
import { disableMotion } from '../index';

let originalClassName: string;

beforeEach(() => {
  originalClassName = document.body.className;
});

afterEach(() => {
  document.body.className = originalClassName;
});

test('enables and disables motion', () => {
  expect(document.body).not.toHaveClass('awsui-motion-disabled');
  disableMotion(true);
  expect(document.body).toHaveClass('awsui-motion-disabled');
  disableMotion(false);
  expect(document.body).not.toHaveClass('awsui-motion-disabled');
});

test('persists other classes when applying motion config', () => {
  document.body.className = 'xx-small device-mobile';
  disableMotion(true);
  expect(document.body).toHaveClass('xx-small device-mobile');
  disableMotion(false);
  expect(document.body).toHaveClass('xx-small device-mobile');
});
