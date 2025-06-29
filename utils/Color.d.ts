export declare class Color {
    private colors;
    constructor(r: number, g: number, b: number, a?: number);
    toDecimal(): number;
    setRed(col: number): void;
    red(): number;
    setGreen(col: number): void;
    green(): number;
    setBlue(col: number): void;
    blue(): number;
    setAlpha(col: number): void;
    alpha(): number;
    static fromHex(hex: string): Color;
    static fromDecimal(decimal: number): Color;
}
