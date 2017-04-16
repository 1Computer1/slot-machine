/* eslint-disable no-console */

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

console.log(results.visualize(true));
console.log(results.lines.map(l => l.isWon));
console.log(results.totalPoints, results.winCount);
console.log(results.lines[0].symbols);
console.log(results.lines[1].points);
console.log(results.lines[2].isWon);
console.log(results.lines[3].diagonal);
