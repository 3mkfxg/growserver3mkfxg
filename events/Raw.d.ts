import { Base } from "../core/Base";
export declare class RawListener {
    base: Base;
    constructor(base: Base);
    run(netID: number, _channelID: number, chunk: Buffer): void;
}
