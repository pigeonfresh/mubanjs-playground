import type { ComponentFactory } from '../Component.types';

export function mount<P extends Record<string, unknown>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentFactory<any>,
  container: HTMLElement | null,
  template?: (props: P) => string | Array<string>,
  data?: P,
): void {
  if (!container) {
    console.error(`The received container is null, so nothing can be rendered`);
    return;
  }

  if (template) {
    const templateResult = template(data || ({} as P));
    container.innerHTML = Array.isArray(templateResult) ? templateResult.join('') : templateResult;
  }

  const rootElement =
    container.dataset['data-component'] === component.displayName
      ? container
      : container.querySelector<HTMLElement>(`[data-component="${component.displayName}"]`);

  if (!rootElement) {
    console.error(
      `No element found with "data-component" set to "${component.displayName}", unable to render the component.`,
    );
    return;
  }

  component(rootElement);
}
