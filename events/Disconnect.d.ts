import { Base } from "../core/Base";
export declare class DisconnectListener {
    base: Base;
    constructor(base: Base);
    run(netID: number): void;
}
