/**
 * Compares if every item of first array is present in second one.
 * @param array1 First array whose each item must be present in second one
 * @param array2 The parent array
 * @returns boolean
 */
export function compareTwoArrays(array1: string[], array2: string[]): boolean {
  return array1.every((item) =>
    array2.some((array2Item) => array2Item.toLowerCase() === item.toLowerCase())
  );
}
