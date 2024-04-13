# gymath

Math helper for gym meatheads.

## Example

```ts
import { calculatePlates } from 'gymath';

// how many plates to put on each side of the barbell
const plates = calculatePlates(275); 

console.log(plates); // { 45: 2, 25: 1 }

// custom barbell weight
const platesUsing35lbsBar = calculatePlates(135, { barWeight: 35 }); 
console.log(platesUsing35lbsBar ); // { 45: 1, 5: 1 }
````
