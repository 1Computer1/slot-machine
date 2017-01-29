const { SlotMachine, Symbol } = require('../src/index.js');

const cherry = new Symbol('cherry', {
    display: 'C',
    points: 10,
    weight: 100
});

const lemon = new Symbol('lemon', {
    display: 'L',
    points: 10,
    weight: 100
});

const grape = new Symbol('grape', {
    display: 'G',
    points: 10,
    weight: 100
});

const melon = new Symbol('melon', {
    display: 'M',
    points: 10,
    weight: 100
});

const orange = new Symbol('orange', {
    display: 'O',
    points: 10,
    weight: 100
});

const dollar = new Symbol('dollar', {
    display: '¢',
    points: 50,
    weight: 60
});

const money = new Symbol('money', {
    display: '$',
    points: 100,
    weight: 40
});

const gem = new Symbol('gem', {
    display: '@',
    points: 1000,
    weight: 20
});

const joker = new Symbol('joker', {
    display: '*',
    points: 10,
    weight: 40,
    wildcard: true
});

const machine = new SlotMachine(3, [cherry, lemon, grape, melon, orange, dollar, money, gem, joker]);
const results = machine.play();

console.log(results.visualize(true));
console.log('\n' + results.totalPoints);
