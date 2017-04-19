const EvaluatedLine = require('./EvaluatedLine');
const Results = require('./Results');

class SlotMachine {
    /**
     * Creates a new slot machine.
     * @param {number} size - Size of the slot machine. Must be an odd number, 3 or higher.
     * @param {Symbol[]} symbols - Array of symbols to use.
     * @param {Function} [random] - A function that returns a number [0, 1).
     */
    constructor(size = 3, symbols = [], random = () => Math.random()) {
        if (size % 2 === 0 || size < 3) throw new RangeError('Slot machine size must be an odd number, 3 or higher.');
        if (!symbols.length) throw new RangeError('There must be at least one symbol.');

        /**
         * The size of the slot machine.
         * @type {number}
         */
        this.size = size;

        /**
         * The symbols used in the slot machine.
         * @type {Symbol[]}
         */
        this.symbols = symbols;

        /**
         * The function used for randomizing.
         * Returns [0, 1).
         * @returns {number}
         */
        this.random = random;
    }

    /**
     * Plays the slot machine.
     * @returns {Results}
     */
    play() {
        const chosens = [];
        const totalWeight = this.symbols.reduce((total, symbol) => total + symbol.weight, 0);

        for (let i = 0; i < Math.pow(this.size, 2); i++) {
            const rand = this.random() * totalWeight;
            let sum = 0;

            for (let j = 0; j < this.symbols.length; j++) {
                sum += this.symbols[j].weight;

                if (rand <= sum) {
                    chosens.push(this.symbols[j]);
                    break;
                }
            }
        }

        const lines = [];

        for (let i = 0; i < chosens.length / this.size; i++) {
            lines.push(chosens.slice(i * this.size, (i + 1) * this.size));
        }

        lines.push(chosens.filter((s, i) => (i + this.size + 1) % (this.size + 1) === 0));
        lines.push(chosens.slice(this.size - 1).filter((s, i) => i % (this.size - 1) === 0).slice(0, -1));

        return new Results(lines.map((line, i) => new EvaluatedLine(line, i === lines.length - 1 || i === lines.length - 2)));
    }

    /**
     * Gets the chance out of 1 for a symbol to appear.
     * @param {string} name - Name of the symbol.
     * @returns {number}
     */
    chanceOf(name) {
        const matchedSymbol = this.symbols.find(symbol => symbol.name === name);
        const totalWeight = this.symbols.reduce((total, symbol) => total + symbol.weight, 0);

        return matchedSymbol.weight / totalWeight;
    }
}

module.exports = SlotMachine;
