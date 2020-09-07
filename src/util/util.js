
/**
 * Return random number between two values.
 * 
 * @param {Number} min - Lowest of possible values.
 * @param {Number} max - Highest of possible values.
 */
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Shuffle given array/list.
 * 
 * @param {Array} list
 */
export function shuffleList(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}
