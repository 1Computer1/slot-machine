class Results {
    /**
     * The results to a slot machine play.
     * @param {EvaluatedLine[]} lines - Lines in the play.
     */
    constructor(lines) {
        /**
         * The lines in the results.
         * @type {EvaluatedLine[]}
         */
        this.lines = lines;
    }

    /**
     * Total amount of points from won lines.
     * @type {number}
     */
    get totalPoints() {
        return this.lines.reduce((total, line) => total + line.points, 0);
    }

    /**
     * Amount of won lines.
     * @type {number}
     */
    get winCount() {
        return this.lines.filter(line => line.isWon).length;
    }

    /**
     * Visualizes the results.
     * @param {boolean} [includeDiagonals=false] - Whether or not to include diagonals.
     * @returns {string}
     */
    visualize(includeDiagonals = false) {
        const lines = this.lines.filter(line => !line.diagonal);
        let visual = lines.map(line => line.symbols.map(s => s.display).join(' ')).join('\n');

        if (includeDiagonals) {
            const diagonals = this.lines.filter(line => line.diagonal);
            visual += '\n\n';
            visual += diagonals.map(line => line.symbols.map(s => s.display).join(' ')).join('\n');
        }

        return visual;
    }
}

module.exports = Results;
