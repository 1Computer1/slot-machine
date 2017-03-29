class EvaluatedLine {
    /**
     * A line with evaluated properties.
     * @param {Symbol[]} symbols - Symbols in this line.
     * @param {boolean} [diagonal=false] - Whether or not this line is a diagonal.
     */
    constructor(symbols, diagonal = false) {
        /**
         * Symbols in this line.
         * @type {Symbol[]}
         */
        this.symbols = symbols;

        /**
         * Whether or not this line is a diagonal.
         * @type {boolean}
         */
        this.diagonal = diagonal;
    }

    /**
     * Whether or not this line has been won.
     * @type {boolean}
     */
    get isWon() {
        const nonWild = this.symbols.find(s => !s.wildcard);
        if (!nonWild) return true;

        const remainder = this.symbols.filter(s => !s.wildcard && s.name !== nonWild.name);
        if (!remainder.length) return true;

        return false;
    }

    /**
     * If won, amount of points this line gives.
     * @type {number}
     */
    get points() {
        if (!this.isWon) return 0;
        return this.symbols.reduce((total, symbol) => total + symbol.points, 0);
    }
}

module.exports = EvaluatedLine;
