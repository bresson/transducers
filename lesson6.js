// composition with compose combinator

// CompositionEvent(f, g) === f(g(x))

// pushReducer is a combinator
// A combinator is a function which creates a new function with some relationships between the functions you passed in.
// this combinator is bluebird or B combinator
compose( isNot2Filter, isEvenFilter, doubleMap )( pushReducer ) === isNot2Filter(isEvenFilter(doubleMap(pushReducer)));

const compose = ( ...functions ) => 
    functions.reduce( ( acc, fn ) => 
        ( ...args ) => acc( fn( ...args ), x => x ));