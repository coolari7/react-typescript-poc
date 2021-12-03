function createAndReturnPortalElement(): Element {
  const body = document.getElementsByTagName("body").item(0);
  if (!body) {
    throw "<body> tag not found!";
  }
  const portalElem = document.createElement("div");
  portalElem.id = "sns-portal";
  body.appendChild(portalElem);
  return portalElem;
}

/**
 * @returns Portal containing Element
 */
export function usePortalContainer(): Element {
  return (
    document.getElementById("sns-portal") ?? createAndReturnPortalElement()
  );
}
