import { TankPacket } from "growtopia.js";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
import { World } from "../../core/World";
export declare class AppCheckResponsePack {
    base: Base;
    peer: Peer;
    tank: TankPacket;
    world: World;
    constructor(base: Base, peer: Peer, tank: TankPacket, world: World);
    execute(): Promise<void>;
}
