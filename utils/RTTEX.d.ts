import { RTPack, RTTXTR } from "../types";
export declare class RTTEX {
    image: Buffer;
    type: string | undefined;
    constructor(image: Buffer);
    private static getLowestPowerOf2;
    parseRTPACK(): RTPack;
    parseRTTXTR(): RTTXTR;
    static hash(buf: Buffer): Promise<number>;
    static decode(rttexImg: Buffer): Promise<Buffer>;
    static encode(img: Buffer): Promise<Buffer>;
}
