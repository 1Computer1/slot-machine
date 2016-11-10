/**
 * Creates a Symbol for use in the slot machine.
 */
class Symbol {
	/**
	 * @param name - A unique name for the Symbol.
	 * @param symbol - The character(s) representing the symbol. Purely decorational.
	 * @param points - How many points this symbol gives.
	 * @param weight - The chance of this symbol appearing.
	 * @param wild - Whether or not this symbol is a wildcard that can match with any other symbol.
	 */
	constructor(name, symbol, points = 1, weight = 1, wild = false){
		this.name = name;
		this.symbol = symbol;
		this.points = parseFloat(points);
		this.weight = parseFloat(weight);
		this.wild = wild;
	}
}

module.exports = Symbol;