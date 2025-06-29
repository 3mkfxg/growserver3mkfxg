"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendBuffer = void 0;
const Constants_1 = require("../Constants");
class ExtendBuffer {
    data;
    mempos;
    constructor(alloc) {
        this.data = Buffer.alloc(alloc);
        this.mempos = 0;
    }
    readU8() {
        const val = this.data.readUInt8(this.mempos);
        this.mempos += 1;
        return val;
    }
    readU16() {
        const val = this.data.readUInt16LE(this.mempos);
        this.mempos += 2;
        return val;
    }
    readU32() {
        const val = this.data.readUInt32LE(this.mempos);
        this.mempos += 4;
        return val;
    }
    writeU8(value) {
        const val = this.data.writeUInt8(value, this.mempos);
        this.mempos += 1;
        return val;
    }
    writeU16(value) {
        const val = this.data.writeUInt16LE(value, this.mempos);
        this.mempos += 2;
        return val;
    }
    writeU32(value) {
        const val = this.data.writeUInt32LE(value, this.mempos);
        this.mempos += 4;
        return val;
    }
    readI8() {
        const val = this.data.readInt8(this.mempos);
        this.mempos += 1;
        return val;
    }
    readI16() {
        const val = this.data.readInt16LE(this.mempos);
        this.mempos += 2;
        return val;
    }
    readI32() {
        const val = this.data.readInt32LE(this.mempos);
        this.mempos += 4;
        return val;
    }
    writeI8(value) {
        const val = this.data.writeInt8(value, this.mempos);
        this.mempos += 1;
        return val;
    }
    writeI16(value) {
        const val = this.data.writeInt16LE(value, this.mempos);
        this.mempos += 2;
        return val;
    }
    writeI32(value) {
        const val = this.data.writeInt32LE(value, this.mempos);
        this.mempos += 4;
        return val;
    }
    async readString(opts = {
        encoded: false
    }) {
        const len = this.data.readInt16LE(this.mempos);
        this.mempos += 2;
        if (!opts.encoded)
            return this.data.toString("utf-8", this.mempos, (this.mempos += len));
        else {
            const chars = [];
            for (let i = 0; i < len; i++) {
                chars.push(String.fromCharCode(this.data[this.mempos] ^
                    Constants_1.STRING_CIPHER_KEY.charCodeAt((opts.id + i) % Constants_1.STRING_CIPHER_KEY.length)));
                this.mempos++;
            }
            const str = chars.join("");
            return str;
        }
    }
    writeString(str, id, encoded = false) {
        return new Promise((resolve) => {
            // write the str length first
            this.data.writeUInt16LE(str.length, this.mempos);
            this.mempos += 2;
            if (!encoded) {
                if (str.length)
                    this.data.fill(str, this.mempos);
                this.mempos += str.length;
            }
            else {
                const chars = [];
                if (!id)
                    return;
                for (let i = 0; i < str.length; i++)
                    chars.push(str.charCodeAt(i) ^
                        Constants_1.STRING_CIPHER_KEY.charCodeAt((i + id) % Constants_1.STRING_CIPHER_KEY.length));
                for (const char of chars)
                    this.data[this.mempos++] = char;
            }
            return resolve(undefined);
        });
    }
}
exports.ExtendBuffer = ExtendBuffer;
