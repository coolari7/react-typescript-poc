export function useScrollLock() {
  return {
    lock(elem: HTMLElement = document.body) {
      elem.style.overflow = "hidden";
    },
    unlock(elem: HTMLElement = document.body) {
      elem.style.removeProperty("overflow");
    },
  };
}
