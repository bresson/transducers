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


/** START HERER */
// filter() decorates reducer ... see curry and use of curried reducer() in body ( inner )
const filter = (predicate) => {
  return (accumulation, value) => {
      if (predicate(value)) accumulation.push(value);
      return accumulation;
  };
};

const map = (xf) => {
  return (accumulation, value) => {
    accumulation.push(xf(value));
    return accumulation;
  };
};

// can definitely chain with the syntax above
[1,2,3,4]
    .reduce(filter(evenOnly), [])
    .reduce(map(doubleTheNumber), []);


  // this works without chaining
const filterThatDoubles = predicate =>  {

  // acc, val from reduce() ln 47
  return (accumulation, value) => { 

    // map takes transformation fn and returns fn( acc, val ) __curry__ then retunrs acc
    // this map acts against a single val ( in scope from reduce ( acc, val ) )
    if (predicate(value)) return map(doubleTheNumber)(accumulation, value); 

    // returned from map = xf => ... acc
    return accumulation;
  };
};

[1,2,3,4].reduce(filterThatDoubles(evenOnly), [])


/**
 * New and improved filter based on filterThatDoubles
 * map() is abstracted as reducer label 
 * @param {*} predicate 
 */
const filter = predicate => reducer => {
  return ( acc, val ) => {
    if ( predicate( val ) ) return reducer( acc, val );
    return accumulation
  }
}

const map = xf => reducer => {
  return ( acc, val ) => {

    // NOTE reducer( xf( val ) ) replaces acc.push( xf( val ) ) in earlier example
    // > reducer is a curried fn but it needs to be a reducer : takes acc, val and returns acc
    return reducer( acc, xf( val ));
  }
}

/**
 * curried filter above 
 * notice how map() is passed and acts as reducer( acc, val ) in new improved filter
 * filter() and map() are called for each member of the list 
 * ** caveat: map only called if predicate filter is true
 */
[1,2,3,4].reduce( filter ( evenOnly )( map ( doubleTheNumber ) ), [] ) ;


const pushReducer = (accumulation, value) => {
  accumulation.push(value);
  return accumulation;
};

// curries
const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(val => val !== 2);
const doubleMap = map(doubleTheNumber);
[1,2,3,4].reduce( ( isEvenFilter, isNot2Filter, doubleMap ), [])





// composition left to right due to curry
// isNot2Filter -> predicate -> reducer -> (acc, val)
// isEvenFilter is the reducer arg for isNot2Filter
// isNot2Filter receives acc, val below
// [1, 2, 3, 4].reduce(isNot2Filter(isEvenFilter(doubleMap(pushReducer))), []);

/**
 * reduce ->
 *  isNot2Filter -> filter(val -> val !== 2) -> (acc, val) ... []
 */

 /**
  * Summary: 
  * the point so far is to be able to compose transducers 
  * each transducer executes once per list data point unless excluded by filter
  * transducers can activate 'curry' for elegant composition
  * RECALL -> for transducers to work, reduce must return the accumulator and start with an initial val ( maybe on init val )
  */