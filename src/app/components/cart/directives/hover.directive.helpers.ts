export const getPagePosition = (
  event: MouseEvent | TouchEvent
): { pageX: number; pageY: number } => {
  if (event instanceof MouseEvent) {
    const { pageX, pageY } = event;

    return { pageX, pageY };
  }
  if (event instanceof TouchEvent) {
    const [{ pageX, pageY }] = event.targetTouches;

    return { pageX, pageY };
  }

  throw new Error('Unsupported `event`');
};
