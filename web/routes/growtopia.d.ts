import { type Base } from "../../core/Base";
export declare class GrowtopiaRoute {
    base: Base;
    app: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/growtopia">;
    conf: any;
    constructor(base: Base);
    execute(): Promise<import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/growtopia">>;
}
