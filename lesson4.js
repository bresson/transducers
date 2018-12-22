const doubleTheNumber = number => number * 2;

[1,2,3,4].map( doubleTheNumber );

// compose doubleTheNumber
const doubleTwice = number => doubleTheNumber( doubleTheNumber( number ) );
[1,2,3,4].map( doubleTwice );

console.log( [1,2,3,4].map( doubleTwice )
// === [4, 8, 12, 16] arrays only equal if stored in same memory location; loop and compare 
)

// use with filter
const evenOnly = number => number % 2 === 0;

// won't work!!! filter takes predicate, doubleTheNumber takes transform
const doubleAndEven = number => doubleTheNumber(evenOnly(number));
// proof the above didnt work .... mixing transform and predicates doesnt work like this
// use .filter().map() but not efficient ...
// instructor is not clear that filter and map will not work 
// if both are passed to 
// the filter() instead of chained
console.log( [1,2,3].filter(doubleAndEven) );



const map = ( xf, array ) => {
    return array.reduce( (acc, val) => {
        acc.push( xf( val ) );
        return acc
    }, [])
}

console.log( map( doubleTheNumber, [1, 2, 3, 4] ) )

const filter = ( pred, arr ) => {
    return arr.reduce( (acc, val ) => {
        if (pred( val ) ) acc.push( val )
        return acc;
    }, [])
}

console.log( filter( evenOnly, [1, 2, 3, 4] ) )

/**
 * custom map and filter work as expected but cannot compose them ....
 */