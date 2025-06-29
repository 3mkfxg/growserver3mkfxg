"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrowtopiaRoute = void 0;
const hono_1 = require("hono");
const fs_1 = require("fs");
const path_1 = require("path");
const serve_static_1 = require("@hono/node-server/serve-static");
__dirname = process.cwd();
class GrowtopiaRoute {
    base;
    app = new hono_1.Hono().basePath("/growtopia");
    conf = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, "config.json"), "utf-8"));
    constructor(base) {
        this.base = base;
    }
    async execute() {
        const buns = process.env.RUNTIME_ENV === "bun" && process.versions.bun
            ? await Promise.resolve().then(() => __importStar(require("hono/bun")))
            : undefined;
        this.app.get("/hello", (ctx) => {
            return ctx.json({ message: "Hello, world!" });
        });
        this.app.all("/server_data.php", (ctx) => {
            let str = "";
            str += `server|${this.conf.web.address}\n`;
            const randPort = this.conf.web.ports[Math.floor(Math.random() * this.conf.web.ports.length)];
            str += `port|${randPort}\nloginurl|${this.conf.web.loginUrl}\ntype|1\ntype2|1\n${this.conf.web.maintenance.enable ? "maint" : "#maint"}|${this.conf.web.maintenance.message}\nmeta|ignoremeta\nRTENDMARKERBS1001`;
            return ctx.body(str);
        });
        const rootPath = "./.cache";
        const staticMiddleware = process.env.RUNTIME_ENV === "bun" && process.versions.bun
            ? buns?.serveStatic({ root: rootPath })
            : (0, serve_static_1.serveStatic)({
                root: rootPath
            });
        this.app.use("/cache/*", staticMiddleware);
        return this.app;
    }
}
exports.GrowtopiaRoute = GrowtopiaRoute;
