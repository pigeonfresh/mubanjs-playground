import { bind, defineComponent, html, propType } from '../../../../../src';
import classNames from 'classnames';

import './cf-a2-button.scss';
import { defaultDisabled, defaultIconAlignment, defaultTarget } from './CfA2Button.config';
import type { CfA2ButtonTypes } from './CfA2Button.types';
import { noop } from 'lodash';
import { CfA3Icon, cfA3Icon } from '../cf-a3-icon/CfA3Icon';

export const CfA2Button = defineComponent({
  name: 'cf-a2-button',
  components: [CfA3Icon],
  props: {
    onClick: propType.func.shape<(event: MouseEvent) => void>().optional,
  },
  setup({ props: { onClick = noop }, refs }) {
    return [
      bind(refs.self, {
        click: onClick,
      }),
    ];
  },
});

export const cfA2Button = (
  {
    label,
    title,
    href,
    disabled = defaultDisabled,
    ariaLabel,
    ariaControls,
    target = defaultTarget,
    icon,
    iconAlignment = defaultIconAlignment,
    className,
  }: CfA2ButtonTypes,
  ref?: string,
) => {
  const tag = href ? 'a' : 'button';

  return html`<${tag}
    data-component=${CfA2Button.displayName}
    data-ref=${ref}
    ...${{
      disabled,
      href,
      title: title ?? label,
      target: href ? target : null,
      rel: href ? 'noopener' : null,
      class: classNames({ [`icon-alignment-${iconAlignment}`]: icon !== '' }, className),
      'aria-label': ariaLabel,
      'aria-controls': ariaControls,
    }}
  >
    ${label && html`<span class="button-label">${label}</span>`}
    ${icon && cfA3Icon({ name: icon, className: 'button-icon' }, 'icon')}
  <//>`;
};
