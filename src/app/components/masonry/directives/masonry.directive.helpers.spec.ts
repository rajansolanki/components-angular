import {
  Constants,
  createDimensions,
  createLastElementDimensions,
  createNewDimensions,
  createRemainingDimensions,
  Dimensions,
  getRandomNumber,
  isNth,
} from './masonry.directive.helpers';

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`isNth`', () => {
  it('should return `true` if `index` arg is every `nth` arg', () => {
    const res = [isNth(9, 10), isNth(19, 10), isNth(29, 10)];

    expect(res).toEqual([true, true, true]);
  });

  it('should return `false` if `index` arg is not every `nth` arg', () => {
    const res = [isNth(10, 10), isNth(0, 10), isNth(1, 10)];

    expect(res).toEqual([false, false, false]);
  });
});

describe('`getRandomNumber`', () => {
  it('should return random inclusive whole number between `min` and `max`', () => {
    const res = getRandomNumber(1, 2);

    expect(res).toBeGreaterThanOrEqual(1);
    expect(res).toBeLessThanOrEqual(2);
  });
});

describe('`createLastElementDimensions`', () => {
  beforeEach(
    () =>
      ((getRandomNumber as unknown) = jest
        .fn()
        .mockReturnValue('getRandomNumberReturn'))
  );

  describe('`height`', () => {
    describe('Has `previousRemainingHeight`', () => {
      it('should not call `getRandomNumber`', () => {
        createLastElementDimensions({
          remainingWidth: 0,
          remainingHeight: 50,
        } as Dimensions);

        expect(getRandomNumber).not.toHaveBeenCalled();
      });

      it('should return `height` as `previousRemainingHeight` and no `remainingHeight`', () => {
        const res = createLastElementDimensions({
          remainingWidth: 0,
          remainingHeight: 50,
        } as Dimensions);

        expect(res).toEqual(
          expect.objectContaining({
            height: 50,
            remainingHeight: 0,
          })
        );
      });
    });

    describe('No `previousRemainingHeight`', () => {
      it('should call `getRandomNumber` with `Constants` `RandomHeightMin` and `RandomHeightMax` args', () => {
        createLastElementDimensions({
          remainingWidth: 0,
          remainingHeight: 0,
        } as Dimensions);

        expect(getRandomNumber).toHaveBeenCalledWith(
          Constants.RandomHeightMin,
          Constants.RandomHeightMax
        );
      });

      it('should return `height` as `getRandomNumber` return and no `remainingHeight`', () => {
        const res = createLastElementDimensions({
          remainingWidth: 0,
          remainingHeight: 0,
        } as Dimensions);

        expect(res).toEqual(
          expect.objectContaining({
            height: 'getRandomNumberReturn',
            remainingHeight: 0,
          })
        );
      });
    });
  });

  describe('`width`', () => {
    describe('Has `previousRemainingWidth`', () => {
      it('should return  `width` as `remainingWidth` and no `remainingHeight`', () => {
        const res = createLastElementDimensions({
          remainingWidth: 100,
          remainingHeight: 0,
        } as Dimensions);

        expect(res).toEqual(
          expect.objectContaining({
            width: 100,
            remainingWidth: 0,
          })
        );
      });
    });

    describe('No `previousRemainingWidth`', () => {
      it('should return `width` as `Constants` `NumberColumns` and no `remainingWidth`', () => {
        const res = createLastElementDimensions({
          remainingWidth: 0,
          remainingHeight: 0,
        } as Dimensions);

        expect(res).toEqual(
          expect.objectContaining({
            width: Constants.NumberColumns,
            remainingWidth: 0,
          })
        );
      });
    });
  });
});

describe('`createRemainingDimensions`', () => {
  it('should return `width` as `previousRemainingWidth`', () => {
    const res = createRemainingDimensions({
      remainingWidth: 100,
      remainingHeight: 0,
    } as Dimensions);

    expect(res).toEqual(
      expect.objectContaining({
        width: 100,
      })
    );
  });

  it(
    'should return `height` as `remainingHeight` and no `remainingWidth` and no' +
      ' `remainingHeight` if `remainingHeight` is below `Constants` `RandomHeightMid`',
    () => {
      const res = createRemainingDimensions({
        remainingWidth: 100,
        remainingHeight: Constants.RandomHeightMid - 1,
      } as Dimensions);

      expect(res).toEqual({
        width: 100,
        height: Constants.RandomHeightMid - 1,
        remainingWidth: 0,
        remainingHeight: 0,
      });
    }
  );

  it(
    'should return `height` as `remainingHeight` and no `remainingWidth` and no' +
      ' `remainingHeight` if `remainingHeight` is equal to `Constants` `RandomHeightMid`',
    () => {
      const res = createRemainingDimensions({
        remainingWidth: 100,
        remainingHeight: Constants.RandomHeightMid,
      } as Dimensions);

      expect(res).toEqual({
        width: 100,
        height: Constants.RandomHeightMid,
        remainingWidth: 0,
        remainingHeight: 0,
      });
    }
  );

  it(
    'should return `height` and `remainingHeight` as divided even `remainingHeight` and' +
      ' same `remainingWidth` if `remainingHeight` is bigger than `Constants` `RandomHeightMid`',
    () => {
      const res = createRemainingDimensions({
        remainingWidth: 100,
        remainingHeight: Constants.RandomHeightMid + 1,
      } as Dimensions);

      expect(res).toEqual({
        width: 100,
        height: 2,
        remainingWidth: 100,
        remainingHeight: 2,
      });
    }
  );
});

describe('`createNewDimensions`', () => {
  beforeEach(() => ((getRandomNumber as unknown) = jest.fn()));

  it('should call `getRandomNumber` with `Constants` `RandomWidthMin` and `RandomWidthMax` args', () => {
    createNewDimensions();

    expect(getRandomNumber).toHaveBeenCalledWith(
      Constants.RandomWidthMin,
      Constants.RandomWidthMax
    );
  });

  it(
    'should call `getRandomNumber` with `Constants` `RandomHeightMid` and' +
      ' `RandomHeightMax` args if `randomWidth` is bigger than `Constants` `RandomWidthMid` ',
    () => {
      (getRandomNumber as jest.Mock).mockReturnValueOnce(
        Constants.RandomWidthMid + 1
      );

      createNewDimensions();

      expect(getRandomNumber).toHaveBeenCalledWith(
        Constants.RandomHeightMid,
        Constants.RandomHeightMax
      );
    }
  );

  it(
    'should call `getRandomNumber` with `Constants` `RandomHeightMin` and' +
      ' `RandomHeightMid` args if `randomWidth` is smaller than `Constants` `RandomWidthMid` ',
    () => {
      (getRandomNumber as jest.Mock).mockReturnValueOnce(
        Constants.RandomWidthMid - 1
      );

      createNewDimensions();

      expect(getRandomNumber).toHaveBeenCalledWith(
        Constants.RandomHeightMin,
        Constants.RandomHeightMid
      );
    }
  );

  it(
    'should call `getRandomNumber` with `Constants` `RandomHeightMin` and' +
      ' `RandomHeightMax` args if `randomWidth` is equal to `Constants` `RandomWidthMid` ',
    () => {
      (getRandomNumber as jest.Mock).mockReturnValueOnce(
        Constants.RandomWidthMid
      );

      createNewDimensions();

      expect(getRandomNumber).toHaveBeenCalledWith(
        Constants.RandomHeightMin,
        Constants.RandomHeightMax
      );
    }
  );

  it(
    'should return `width` as `randomWidth`, `height` as `randomHeight`,' +
      ' `remainingWidth` as `Constants` `NumberColumns` minus `randomWidth`, and `remainingHeight` as `randomHeight`',
    () => {
      (getRandomNumber as jest.Mock).mockReturnValueOnce(
        Constants.RandomWidthMid
      );
      (getRandomNumber as jest.Mock).mockReturnValueOnce(
        Constants.RandomHeightMid
      );

      const res = createNewDimensions();

      expect(res).toEqual({
        width: Constants.RandomWidthMid,
        height: Constants.RandomHeightMid,
        remainingWidth: Constants.NumberColumns - Constants.RandomWidthMid,
        remainingHeight: Constants.RandomHeightMid,
      });
    }
  );
});

describe('`createDimensions`', () => {
  beforeEach(() => {
    (isNth as unknown) = jest.fn();
    (createLastElementDimensions as unknown) = jest
      .fn()
      .mockReturnValue('createLastElementDimensionsReturn');
    (createRemainingDimensions as unknown) = jest
      .fn()
      .mockReturnValue('createRemainingDimensionsReturn');
    (createNewDimensions as unknown) = jest
      .fn()
      .mockReturnValue('createNewDimensionsReturn');
  });

  it('should call `isNth` with `index` and `Constants` `ProductsCount` args', () => {
    createDimensions(0, 'dimensions' as any);

    expect(isNth).toHaveBeenCalledWith(0, 5);
  });

  describe('`isNth` returns `true`', () => {
    beforeEach(() => (isNth as jest.Mock).mockReturnValue(true));

    it('should call `createLastElementDimensions` with `dimensions` arg', () => {
      createDimensions(0, 'dimensions' as any);

      expect(createLastElementDimensions).toHaveBeenCalledWith('dimensions');
    });

    it('should return `createLastElementDimensions`', () => {
      const res = createDimensions(0, 'dimensions' as any);

      expect(res).toBe('createLastElementDimensionsReturn');
    });
  });

  describe('`isNth` returns `false`', () => {
    beforeEach(() => (isNth as jest.Mock).mockReturnValue(false));

    describe('Has `remainingHeight` and has `remainingWidth`', () => {
      it('should call `createRemainingDimensions` with `dimensions` arg', () => {
        createDimensions(0, {
          remainingWidth: 100,
          remainingHeight: 50,
        } as Dimensions);

        expect(createRemainingDimensions).toHaveBeenCalledWith({
          remainingWidth: 100,
          remainingHeight: 50,
        });
      });

      it('should return `createRemainingDimensions`', () => {
        const res = createDimensions(0, {
          remainingWidth: 100,
          remainingHeight: 50,
        } as Dimensions);

        expect(res).toBe('createRemainingDimensionsReturn');
      });
    });

    describe('Has `remainingHeight` and no `remainingWidth`', () => {
      it('should call `createRemainingDimensions` with `dimensions` arg', () => {
        createDimensions(0, {
          remainingWidth: 0,
          remainingHeight: 50,
        } as Dimensions);

        expect(createRemainingDimensions).toHaveBeenCalledWith({
          remainingWidth: 0,
          remainingHeight: 50,
        });
      });

      it('should return `createRemainingDimensions`', () => {
        const res = createDimensions(0, {
          remainingWidth: 0,
          remainingHeight: 50,
        } as Dimensions);

        expect(res).toBe('createRemainingDimensionsReturn');
      });
    });

    describe('No `remainingHeight` and has `remainingWidth`', () => {
      it('should call `createRemainingDimensions` with `dimensions` arg', () => {
        createDimensions(0, {
          remainingWidth: 100,
          remainingHeight: 0,
        } as Dimensions);

        expect(createRemainingDimensions).toHaveBeenCalledWith({
          remainingWidth: 100,
          remainingHeight: 0,
        });
      });

      it('should return `createRemainingDimensions`', () => {
        const res = createDimensions(0, {
          remainingWidth: 100,
          remainingHeight: 0,
        } as Dimensions);

        expect(res).toBe('createRemainingDimensionsReturn');
      });
    });

    describe('No `remainingHeight` and no `remainingWidth`', () => {
      it('should call `createNewDimensions`', () => {
        createDimensions(0, {
          remainingWidth: 0,
          remainingHeight: 0,
        } as Dimensions);

        expect(createNewDimensions).toHaveBeenCalled();
      });

      it('should return `createNewDimensions`', () => {
        const res = createDimensions(0, {
          remainingWidth: 0,
          remainingHeight: 0,
        } as Dimensions);

        expect(res).toBe('createNewDimensionsReturn');
      });
    });
  });
});
