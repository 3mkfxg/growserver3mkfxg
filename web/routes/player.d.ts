import { type Base } from "../../core/Base";
export declare class PlayerRoute {
    base: Base;
    app: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/player">;
    constructor(base: Base);
    execute(): Promise<import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/player">>;
}
