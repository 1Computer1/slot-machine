### Usage
```js
const slotMachine = require('slot-machine');
const Symbol = slotMachine.Symbol;

let cherry = new Symbol('cherry', '🍒', 1, 10);
let money = new Symbol('money', '💰', 10, 5);
let wildcard = new Symbol('wildcard', '❔', 5, 1, true);

let results = slotMachine.play([cherry, money, wildcard], 3);

console.log(results[0].win); // false
console.log(results[1].symbols); // [money, money, cherry]
console.log(results[2].points); // 7
console.log(results[3].diagonal); // true

console.log(slotMachine.format(results));
// 🍒 🍒 💰
// 💰 💰 🍒
// ❔ 🍒 🍒 Win!
// 🍒 💰 🍒 Diagonal
// ❔ 💰 💰 Diagonal Win!
```
### Documentation
##### Symbol(name, symbol[, points = 1, weight = 1, wild = false])
`name` A unique name.  
`symbol` A symbol for display.  
`points` How many points this Symbol gives.  
`weight` Chance of this Symbol appearing.  
`wild` Whether or not the Symbol can match with any other Symbol. 
*Creates a Symbol.*

##### play(symbols[, size = 3]) 
`symbols` An array of Symbols.  
`size` Grid size, will round to nearest odd number above 3.  
*Returns an array of rows in the slot game, plus two representing diagonals.*

##### calculate(lines)
`lines` An array of arrays containing Symbols.  
*Returns an array, containing the points and results of the lines inputted.*

##### format(lines[, includeDiagonals = true])
`lines` An array of arrays containing Symbols, or calculated lines.  
`includeDiagonals` Whether or not to include diagonals. Only works with calculated lines.  
*Returns a formatted slot machine game.*