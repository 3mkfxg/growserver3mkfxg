"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerDB = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const Player_1 = require("../schemas/Player");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Constants_1 = require("../../Constants");
class PlayerDB {
    db;
    constructor(db) {
        this.db = db;
    }
    async get(name) {
        const res = await this.db
            .select()
            .from(Player_1.players)
            .where((0, drizzle_orm_1.eq)(Player_1.players.name, name))
            .limit(1)
            .execute();
        if (res.length)
            return res[0];
        return undefined;
    }
    async has(name) {
        const res = await this.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(Player_1.players)
            .where((0, drizzle_orm_1.eq)(Player_1.players.name, name))
            .limit(1)
            .execute();
        return res[0].count > 0;
    }
    async set(name, password) {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashPassword = await bcryptjs_1.default.hash(password, salt);
        const res = await this.db.insert(Player_1.players).values({
            display_name: name,
            name: name.toLowerCase(),
            password: hashPassword,
            role: Constants_1.ROLE.BASIC
        });
        if (res && res.lastInsertRowid)
            return res.lastInsertRowid;
        return 0;
    }
    async save(data) {
        if (!data.id_user)
            return false;
        const res = await this.db
            .update(Player_1.players)
            .set({
            role: data.role,
            inventory: Buffer.from(JSON.stringify(data.inventory)),
            clothing: Buffer.from(JSON.stringify(data.clothing)),
            gems: data.gems,
            level: data.level,
            exp: data.exp,
            last_visited_worlds: Buffer.from(JSON.stringify(data.lastVisitedWorlds)),
            updated_at: new Date().toISOString().slice(0, 19).replace("T", " ")
        })
            .where((0, drizzle_orm_1.eq)(Player_1.players.id, parseInt(data.id_user)))
            .returning({ id: Player_1.players.id });
        if (res.length)
            return true;
        else
            return false;
    }
}
exports.PlayerDB = PlayerDB;
