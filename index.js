let Symbol = require('./struct/Symbol.js');

module.exports.Symbol = Symbol;

/**
 * Play the slot machine!
 * @param symbols - An array of Symbol objects.
 * @param size - The grid size. Will only use odd integers over three.
 * @return An array of rows in the generated slot game, plus two more representing the diagonals. Contains the points and the results of the lines.
 */
module.exports.play = (symbols, size) => {
	// Disallow less than 3
	if (!size || size < 3) size = 3;

	// Disallow evens
	if (size % 2 === 0) size += 1;

	let chosens = [];

	// Weighted randomizer
	for (let i = 0; i < size * size; i++){
		let rand = Math.random() * symbols.reduce((a, b) => a + b.weight, 0);
		let sum = 0;

		for (let j = 0; j < symbols.length; j++){
			sum += symbols[j].weight;
			if (rand <= sum){
				chosens[i] = symbols[j];
				break;
			}
		}
	}

	let lines = [];

	for (let i = 0; i < chosens.length / size; i++){
		lines[i] = chosens.slice(i * size, (i + 1) * size);
	}

	// Push the diagonals. This took forever to get correct!
	lines.push(chosens.filter((s, i) => (i + size + 1) % (size + 1) === 0));
	lines.push(chosens.slice(size - 1).filter((s, i) => i % (size - 1) === 0).reverse().slice(1));

	return this.calculate(lines);
};

/**
 * Get the results of rows of symbols.
 * @param lines - An array of arrays containing Symbols.
 * @return An array, containing the points and results of the lines inputted.
 */
module.exports.calculate = (lines) => {
	let copy = lines;
	
	copy.forEach((symbols, i, l) => {
		let win = false;

		let remainder = symbols.filter(s => !s.wild && s.name !== symbols[0].name);

		if (remainder.length === 0) win = true;
		
		copy[i] = {symbols, win, points: win ? symbols.reduce((a, b) => a + b.points, 0) : 0};
		copy[i].diagonal = false;

		if (i >= l.length - 2) copy[i].diagonal = true;	
	});

	copy.calculated = true;
	return copy;
};

/**
 * Formats lines for easier viewing.
 * @param lines - An array of arrays containing Symbols, or an array of rows containing points and results.
 * @param includeDiagonals - Whether or not to include diagonals. Only works with calculated lines.
 * @return A formatted slot machine game.
 */
module.exports.format = (lines, includeDiagonals = true) => {
	if (!includeDiagonals) lines = lines.filter(l => !l.diagonal);
	
	if (lines.calculated){
		return lines.map(l => l.symbols.map(s => s.symbol).join(' ') + ' ' + (l.diagonal ? 'Diagonal ' : '') + (l.win ? 'Win!' : '')).join('\n');
	}

	return lines.map(l => l.map(s => s.symbol).join(' ')).join('\n');
};