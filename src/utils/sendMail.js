export const findUniqueElements = (arr1 = [], arr2) => {
  const combined = arr1.concat(arr2);
  const unique = combined.filter(function (value, index, array) {
    return array.indexOf(value) === array.lastIndexOf(value);
  });

  return unique;
};
