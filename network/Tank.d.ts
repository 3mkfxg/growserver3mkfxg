import { Peer } from "../core/Peer";
import { Base } from "../core/Base";
import { TankPacket } from "growtopia.js";
export declare class ITankPacket {
    base: Base;
    peer: Peer;
    chunk: Buffer;
    tank: TankPacket;
    constructor(base: Base, peer: Peer, chunk: Buffer);
    execute(): Promise<void>;
}
