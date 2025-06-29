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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web = Web;
const hono_1 = require("hono");
const logger_1 = require("hono/logger");
const serve_static_1 = require("@hono/node-server/serve-static");
const node_server_1 = require("@hono/node-server");
const https_1 = require("https");
const consola_1 = __importDefault(require("consola"));
const api_1 = require("../web/routes/api");
const player_1 = require("../web/routes/player");
const growtopia_1 = require("../web/routes/growtopia");
const promises_1 = require("fs/promises");
__dirname = process.cwd();
async function Web(base) {
    const app = new hono_1.Hono();
    const buns = process.versions.bun ? await Promise.resolve().then(() => __importStar(require("hono/bun"))) : undefined;
    app.use((0, logger_1.logger)((str, ...rest) => consola_1.default.log(str, ...rest)));
    app.use("/*", process.env.RUNTIME_ENV === "bun" && process.versions.bun
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            buns?.serveStatic({ root: base.config.webFrontend.root })
        : (0, serve_static_1.serveStatic)({
            root: base.config.webFrontend.root
        }));
    app.route("/", await new api_1.ApiRoute(base).execute());
    app.route("/", await new player_1.PlayerRoute(base).execute());
    app.route("/", await new growtopia_1.GrowtopiaRoute(base).execute());
    const key = await getFile(base.config.web.tls.key);
    const cert = await getFile(base.config.web.tls.cert);
    const keyPem = await getFile(base.config.webFrontend.tls.key);
    const certPem = await getFile(base.config.webFrontend.tls.cert);
    if (process.env.RUNTIME_ENV === "node") {
        (0, node_server_1.serve)({
            fetch: app.fetch,
            port: base.config.web.port,
            createServer: https_1.createServer,
            serverOptions: {
                key,
                cert
            }
        }, () => {
            consola_1.default.log(`⛅Running HTTPS server on https://localhost`);
        });
        (0, node_server_1.serve)({
            fetch: app.fetch,
            port: base.config.webFrontend.port,
            createServer: https_1.createServer,
            serverOptions: {
                key: keyPem,
                cert: certPem
            }
        }, () => {
            consola_1.default.log(`⛅Running Login server on https://${base.config.web.loginUrl}`);
        });
    }
    else if (process.env.RUNTIME_ENV === "bun") {
        consola_1.default.log(`⛅Running Bun HTTP server on http://localhost`);
        Bun.serve({
            fetch: app.fetch,
            port: base.config.web.port,
            tls: {
                key,
                cert
            }
        });
        consola_1.default.log(`⛅Running Bun HTTPS server on https://localhost`);
        Bun.serve({
            fetch: app.fetch,
            port: base.config.webFrontend.port,
            tls: {
                key: keyPem,
                cert: certPem
            }
        });
        consola_1.default.log(`⛅Running Bun Login server on https://${base.config.web.loginUrl}`);
    }
}
async function getFile(path, encoding) {
    try {
        const file = await (0, promises_1.readFile)(path, encoding);
        return file;
    }
    catch (e) {
        consola_1.default.error(`${path} are not found`, e);
        return undefined;
    }
}
