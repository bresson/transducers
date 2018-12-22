
/** generic reducer for adding */
const reducer = (acc, val) => {
    return acc + val;
}

reducer(10, 5) === 15;
reducer('hello', ' you') === 'hello you';

/** 
 * reducer() passed a HOF to Array reduce
 * NOTE: reducer accepts 2 params implicitly passed by Array.reduce():
 *  reducer( acc, val )
 * " *** Array.reduce() feeds values in the array into the reducer
 *      const res = reducer('hello', ' you')
 *      reducer( res, ' again' ) === 'hello you again'
 * "
 * Think of reduce() as a function/feeder that passes accumulator and value to the HoF/
 */
[1,2,3,4,5].reduce( reducer, 0 ) === 15


/** works like object merge ... */
const objReducer = (acc, obj) => {
    return {
        ...acc,
        ...obj,
    }
}

const user = {
    name: 'Paul',
    email: 'paul@test.test',
}

objReducer(user, {nickname: 'Pauly D'}) === { name: 'Paul', email: 'paul@test.test', nickname: 'Pauly D'}


const setReducer = (acc, value) => {
    return acc.add(value);
};

const mySet = new Set([1,2,3,4]);

console.log( setReducer(mySet, 5) )

// console.log( setReducer(mySet, 5) === { 1, 2, 3, 4, 5 })

/** can do this ... good for smaller data sets */
const genSet = [1, 2, 3, 4, 5, 5, 6].reduce( (acc, elem) => acc.add(elem), new Set() )
console.log(genSet)