export function findLast<T>(array: T[], filter: (item: T) => boolean): T | null {
  for (let index = array.length - 1; index >= 0; index--) {
    if (filter(array[index])) {
      return array[index];
    }
  }

  return null;
}

export function toRGB(num: number) {
  num >>>= 0;
  let b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16;
  return 'rgb(' + [r, g, b].join(',') + ')';
}
