"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTTEX = void 0;
const zlib_1 = require("zlib");
const framebuffer_1 = __importDefault(require("imagescript/v2/framebuffer"));
const ExtendBuffer_1 = require("./ExtendBuffer");
class RTTEX {
    image;
    type;
    constructor(image) {
        if (!Buffer.isBuffer(image))
            throw new Error("Please use buffer instead.");
        if (image.subarray(0, 6).toString() === "RTPACK" ||
            image.subarray(0, 6).toString() === "RTTXTR") {
            // ignore
        }
        else
            throw new Error("File header must be a RTPACK or RTTXTR");
        this.image = image;
        this.type = image.subarray(0, 6).toString() || undefined;
    }
    static getLowestPowerOf2(value) {
        return 1 << Math.ceil(Math.log2(value));
    }
    parseRTPACK() {
        if (this.type !== "RTPACK")
            throw new TypeError("Invalid type of RTPACK");
        const data = {
            type: this.image.subarray(0, 6).toString(),
            version: this.image.readUint8(6),
            reserved: this.image.readUint8(7),
            compressedSize: this.image.readUInt32LE(8),
            decompressedSize: this.image.readUInt32LE(12),
            compressionType: this.image.readUint8(16),
            reserved2: new Int8Array(16)
        };
        for (let i = 17; i <= 31; i++) {
            data.reserved2[i - 17] = this.image.readUint8(i);
        }
        return data;
    }
    parseRTTXTR() {
        let img = this.image;
        if (this.type === "RTPACK") {
            img = (0, zlib_1.inflateSync)(this.image.subarray(32));
        }
        if (img.subarray(0, 6).toString() !== "RTTXTR")
            throw new TypeError("Invalid type of RTTXTR");
        const data = {
            type: img.subarray(0, 6).toString(),
            version: img.readUint8(6),
            reserved: img.readUint8(7),
            width: img.readInt32LE(8),
            height: img.readInt32LE(12),
            format: img.readInt32LE(16),
            originalWidth: img.readInt32LE(20),
            originalHeight: img.readInt32LE(24),
            isAlpha: img.readUint8(28),
            isCompressed: img.readUint8(29),
            reservedFlags: img.readUint16LE(30),
            mipmap: {
                width: img.readInt32LE(100),
                height: img.readInt32LE(104),
                bufferLength: img.readInt32LE(108),
                count: img.readInt32LE(32)
            },
            reserved2: new Int32Array(16)
        };
        let pos = 36;
        for (let i = 0; i < 16; i++) {
            data.reserved2[i] = img.readInt32LE(pos);
            pos += 4;
        }
        return data;
    }
    static async hash(buf) {
        let hash = 0x55555555;
        buf.forEach((x) => (hash = (hash >>> 27) + (hash << 5) + x));
        return hash >>> 0;
    }
    static async decode(rttexImg) {
        let data = rttexImg;
        if (!Buffer.isBuffer(data))
            throw new Error("Please use buffer instead.");
        if (data.subarray(0, 6).toString() === "RTPACK")
            data = (0, zlib_1.inflateSync)(rttexImg.subarray(32));
        if (data.subarray(0, 6).toString() === "RTTXTR") {
            return Buffer.from(new framebuffer_1.default(data.readUInt16LE(12), data.readUInt16LE(8), data.subarray(124))
                .flip("vertical")
                .encode("png"));
        }
        else
            throw new Error("Invalid format type.");
    }
    static async encode(img) {
        if (!Buffer.isBuffer(img))
            throw new Error("Please use buffer instead.");
        if (img.subarray(0, 6).toString() === "RTPACK" ||
            img.subarray(0, 6).toString() === "RTTXTR")
            throw new TypeError("Invalid format, must be a PNG");
        const data = framebuffer_1.default.decode("png", img).flip("vertical");
        const rttex = new ExtendBuffer_1.ExtendBuffer(124);
        rttex.data.write("RTTXTR");
        rttex.mempos += 6;
        rttex.writeU8(0); // version
        rttex.writeU8(0); // reserved
        rttex.writeI32(RTTEX.getLowestPowerOf2(data.height)); // height
        rttex.writeI32(RTTEX.getLowestPowerOf2(data.width)); // width
        rttex.writeI32(5121); // format
        rttex.writeI32(data.height); // originialHeight
        rttex.writeI32(data.width); // originialWidth
        rttex.writeU8(1); // isAlpha?
        rttex.writeU8(0); // isCompressed?
        rttex.writeU16(1); // reservedFlags
        rttex.writeI32(1); // mipmapCount
        // reserved (17)
        for (let i = 0; i < 16; i++) {
            rttex.writeI32(0);
        }
        rttex.writeI32(data.height); // mipmapHeight
        rttex.writeI32(data.width); // mipmapWidth
        rttex.writeI32(data.u8.length); // bufferLength
        const compressed = (0, zlib_1.deflateSync)(Buffer.concat([rttex.data, data.u8]));
        const rtpack = new ExtendBuffer_1.ExtendBuffer(32);
        rtpack.data.write("RTPACK");
        rtpack.mempos += 6;
        rtpack.writeU8(1); // version
        rtpack.writeU8(1); // reserved
        rtpack.writeU32(compressed.length); // compressedSize
        rtpack.writeU32(124 + data.u8.length); // decompressedSize
        rtpack.writeU8(1); // compressionType
        // reserved (16)
        for (let i = 0; i < 15; i++) {
            rtpack.writeU8(0);
        }
        return Buffer.concat([rtpack.data, compressed]);
    }
}
exports.RTTEX = RTTEX;
