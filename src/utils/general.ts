export function placePoint(x: number, y: number) {
  const el = document.createElement("div");

  el.style.position = "absolute";
  el.style.border = "solid red 1px";
  el.style.width = "1px";
  el.style.height = "1px";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  document.body.appendChild(el);
}

export function getParsedTransform(el: HTMLElement): number[] | null {
  const computedStyles = getComputedStyle(el, null);
  const { transform: t } = computedStyles;

  if (t !== "none") {
    const tParsed = t.match(/-?\d+\.?\d*/g)?.map(Number);

    return tParsed ? tParsed : null;
  }
  return null;
}
