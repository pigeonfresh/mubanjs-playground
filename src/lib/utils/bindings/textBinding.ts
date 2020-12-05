import { unref, watchEffect } from '@vue/runtime-core';
import type { BindingValue } from './bindingDefinitions';

export default function (target: HTMLElement, value: BindingValue<string>) {
  return watchEffect(() => (target.textContent = unref(value)));
}
