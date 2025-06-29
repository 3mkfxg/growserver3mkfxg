import { PeerData } from "../types";
import { Peer as OldPeer, Variant } from "growtopia.js";
import { Base } from "./Base";
import { World } from "./World";
export declare class Peer extends OldPeer<PeerData> {
    base: Base;
    constructor(base: Base, netID: number, channelID?: number);
    saveToCache(): Promise<boolean>;
    saveToDatabase(): Promise<boolean>;
    get name(): string;
    get country(): string;
    countryState(): void;
    every(callbackfn: (peer: Peer, netID: number) => void): void;
    respawn(): void;
    drop(id: number, amount: number): void;
    inventory(): void;
    sound(file: string, delay?: number): void;
    currentWorld(): World | undefined;
    leaveWorld(): void;
    enterWorld(worldName: string, x?: number, y?: number): Promise<void>;
    /**
     * Used to make a visual modifying inventory
     */
    modifyInventory(id: number, amount?: number): 0 | undefined;
    addItemInven(id: number, amount?: number, drop?: boolean): void;
    removeItemInven(id: number, amount?: number): void;
    searchItem(id: number): import("../types").InventoryItems | undefined;
    sendClothes(): void;
    formPlayMods(): void;
    equipClothes(itemID: number): void;
    unequipClothes(itemID: number): void;
    isValid(): boolean;
    sendEffect(eff: number, ...args: Variant[]): void;
    sendState(punchID?: number, everyPeer?: boolean): void;
    addXp(amount: number, bonus: boolean): void;
    calculateRequiredLevelXp(lvl: number): number;
    /**
     * Updates the current peer's gem (bux) amount and update the timestamp chat.
     *
     * This method sends a Variant packet to the client to update the displayed gem count,
     * control animation, and optionally indicate supporter status (maybe). It also updates the
     * timestamp used for console chat.
     *
     * @param amount - The new gem (bux) amount to set for the player.
     * @param skip_animation - Whether to skip the gem animation (0 = show animation, 1 = skip animation). Default is 0.
     *
     * ### OnSetBux Packet Structure:
     * - Param 1: `number` — The gem (bux) amount.
     * - Param 2: `number` — Animation flag.
     * - Param 3: `number` — Supporter status.
     * - Param 4: `number[]` — Additional data array:
     *   - `[0]`: `number` (float) — Current timestamp in seconds (used for console chat).
     *   - `[1]`: `number` (float) — Reserved, typically 0.00.
     *   - `[2]`: `number` (float) — Reserved, typically 0.00.
     *
     * @example
     * // Set gems to 1000, show animation
     * peer.setGems(1000);
     *
     * // Set gems to 500 and skip animation
     * peer.setGems(500, 1);
     */
    setGems(amount: number, skip_animation?: number): void;
}
