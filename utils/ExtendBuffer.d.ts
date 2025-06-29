import { StringOptions } from "growtopia.js";
export declare class ExtendBuffer {
    data: Buffer;
    mempos: number;
    constructor(alloc: number);
    readU8(): number;
    readU16(): number;
    readU32(): number;
    writeU8(value: number): number;
    writeU16(value: number): number;
    writeU32(value: number): number;
    readI8(): number;
    readI16(): number;
    readI32(): number;
    writeI8(value: number): number;
    writeI16(value: number): number;
    writeI32(value: number): number;
    readString(opts?: StringOptions): Promise<string>;
    writeString(str: string, id?: number, encoded?: boolean): Promise<undefined>;
}
