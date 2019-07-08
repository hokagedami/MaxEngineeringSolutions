/**
 * This is the entry point to the program.
 *
 * @param {number} noOfWashes The number of times the laundry machine can clean a dirty sock
 * @param {number[]} cleanPile The array of clean socks
 * @param {number[]} dirtyPile The array of dirty socks to wash
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  // Your solution should go here.
  let maxPairsArray = [];

  if (noOfWashes > 0) {
    const combination_r = noOfWashes > dirtyPile.length ? dirtyPile.length : noOfWashes;
    const washedVariations = k_combinations(dirtyPile, combination_r);

    washedVariations.forEach((variation) => {
      const newCleanPile = [...cleanPile].concat(variation);
      maxPairsArray.push(getMax(newCleanPile));
    });
    return Math.max(...maxPairsArray);
  }
  else {
    return getMax(cleanPile);
  }
}

function getMax(cleanPile) {
  const availableColors = Array.from(new Set(cleanPile));

  const availableColorsCount = {};

  availableColors.forEach(color => availableColorsCount[color] = 0);
  cleanPile.forEach(sock => {
    let count = availableColorsCount[sock];
    count++;
    availableColorsCount[sock] = count;
  });
  const pairs = Object.values(availableColorsCount).map(count => Math.floor(count / 2));
  return pairs.reduce((a, b) => { return a + b}, 0);
}

const k_combinations = (set, k) => {
  if (k > set.length || k <= 0) {
    return []
  }

  if (k === set.length) {
    return [set]
  }

  if (k === 1) {
    return set.reduce((acc, cur) => [...acc, [cur]], [])
  }

  let combs = [], tail_combs = [];

  for (let i = 0; i <= set.length - k + 1; i++) {
    tail_combs = k_combinations(set.slice(i + 1), k - 1);
    for (let j = 0; j < tail_combs.length; j++) {
      combs.push([set[i], ...tail_combs[j]])
    }
  }

  return combs
};

module.exports = getMaxPairs;
