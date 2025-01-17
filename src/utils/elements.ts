interface Options {
  usePlaceholderAsFallback?: boolean;
}

export const getInputTextWidth = (
  input: HTMLInputElement,
  { usePlaceholderAsFallback }: Options = {},
): number => {
  const textMeasureContainer = document.createElement('span');

  document.body.appendChild(textMeasureContainer);

  Object.entries(document.defaultView?.getComputedStyle(input) || {}).forEach(
    ([key, value]) => {
      if (!key.startsWith('font') || !(key in textMeasureContainer.style)) {
        return;
      }

      textMeasureContainer.style[key] = value;
    },
  );

  textMeasureContainer.innerHTML =
    (input.type === 'number' && !Number.isNaN(input.valueAsNumber)
      ? input.valueAsNumber.toString()
      : input.value) || (usePlaceholderAsFallback ? input.placeholder : '0');

  const textWidth = textMeasureContainer.getBoundingClientRect().width + 2;

  textMeasureContainer.remove();

  return textWidth;
};
