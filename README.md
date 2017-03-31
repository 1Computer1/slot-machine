### Usage
```js
const { SlotMachine, SlotSymbol } = require('slot-machine');

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

results.visualize(true);
// 🍒 🍒 💰
// 💰 💰 🍒
// ❔ 🍒 🍒
//
// 🍒 💰 🍒
// 💰 💰 ❔

results.totalPoints; // 240
results.winCount; // 2
results.lines[0].symbols; // [cherry, cherry, money]
results.lines[1].points; // 0
results.lines[2].isWon; // true
results.lines[3].diagonal; // true
```
