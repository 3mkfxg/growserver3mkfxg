"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUserSchema = exports.insertUserSchema = exports.players = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.players = (0, sqlite_core_1.sqliteTable)("players", {
    id: (0, sqlite_core_1.integer)("id").primaryKey({ autoIncrement: true }),
    name: (0, sqlite_core_1.text)("name", { length: 255 }).notNull(),
    display_name: (0, sqlite_core_1.text)("display_name", { length: 255 }).notNull(),
    password: (0, sqlite_core_1.text)("password", { length: 255 }).notNull(),
    role: (0, sqlite_core_1.text)("role", { length: 255 }).notNull(),
    gems: (0, sqlite_core_1.integer)("gems").default(0),
    level: (0, sqlite_core_1.integer)("level").default(0),
    exp: (0, sqlite_core_1.integer)("exp").default(0),
    clothing: (0, sqlite_core_1.blob)("clothing", { mode: "buffer" }),
    inventory: (0, sqlite_core_1.blob)("inventory", { mode: "buffer" }),
    last_visited_worlds: (0, sqlite_core_1.blob)("last_visited_worlds", { mode: "buffer" }),
    created_at: (0, sqlite_core_1.text)("created_at").default((0, drizzle_orm_1.sql) `(current_timestamp)`),
    updated_at: (0, sqlite_core_1.text)("updated_at").default((0, drizzle_orm_1.sql) `(current_timestamp)`)
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.players);
exports.selectUserSchema = (0, drizzle_zod_1.createSelectSchema)(exports.players);
