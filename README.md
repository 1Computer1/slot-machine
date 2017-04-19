# About

A slot machine that's not accurate to real life at all.  

# Example

```js
const { SlotMachine, SlotSymbol } = require('../src/index');

const cherry = new SlotSymbol('cherry', {
    display: '🍒',
    points: 10,
    weight: 100
});

const money = new SlotSymbol('money', {
    display: '💰',
    points: 100,
    weight: 50
});

const wild = new SlotSymbol('wild', {
    display: '❔',
    points: 10,
    weight: 50,
    wildcard: true
});

const machine = new SlotMachine(3, [cherry, money, wild]);
const results = machine.play();

console.log(results.visualize());
```

# Docs

### `SlotSymbol(name[, options])`

- `name` A unique name for the symbol.
- `options.display` A character to use for displaying.
- `options.points` Amount of points the symbol gives.
- `options.weight` Chance of symbol appearing relative to others.
- `options.wildcard` Whether or not the symbol is a wildcard.

Creates a new SlotSymbol instance:  

- `name` The symbol's name.
- `display` The character for display.
- `points` Amount of points the symbol gives.
- `weight` Chance of symbol appearing.
- `wildcard` Whether or not the symbol is a wildcard.

### `SlotMachine(size, symbols[, random])`

- `size` Size of grid, must be odd number above 3.
- `symbols` Array of SlotSymbols to use.
- `random` Function returning number [0, 1).

Creates a new SlotMachine instance:  

- `size` Size of grid.
- `symbols` Symbols to be used.
- `random` Function returning number [0, 1).

##### `<SlotMachine>.play()`

Plays the slot machine and returns the results.  
`=> Results`  

##### `<SlotMachine>.chanceOf(name)`

- `name` Name of a SlotSymbol.

Gets the chance of a symbol appearing.  
`=> number`

### `<Results>`

The results of a slot machine play:

- `lines` The lines generated from the play, where the last two are the major and minor diagonals.
- `totalPoints` Total amount of points from won lines.
- `winCount` Amount of lines that have been won.

##### `<Results>.visualize([includeDiagonals])`

- `includeDiagonals` Whether or not to include diagonals in the visualization.

Creates a formatted string from the results.  
`=> string`  

### `<EvaluatedLine>`

The lines from a slot machine play:

- `symbols` The symbols in the line.
- `diagonal` Whether or not the line is a diagonal.
- `isWon` Whether or not the line is won.
- `points` The amount of points this line would give.
