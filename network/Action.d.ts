import { Peer } from "../core/Peer";
import { Base } from "../core/Base";
export declare class IActionPacket {
    base: Base;
    peer: Peer;
    chunk: Buffer;
    obj: Record<string, string>;
    constructor(base: Base, peer: Peer, chunk: Buffer);
    execute(): Promise<void>;
}
