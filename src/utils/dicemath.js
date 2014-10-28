const factorial = exports.factorial = function factorial(n) {
  return n > 1 ? n * factorial(n - 1) : 1;
}

const binom = exports.binom = function binom(n, k) {
  return factorial(n) / (factorial(n - k) * factorial(k));
}

const expand = exports.expand = function expand(pair, sides, dice, countSub2) {
  if (dice === 0) {
    return 1;
  }
  if (dice === 1) {
    return sides;
  }
  if (sides === 1) {
    return 1;
  }
  var sum = 0, k;
  if (sides > pair) {
    k = 2;
    for (; k <= dice; k++) {
      sum += binom(dice, k) * expand(pair, sides - 1, k);
    }
  } else {
    k = 0;
    for (; k <= dice; k++) {
      if (countSub2 || dice - k >= 2 || k >= 2) {
        sum +=
          binom(dice, k) *
          expand(pair, sides - 1, k, countSub2 || dice - k > 1);
      }
    }
  }

  return sum;
}

const probability = exports.probability = function probability(highest, dice) {
  return expand(6 - highest, 6, dice) / Math.pow(6, dice);
}

exports.probabilityInvert0 = function probabilityInvert0(highest, dice) {
  var value;
  if (highest === 0) {
    value = 1 - probability(1, dice);
  } else {
    value = probability(highest, dice);
  }
  return value;
};
