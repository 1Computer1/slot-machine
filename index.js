let Symbol = require('./symbol.js');

module.exports.Symbol = Symbol;

/**
 * Play the slot machine!
 * @param symbols - An array of Symbol objects.
 * @param size - The grid size. Will only use odd integers over three.
 * @return An array of rows in the generated slot game, plus two more representing the diagonals. Contains the points and the results of the lines.
 */
module.exports.play = (symbols, size) => {
	if (!size || size < 3){
		size = 3;
	}

	if (size % 2 === 0){
		size += 1;
	}

	let chosens = [];

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
	lines.forEach((symbols, i) => {
		let win = false;

		let remainder = symbols.filter((s) => !s.wild).filter((s) => s.name !== symbols[0].name);

		if (remainder.length === 0){
			win = true;
		}
		
		lines[i] = {symbols, win, points: symbols.reduce((a, b) => a + b.points, 0)};
		lines[i].diagonal = false;

		if (i === lines.length - 1 || i === lines.length - 2){
			lines[i].diagonal = true;	
		}
	});

	lines.calculated = true;
	return lines;
}

/**
 * Formats lines for easier viewing.
 * @param lines - An array of arrays containing Symbols, or an array of rows containing points and results.
 * @return A formatted slot machine game.
 */
module.exports.format = (lines, includeDiagonals = true) => {
	if (lines.calculated){
		if (!includeDiagonals){
			lines = lines.filter((l) => !l.diagonal);
		}

		return lines.map((l) => l.symbols.map((s) => s.symbol).join(' ') + ' ' + (l.diagonal ? 'Diagonal ' : '') + (l.win ? 'Win!' : '')).join('\n');
	}

	return lines.map((l) => l.map((s) => s.symbol).join(' ')).join('\n');
}