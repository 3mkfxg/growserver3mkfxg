"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peer = void 0;
const growtopia_js_1 = require("growtopia.js");
const World_1 = require("./World");
const Constants_1 = require("../Constants");
const Utils_1 = require("../utils/Utils");
class Peer extends growtopia_js_1.Peer {
    base;
    constructor(base, netID, channelID = 0) {
        super(base.server, netID, channelID);
        this.base = base;
        const data = this.base.cache.peers.get(netID);
        if (data)
            this.data = {
                channelID,
                x: data.x,
                y: data.y,
                world: data.world,
                inventory: data.inventory,
                rotatedLeft: data.rotatedLeft,
                requestedName: data.requestedName,
                tankIDName: data.tankIDName,
                netID,
                country: data.country,
                id_user: data.id_user,
                role: data.role,
                gems: data.gems,
                clothing: data.clothing,
                exp: data.exp,
                level: data.level,
                lastCheckpoint: data.lastCheckpoint,
                lastVisitedWorlds: data.lastVisitedWorlds,
                state: data.state
            };
    }
    async saveToCache() {
        this.base.cache.peers.set(this.data.netID, this.data);
        return true;
    }
    async saveToDatabase() {
        return await this.base.database.players.save(this.data);
    }
    get name() {
        switch (this.data.role) {
            default: {
                return `\`w${this.data.tankIDName}\`\``;
            }
            case Constants_1.ROLE.SUPPORTER: {
                return `\`e${this.data.tankIDName}\`\``;
            }
            case Constants_1.ROLE.DEVELOPER: {
                return `\`b@${this.data.tankIDName}\`\``;
            }
        }
    }
    get country() {
        switch (this.data.role) {
            default: {
                return this.data.country;
            }
            case Constants_1.ROLE.DEVELOPER: {
                return "rt";
            }
        }
    }
    countryState() {
        const country = (pe) => `${pe.country}|${pe.data.level >= 125 ? Constants_1.NameStyles.MAX_LEVEL : ""}`;
        this.send(growtopia_js_1.Variant.from({ netID: this.data.netID }, "OnCountryState", country(this)));
        this.every((p) => {
            if (p.data.netID !== this.data.netID && p.data.world === this.data.world && p.data.world !== "EXIT") {
                p.send(growtopia_js_1.Variant.from({ netID: this.data.netID }, "OnCountryState", country(this)));
                this.send(growtopia_js_1.Variant.from({ netID: p.data.netID }, "OnCountryState", country(p)));
            }
        });
    }
    every(callbackfn) {
        this.base.cache.peers.forEach((p, k) => {
            const pp = new Peer(this.base, p.netID);
            callbackfn(pp, k);
        });
    }
    respawn() {
        const world = this.currentWorld();
        if (!world)
            return;
        let mainDoor = world?.data.blocks.find((block) => block.fg === 6);
        if (this.data.lastCheckpoint) {
            const pos = this.data.lastCheckpoint.x +
                this.data.lastCheckpoint.y * world?.data.width;
            const block = world?.data.blocks[pos];
            const itemMeta = this.base.items.metadata.items[block?.fg || block?.bg];
            if (itemMeta && itemMeta.type === Constants_1.ActionTypes.CHECKPOINT) {
                mainDoor = this.data.lastCheckpoint; // only have x,y.
            }
            else {
                this.data.lastCheckpoint = undefined;
                this.send(growtopia_js_1.Variant.from({ netID: this.data.netID, delay: 0 }, "SetRespawnPos", 0));
                mainDoor = world?.data.blocks?.find((block) => block.fg === 6);
            }
        }
        else {
            mainDoor = world?.data.blocks.find((block) => block.fg === 6);
        }
        this.send(growtopia_js_1.Variant.from({ netID: this.data.netID }, "OnSetFreezeState", 1), growtopia_js_1.Variant.from({ netID: this.data.netID }, "OnKilled"), growtopia_js_1.Variant.from({ netID: this.data.netID, delay: 2000 }, "OnSetPos", [
            (mainDoor?.x || 0 % world.data.width) * 32,
            (mainDoor?.y || 0 % world.data.width) * 32
        ]), growtopia_js_1.Variant.from({ netID: this.data.netID, delay: 2000 }, "OnSetFreezeState", 0));
        this.sound("audio/teleport.wav", 2000);
    }
    drop(id, amount) {
        if (this.data.world === "EXIT")
            return;
        const world = this.currentWorld();
        // world.getFromCache();
        const extra = Math.random() * 6;
        const x = this.data.x + (this.data.rotatedLeft ? -25 : +25) + extra;
        const y = this.data.y +
            extra -
            Math.floor(Math.random() * (3 - -1) + -3);
        world?.drop(this, x, y, id, amount);
    }
    inventory() {
        const inventory = this.data.inventory;
        this.send(growtopia_js_1.TankPacket.from({
            type: Constants_1.TankTypes.SEND_INVENTORY_STATE,
            data: () => {
                const buffer = Buffer.alloc(7 + inventory.items.length * 4);
                buffer.writeUInt8(0x1); // type?
                buffer.writeUInt32LE(inventory.max, 1);
                buffer.writeUInt16LE(inventory.items.length, 5);
                let offset = 7;
                inventory.items.forEach((item) => {
                    buffer.writeUInt16LE(item.id, offset);
                    buffer.writeUInt16LE(item.amount, offset + 2); // use bitwise OR (1 << 8) if item is equipped. could be wrong
                    offset += 4;
                });
                return buffer;
            }
        }));
    }
    sound(file, delay = 100) {
        this.send(growtopia_js_1.TextPacket.from(Constants_1.PacketTypes.ACTION, "action|play_sfx", `file|${file}`, `delayMS|${delay}`));
    }
    currentWorld() {
        if (!this.data.world || this.data.world === "EXIT")
            return undefined;
        const world = this.base.cache.worlds.get(this.data.world);
        if (world)
            return new World_1.World(this.base, world.name);
        else
            return new World_1.World(this.base, this.data.world);
    }
    leaveWorld() {
        if (!this.data.world)
            return;
        const world = this.currentWorld();
        world?.leave(this);
    }
    async enterWorld(worldName, x, y) {
        this.data.world = worldName;
        const world = this.currentWorld();
        const mainDoor = world?.data.blocks?.find((block) => block.fg === 6);
        const xDoor = x ? x : mainDoor?.x;
        const yDoor = y ? y : mainDoor?.y;
        await world?.enter(this, xDoor, yDoor);
        this.inventory();
        this.countryState();
        this.sound("audio/door_open.wav");
        this.formPlayMods();
        this.data.lastVisitedWorlds = (0, Utils_1.manageArray)(this.data.lastVisitedWorlds, 6, worldName);
    }
    /**
     * Used to make a visual modifying inventory
     */
    modifyInventory(id, amount = 1) {
        if (amount > 200 || id <= 0 || id === 112)
            return;
        if (this.data.inventory?.items.find((i) => i.id === id)?.amount !== 0) {
            const tank = growtopia_js_1.TankPacket.from({
                packetType: 4,
                type: Constants_1.TankTypes.MODIFY_ITEM_INVENTORY,
                info: id,
                buildRange: amount < 0 ? amount * -1 : undefined,
                punchRange: amount < 0 ? undefined : amount
            }).parse();
            this.send(tank);
        }
        this.saveToCache();
        return 0;
    }
    addItemInven(id, amount = 1, drop = false) {
        const item = this.data.inventory.items.find((i) => i.id === id);
        if (!item) {
            this.data.inventory.items.push({ id, amount });
            if (!drop)
                this.modifyInventory(id, amount);
        }
        else if (item.amount < 200) {
            if (item.amount + amount > 200)
                item.amount = 200;
            else
                item.amount += amount;
            if (!drop)
                this.modifyInventory(id, amount);
        }
        // this.inventory();
        this.saveToCache();
    }
    removeItemInven(id, amount = 1) {
        if (id === 0 || id === -1 || id === 32 || id === 18) {
            return;
        }
        const item = this.data.inventory.items.find((i) => i.id === id);
        if (item) {
            item.amount -= amount;
            if (item.amount < 1) {
                this.data.inventory.items = this.data.inventory.items.filter((i) => i.id !== id);
                if (this.base.items.metadata.items[id].type === Constants_1.ActionTypes.CLOTHES) {
                    this.unequipClothes(id);
                }
            }
        }
        this.modifyInventory(id, -amount);
        // this.inventory();
        this.saveToCache();
    }
    searchItem(id) {
        return this.data.inventory?.items.find((i) => i.id === id);
    }
    sendClothes() {
        this.send(growtopia_js_1.Variant.from({
            netID: this.data.netID
        }, "OnSetClothing", [
            this.data.clothing.hair,
            this.data.clothing.shirt,
            this.data.clothing.pants
        ], [
            this.data.clothing.feet,
            this.data.clothing.face,
            this.data.clothing.hand
        ], [
            this.data.clothing.back,
            this.data.clothing.mask,
            this.data.clothing.necklace
        ], 0x8295c3ff, [this.data.clothing.ances, 0.0, 0.0]));
        this.every((p) => {
            if (p.data?.world === this.data.world &&
                p.data?.netID !== this.data.netID &&
                p.data?.world !== "EXIT") {
                p.send(growtopia_js_1.Variant.from({
                    netID: this.data.netID
                }, "OnSetClothing", [
                    this.data.clothing.hair,
                    this.data.clothing.shirt,
                    this.data.clothing.pants
                ], [
                    this.data.clothing.feet,
                    this.data.clothing.face,
                    this.data.clothing.hand
                ], [
                    this.data.clothing.back,
                    this.data.clothing.mask,
                    this.data.clothing.necklace
                ], 0x8295c3ff, [this.data.clothing.ances, 0.0, 0.0]));
            }
        });
    }
    // Check every clothes playmods & apply it
    formPlayMods() {
        let charActive = 0;
        const modActive = 0;
        Object.keys(this.data.clothing).forEach((k) => {
            const itemInfo = this.base.items.wiki.find((i) => i.id === this.data.clothing[k]);
            const playMods = itemInfo?.playMods || [];
            for (const mod of playMods) {
                const name = mod.toLowerCase();
                if (name.includes("double jump"))
                    charActive |= Constants_1.CharacterState.DOUBLE_JUMP;
            }
        });
        this.data.state.mod = charActive;
        this.data.state.modsEffect = modActive;
        this.sendState();
    }
    equipClothes(itemID) {
        if (!this.searchItem(itemID))
            return;
        const isAnces = (item) => {
            if (item?.type === Constants_1.ActionTypes.ANCES) {
                this.data.clothing.ances = itemID;
                return true;
            }
            return false;
        };
        if (Object.values(this.data.clothing).includes(itemID))
            this.unequipClothes(itemID);
        else {
            const item = this.base.items.metadata.items[itemID];
            if (!isAnces(item)) {
                const clothKey = Constants_1.CLOTH_MAP[item?.bodyPartType];
                if (clothKey) {
                    this.data.clothing[clothKey] = itemID;
                }
            }
            const itemInfo = this.base.items.wiki.find((i) => i.id === itemID);
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!itemInfo?.func?.add) {
                this.send(growtopia_js_1.Variant.from("OnConsoleMessage", itemInfo.func.add));
            }
            this.formPlayMods();
            this.sendClothes();
            this.send(growtopia_js_1.TextPacket.from(Constants_1.PacketTypes.ACTION, "action|play_sfx", "file|audio/change_clothes.wav", "delayMS|0"));
        }
    }
    unequipClothes(itemID) {
        const item = this.base.items.metadata.items[itemID];
        let unequiped = false;
        const isAnces = (item) => {
            if (item?.type === Constants_1.ActionTypes.ANCES) {
                if (this.data.clothing.ances === itemID) {
                    this.data.clothing.ances = 0;
                    unequiped = true;
                    return true;
                }
            }
            return false;
        };
        if (!isAnces(item)) {
            const clothKey = Constants_1.CLOTH_MAP[item?.bodyPartType];
            if (clothKey) {
                this.data.clothing[clothKey] = 0;
                unequiped = true;
            }
        }
        if (unequiped) {
            this.formPlayMods();
            this.sendClothes();
            this.send(growtopia_js_1.TextPacket.from(Constants_1.PacketTypes.ACTION, "action|play_sfx", "file|audio/change_clothes.wav", "delayMS|0"));
        }
        const itemInfo = this.base.items.wiki.find((i) => i.id === itemID);
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!itemInfo?.func?.rem) {
            this.send(growtopia_js_1.Variant.from("OnConsoleMessage", itemInfo.func.rem));
        }
    }
    isValid() {
        return this.data && this.data.netID !== undefined;
    }
    sendEffect(eff, ...args) {
        this.every((p) => {
            if (p.data.world === this.data.world && p.data.world !== "EXIT") {
                p.send(growtopia_js_1.Variant.from("OnParticleEffect", eff, [this.data.x + 10, this.data.y + 16]), ...args);
            }
        });
    }
    sendState(punchID, everyPeer = true) {
        const tank = growtopia_js_1.TankPacket.from({
            type: Constants_1.TankTypes.SET_CHARACTER_STATE,
            netID: this.data.netID,
            info: this.data.state.mod,
            xPos: 1200,
            yPos: 200,
            xSpeed: 300,
            ySpeed: 600,
            xPunch: 0,
            yPunch: 0,
            state: 0
        }).parse();
        tank.writeUint8(punchID || 0x0, 5);
        tank.writeUint8(0x80, 6);
        tank.writeUint8(0x80, 7);
        tank.writeFloatLE(125.0, 20);
        // if (this.data.state.modsEffect & ModsEffects.HARVESTER) {
        //   tank.writeFloatLE(150, 36);
        //   tank.writeFloatLE(1000, 40);
        // }
        this.send(tank);
        if (everyPeer) {
            this.every((p) => {
                if (p.data.netID !== this.data.netID && p.data.world === this.data.world && p.data.world !== "EXIT") {
                    p.send(tank);
                }
            });
        }
    }
    // Xp formulas sources: https://www.growtopiagame.com/forums/forum/general/guidebook/7120124-level-125-xp-calculator-and-data-updated-calculator
    // https://growtopia.fandom.com/wiki/Leveling
    // https://growtopia.fandom.com/wiki/User_blog:LightningWizardz/GROWTOPIA_FORMULA_(Rough_Calculation_Mode)
    addXp(amount, bonus) {
        const playerLvl = this.data.level;
        const requiredXp = this.calculateRequiredLevelXp(playerLvl);
        // Max level is 125
        if (this.data.level >= 125) {
            this.data.exp = 0;
            return;
        }
        // check playmods
        // check bonuses
        this.data.exp += amount;
        if (this.data.exp >= requiredXp) {
            this.data.level++;
            this.data.exp = 0;
            this.sendEffect(46);
            this.every((p) => {
                if (p.data.world === this.data.world && p.data.world !== "EXIT") {
                    p.send(growtopia_js_1.Variant.from("OnTalkBubble", this.data.netID, `${this.name} is now level ${this.data.level}!`), growtopia_js_1.Variant.from("OnConsoleMessage", `${this.name} is now level ${this.data.level}!`));
                }
            });
        }
        this.countryState();
        this.saveToCache();
    }
    calculateRequiredLevelXp(lvl) {
        const requiredXp = 50 * ((lvl * lvl) + 2);
        return requiredXp;
    }
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
    setGems(amount, skip_animation = 0) {
        this.send(growtopia_js_1.Variant.from("OnSetBux", amount, skip_animation, 0, [(0, Utils_1.getCurrentTimeInSeconds)(), 0.00, 0.00])); // Param 2 maybe for supporter status?
    }
}
exports.Peer = Peer;
