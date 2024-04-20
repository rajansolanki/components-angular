import { getPagePosition } from './hover.directive.helpers';

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`getPagePosition`', () => {
  describe('Unknown `event`', () => {
    it('should throw error', () => {
      const res = () => getPagePosition(new Event('pointerevent') as any);

      expect(res).toThrowError('Unsupported `event`');
    });
  });

  describe('Known `event`', () => {
    it('should return `pageX` and `pageY` if `event` is `MouseEvent`', () => {
      const event = new MouseEvent('mouseevent');
      (event as any).pageX = 100;
      (event as any).pageY = 50;

      const res = getPagePosition(event);

      expect(res).toEqual({ pageX: 100, pageY: 50 });
    });

    it('should return first `targetTouches` `pageX` and `pageY` if `event` is `TouchEvent`', () => {
      const res = getPagePosition(
        new TouchEvent('touchevent', {
          targetTouches: [{ pageX: 100, pageY: 50 }],
        } as TouchEventInit)
      );

      expect(res).toEqual({ pageX: 100, pageY: 50 });
    });
  });
});
