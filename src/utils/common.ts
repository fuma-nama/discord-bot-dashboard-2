export function findLast<T>(array: T[], filter: (item: T) => boolean): T | null {
  for (let index = array.length - 1; index >= 0; index--) {
    if (filter(array[index])) {
      return array[index];
    }
  }

  return null;
}
