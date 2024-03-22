
export const objectWithCustomKeys = (objectsList, keyMapper) => {
    const updatedObjectList = objectsList?.map(object => {
        return Object.keys(object).reduce(
          (acc, key) => ({
            ...acc,
            ...{ [keyMapper[key] || key]: object[key] },
          }),
          {}
        );
      });
    return updatedObjectList;
}