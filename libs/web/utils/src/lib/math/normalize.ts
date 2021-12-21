/**
 * To change the values of numeric columns in the dataset to a common scale,
 * without distorting differences in the ranges of values.
 *
 * The loudest samples measure as 1
 * @param data : list of number to normalize
 * @returns: list of normalized data
 */
export function normalize(data: number[], max?: number) {
  const samples = max ? [...data, max] : data;
  const multiplier = Math.pow(Math.max(...samples), -1);
  return data.map((n) => n * multiplier);
}
