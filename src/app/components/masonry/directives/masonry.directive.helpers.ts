export interface Dimensions {
  width: number;
  height: number;
  remainingHeight: number;
  remainingWidth: number;
}

export const enum Constants {
  ProductsCount = 5,
  NumberColumns = 12,
  RandomHeightMin = 2,
  RandomHeightMax = 4,
  RandomHeightMid = (Constants.RandomHeightMin + Constants.RandomHeightMax) / 2,
  RandomWidthMin = 4,
  RandomWidthMax = 8,
  RandomWidthMid = (Constants.RandomWidthMin + Constants.RandomWidthMax) / 2,
}

export const initialDimensions: Dimensions = {
  width: 0,
  height: 0,
  remainingHeight: 0,
  remainingWidth: 0,
};

export const isNth = (index: number, nth: number) => index % nth === nth - 1;

export const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const createLastElementDimensions = ({
  remainingWidth: previousRemainingWidth,
  remainingHeight: previousRemainingHeight,
}: Dimensions): Dimensions => ({
  width: previousRemainingWidth || Constants.NumberColumns,
  height:
    previousRemainingHeight ||
    getRandomNumber(Constants.RandomHeightMin, Constants.RandomHeightMax),
  remainingWidth: 0,
  remainingHeight: 0,
});

export const createRemainingDimensions = ({
  remainingWidth: previousRemainingWidth,
  remainingHeight: previousRemainingHeight,
}: Dimensions): Dimensions => {
  const randomHeight =
    Constants.RandomHeightMid >= previousRemainingHeight
      ? previousRemainingHeight
      : Math.round(previousRemainingHeight / 2);

  return {
    width: previousRemainingWidth,
    height: randomHeight,
    remainingWidth:
      randomHeight < previousRemainingHeight ? previousRemainingWidth : 0,
    remainingHeight: previousRemainingHeight - randomHeight,
  };
};

export const createNewDimensions = (): Dimensions => {
  const randomWidth = getRandomNumber(
    Constants.RandomWidthMin,
    Constants.RandomWidthMax
  );

  const randomHeight = getRandomNumber(
    randomWidth > Constants.RandomWidthMid
      ? Constants.RandomHeightMid
      : Constants.RandomHeightMin,
    randomWidth < Constants.RandomWidthMid
      ? Constants.RandomHeightMid
      : Constants.RandomHeightMax
  );

  return {
    width: randomWidth,
    height: randomHeight,
    remainingWidth: Constants.NumberColumns - randomWidth,
    remainingHeight: randomHeight,
  };
};

export const createDimensions = (
  index: number,
  dimensions: Dimensions
): Dimensions => {
  if (isNth(index, Constants.ProductsCount)) {
    return createLastElementDimensions(dimensions);
  }

  if (dimensions.remainingHeight || dimensions.remainingWidth) {
    return createRemainingDimensions(dimensions);
  }

  return createNewDimensions();
};
