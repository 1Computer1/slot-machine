/**
 * Options for a SlotSymbol.
 * @typedef {Object} SymbolOptions
 * @prop {string} [display='?'] - A decorational character that represents the symbol.
 * @prop {number} [points=1] - How many points the symbol gives.
 * @prop {number} [weight=1] - Chance of this symbol appearing, relative to all other symbol weights.
 * @prop {boolean} [wildcard=false] - Whether or not this symbol is a wildcard, matching with all other symbols.
 */

class SlotSymbol {
    /**
     * Creates a symbol for use in the slot machine.
     * @param {string} name - A unique name for the symbol.
     * @param {SymbolOptions} options - Options for the symbol.
     */
    constructor(name, options = {}) {
        /**
         * Unique name of this symbol.
         * @type {string}
         */
        this.name = name;

        /**
         * Character that represents this symbol.
         * @type {string}
         */
        this.display = options.display || '?';

        /**
         * How many points this symbol gives.
         * @type {number}
         */
        this.points = options.points || 1;

        /**
         * Chance of this symbol appearing.
         * @type {number}
         */
        this.weight = options.weight || 1;

        /**
         * Whether or not this symbol is wildcard.
         * @type {boolean}
         */
        this.wildcard = !!options.wildcard;
    }

    /**
     * Returns the display character.
     * @returns {string}
     */
    toString() {
        return this.display;
    }
}

module.exports = SlotSymbol;
