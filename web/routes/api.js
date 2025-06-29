"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoute = void 0;
const hono_1 = require("hono");
class ApiRoute {
    base;
    app = new hono_1.Hono().basePath("/api");
    constructor(base) {
        this.base = base;
    }
    async execute() {
        this.app.get("/hello", (ctx) => {
            return ctx.json({ message: "Hello, world!" });
        });
        return this.app;
    }
}
exports.ApiRoute = ApiRoute;
