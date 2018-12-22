import { doubleTheNumber, evenOnly } from './lesson4'


/** removed dependency on array ( through param ) from lesson4
 * 'return ( acc, val ) ... ' is a curried function
 *  NOTE accumulator initial value supplied by 
 */
const map = xf => {
    return ( acc, val ) => {
        acc.push( xf( val ) );
        return acc;
    };
};

const filter = ( pred ) => {
    return (acc, val ) => {
        if ( pred( val ) ) acc.push( val )
        return acc;
}}