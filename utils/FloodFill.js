"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floodfill = void 0;
const growtopia_js_1 = require("growtopia.js");
const Constants_1 = require("../Constants");
const directions = [
    { x: 0, y: -1 }, // N
    { x: -1, y: 0 }, // W
    { x: 0, y: 1 }, // S
    { x: 1, y: 0 }, //E
    { x: -1, y: -1 }, //NW
    { x: -1, y: 1 }, //SW
    { x: 1, y: -1 }, // NE
    { x: 1, y: 1 } // SE
];
class Floodfill {
    data;
    totalNodes = [];
    count = 0;
    constructor(data) {
        this.data = data;
    }
    async exec() {
        if (this.data.s_block.lock)
            return;
        const nodes = [];
        nodes.push(this.data.s_node);
        while (this.totalNodes.length < this.data.max) {
            const tempNodes = [];
            for (const node of nodes) {
                const neighbours = this.neighbours(node);
                for (const neighbour of neighbours) {
                    const block = this.data.blocks[neighbour.x + neighbour.y * this.data.width];
                    const meta = this.data.base.items.metadata.items[block.fg || block.bg];
                    if (this.totalNodes.find((n) => n.x === neighbour.x && n.y === neighbour.y) ||
                        block.lock ||
                        block.worldLock ||
                        Constants_1.TileIgnore.blockIDsToIgnoreByLock.includes(meta.id || 0) ||
                        (this.data.noEmptyAir &&
                            (!meta.id ||
                                Constants_1.TileIgnore.blockActionTypesToIgnore.includes(meta.type || 0))))
                        continue;
                    tempNodes.push(neighbour);
                    this.totalNodes.push(neighbour);
                    if (this.totalNodes.length >= this.data.max - 1)
                        break;
                }
            }
            if (nodes.length < 1)
                break;
            nodes.shift();
            for (const node of tempNodes)
                nodes.push(node);
        }
    }
    neighbours(node) {
        const nodes = [];
        for (let i = 0; i < directions.length; i++) {
            const x = node.x + directions[i].x;
            const y = node.y + directions[i].y;
            if (x < 0 || x >= this.data.width || y < 0 || y >= this.data.height)
                continue;
            const block = this.data.blocks[x + y * this.data.width];
            if (block.lock)
                continue;
            if (i >= directions.length / 2) {
                // corners
                if (this.data.noEmptyAir && !this.isConnectedToFaces({ x, y }))
                    continue;
            }
            if (block)
                nodes.push({ x, y });
        }
        return nodes;
    }
    isConnectedToFaces(node) {
        let res = false;
        for (let i = 0; i < 4; i++) {
            const x = node.x + directions[i].x;
            const y = node.y + directions[i].y;
            if (x < 0 || x >= this.data.width || y < 0 || y >= this.data.height)
                continue;
            res = !!this.totalNodes.find((i) => i.x === x && i.y === y);
            if (res)
                break;
        }
        return res;
    }
    async apply(world, owner) {
        const buffer = Buffer.alloc(this.data.max * 2);
        let pos = 0;
        this.data.s_block.lock = {
            ownerFg: this.data.s_block.fg,
            ownerUserID: typeof owner.data?.id_user === "string"
                ? parseInt(owner.data.id_user)
                : owner.data?.id_user,
            ownerName: owner.name,
            ownerX: this.data.s_block.x,
            ownerY: this.data.s_block.y,
            isOwner: true,
            ignoreEmptyAir: this.data.noEmptyAir,
            adminIDs: []
        };
        let i = 0;
        for (const node of this.totalNodes) {
            if (i >= this.data.max)
                break;
            if (node.x === this.data.s_block.x && node.y === this.data.s_block.y)
                continue;
            const b_pos = node.x + node.y * this.data.width;
            const block = world.data.blocks[b_pos];
            block.lock = {
                ownerFg: this.data.s_block.fg,
                //ownerUserID: owner.data.id,
                ownerX: this.data.s_block.x,
                ownerY: this.data.s_block.y
                //adminIDs: [],
            };
            buffer.writeUInt16LE(b_pos, pos);
            pos += 2;
            i++;
        }
        world.saveToCache();
        const tank = growtopia_js_1.TankPacket.from({
            type: Constants_1.TankTypes.SEND_LOCK,
            netID: owner.data?.id_user,
            targetNetID: this.data.max,
            info: this.data.s_block.fg,
            xPunch: this.data.s_block.x,
            yPunch: this.data.s_block.y,
            data: () => buffer
        });
        owner.every((p) => {
            if (p.data?.world === owner.data?.world && p.data?.world !== "EXIT") {
                p.send(growtopia_js_1.Variant.from({ netID: owner.data?.netID }, "OnPlayPositioned", "audio/use_lock.wav"), tank);
            }
        });
    }
}
exports.Floodfill = Floodfill;
