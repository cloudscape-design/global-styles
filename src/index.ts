// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export enum Mode {
  Light = 'light',
  Dark = 'dark',
}

export enum Density {
  Comfortable = 'comfortable',
  Compact = 'compact',
}

function hasValue<T extends Record<string, string>>(allValues: T, mode: T[keyof T]) {
  return Object.keys(allValues).some(key => allValues[key] === mode);
}

function toggleClass(target: Element, className: string, enabled: boolean) {
  // NB: classList.toggle does not support second argument in IE
  if (enabled) {
    target.classList.add(className);
  } else {
    target.classList.remove(className);
  }
}

export function applyMode(mode: Mode | null, target: Element = document.body): void {
  if (mode && !hasValue(Mode, mode)) {
    console.warn(`Mode "${mode}" is not supported`);
    return;
  }
  toggleClass(target, 'awsui-dark-mode', mode === Mode.Dark);
}

export function applyDensity(density: Density | null, target: Element = document.body): void {
  if (density && !hasValue(Density, density)) {
    console.warn(`Density "${density}" is not supported`);
    return;
  }
  toggleClass(target, 'awsui-compact-mode', density === Density.Compact);
}

export function disableMotion(disabled: boolean, target: Element = document.body): void {
  toggleClass(target, 'awsui-motion-disabled', disabled);
}
