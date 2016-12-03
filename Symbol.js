/**
 * Creates a Symbol for use in the slot machine.
 */
class Symbol {
	/**
	 * @param name - A unique name for the Symbol.
	 * @param symbol - The character(s) representing the Symbol. Purely decorational.
	 * @param points - How many points this Symbol gives.
	 * @param weight - The chance of this Symbol appearing.
	 * @param wild - Whether or not this Symbol is a wildcard that can match with any other Symbol.
	 */
	constructor(name, symbol, points = 1, weight = 1, wild = false){
		this.name = name;
		this.symbol = symbol;
		this.points = parseFloat(points);
		this.weight = parseFloat(weight);
		this.wild = wild;
	}

	toString(){
		return '[object Symbol]';
	}
}

module.exports = Symbol;