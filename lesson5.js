const filterThatDoubles = predicate => reducer => {
  return (accumulation, value) => {
    if (predicate(value)) return map(doubleTheNumber)(accumulation, value);
    // map doesnt actually map, it just wraps a fn and returns the accumulator
    // which is then also returned by filterThatDoubles
    return accumulation;
  };
};

const doubleTheNumber = number => number * 2;

const doubleTwice = number => doubleTheNumber(doubleTheNumber(number));

const evenOnly = number => number % 2 === 0;

const filter = predicate => reducer => {
  return (accumulation, value) => {
    console.log("filter ", value);
    if (predicate(value)) return reducer(accumulation, value);
    return accumulation;
  };
};

const map = xf => reducer => {
  return (accumulation, value) => {
    console.log("map ", value);
    reducer(accumulation, xf(value));
    return accumulation;
  };
};

const pushReducer = (accumulation, value) => {
  accumulation.push(value);
  return accumulation;
};

// curries
const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(val => val !== 2);
const doubleMap = map(doubleTheNumber);

// composition left to right due to curry
// isNot2Filter -> predicate -> reducer -> (acc, val)
// isEvenFilter is the reducer arg for isNot2Filter
// isNot2Filter receives acc, val below
[1, 2, 3, 4].reduce(isNot2Filter(isEvenFilter(doubleMap(pushReducer))), []);

/**
 * reduce ->
 *  isNot2Filter -> filter(val -> val !== 2) -> (acc, val) ... []
 */
