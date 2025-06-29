"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
class Color {
    colors = new Uint8Array(4);
    constructor(r, g, b, a = 255) {
        if (r < 0 ||
            r > 255 ||
            g < 0 ||
            g > 255 ||
            b < 0 ||
            b > 255 ||
            a < 0 ||
            a > 255) {
            throw new Error("Invalid color values. Each value must be between 0 and 255.");
        }
        this.colors[0] = b;
        this.colors[1] = g;
        this.colors[2] = r;
        this.colors[3] = a;
    }
    toDecimal() {
        let result = 0;
        for (let index = 0; index < this.colors.length; index++) {
            result = (result << 8) + this.colors[index];
        }
        return result >>> 0;
    }
    setRed(col) {
        this.colors[2] = col;
    }
    red() {
        return this.colors[2];
    }
    setGreen(col) {
        this.colors[1] = col;
    }
    green() {
        return this.colors[1];
    }
    setBlue(col) {
        this.colors[0] = col;
    }
    blue() {
        return this.colors[0];
    }
    setAlpha(col) {
        this.colors[3] = col;
    }
    alpha() {
        return this.colors[3];
    }
    static fromHex(hex) {
        if (!/^#?[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(hex)) {
            throw new Error("Invalid hex color string.");
        }
        hex = hex.replace(/^#/, "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) : 255;
        return new Color(r, g, b, a);
    }
    static fromDecimal(decimal) {
        if (decimal < 0 || decimal > 0xffffffff) {
            throw new Error("Invalid decimal color value. It must be between 0 and 4294967295.");
        }
        const a = (decimal >> 24) & 0xff;
        const r = (decimal >> 16) & 0xff;
        const g = (decimal >> 8) & 0xff;
        const b = decimal & 0xff;
        return new Color(r, g, b, a);
    }
}
exports.Color = Color;
