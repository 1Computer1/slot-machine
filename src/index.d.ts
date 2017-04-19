declare module 'slot-machine' {
    export class SlotSymbol {
        constructor(name: string, options: {
            display?: string;
            points?: number;
            weight?: number;
            wildcard?: boolean;
        });

        name: string;
        display: string;
        points: number;
        weight: number;
        wildcard: boolean;
    }

    export class SlotMachine {
        constructor(size: number, symbols: SlotSymbol[], random?: () => number);
        size: number;
        symbols: SlotSymbol[];
        random(): number;
        play(): Results;
        chanceOf(name: string): number;
    }

    export class Results {
        constructor(lines: EvaluatedLine[]);
        lines: EvaluatedLine[];
        totalPoints: number;
        winCount: number;
        visualize(includeDiagonals?: boolean): string;
    }

    export class EvaluatedLine {
        constructor(symbols: SlotSymbol[], diagonal?: boolean);
        symbols: SlotSymbol[];
        diagonal: boolean;
        isWon: boolean;
        points: number;
    }
}
