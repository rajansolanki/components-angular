import pose from 'popmotion-pose';

import {
  OptionComponentAnimationsDirective,
  POSE_CONFIG,
  POSE_STATES,
} from './option.animations';

let comp: OptionComponentAnimationsDirective;

jest.mock('popmotion-pose', () =>
  jest.fn().mockReturnValue({ set: jest.fn() })
);

beforeEach(jest.clearAllMocks);
afterEach(expect.hasAssertions);

describe('`OptionComponentAnimationsDirective`', () => {
  beforeEach(setupTest);

  describe('`constructor`', () => {
    it('should call `pose` with `el` `nativeElement` and `POSE_CONFIG` args', () => {
      expect(pose).toHaveBeenCalledWith('nativeElement', POSE_CONFIG);
    });

    it('should set `poseEl` as `pose` return', () => {
      expect((comp as any).poseEl).toEqual({ set: expect.any(Function) });
    });
  });

  describe('`ngAfterViewInit`', () => {
    beforeEach(() => comp.ngAfterViewInit());

    it('should call `poseEl` `set` with `POSE_STATES` `Enter` arg', () => {
      expect((comp as any).poseEl.set).toHaveBeenCalledWith(POSE_STATES.Enter);
    });
  });

  describe('`ngOnDestroy`', () => {
    it('should call `poseEl` `set` with `POSE_STATES` `LEAVE` arg', () => {
      (comp as any).poseEl = {
        set: jest.fn(),
        destroy: jest.fn(),
      };
      comp.ngOnDestroy();

      expect((comp as any).poseEl.set).toHaveBeenCalledWith(POSE_STATES.Leave);
    });

    describe('`set` resolves', () => {
      beforeEach(
        () =>
          ((comp as any).poseEl = {
            set: jest.fn().mockResolvedValue('setReturn'),
            destroy: jest.fn(),
          })
      );

      it('should call `postEl` `destroy`', async () => {
        await expect(comp.ngOnDestroy()).resolves.toBe(undefined);

        expect((comp as any).poseEl.destroy).toHaveBeenCalled();
      });
    });

    describe('`set` rejects', () => {
      beforeEach(
        () =>
          ((comp as any).poseEl = {
            set: jest.fn().mockRejectedValue('setReturn'),
            destroy: jest.fn(),
          })
      );

      it('should call `postEl` `destroy`', async () => {
        await expect(comp.ngOnDestroy()).rejects.toBe('setReturn');

        expect((comp as any).poseEl.destroy).toHaveBeenCalled();
      });
    });
  });
});

function setupTest(): void {
  comp = new OptionComponentAnimationsDirective({
    nativeElement: 'nativeElement',
  } as any);
}
