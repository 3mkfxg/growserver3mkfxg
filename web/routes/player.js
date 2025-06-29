"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRoute = void 0;
const hono_1 = require("hono");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = require("fs");
const path_1 = require("path");
const consola_1 = __importDefault(require("consola"));
__dirname = process.cwd();
class PlayerRoute {
    base;
    app = new hono_1.Hono().basePath("/player");
    constructor(base) {
        this.base = base;
    }
    async execute() {
        this.app.get("/growid/login/validate", (ctx) => {
            try {
                const query = ctx.req.query();
                const token = query.token;
                if (!token)
                    throw new Error("No token provided");
                return ctx.html(JSON.stringify({
                    status: "success",
                    message: "Account Validated.",
                    token,
                    url: "",
                    accountType: "growtopia"
                }));
            }
            catch (e) {
                return ctx.body(`Unauthorized: ${e}`, 401);
            }
        });
        this.app.post("/login/validate", async (ctx) => {
            try {
                const body = await ctx.req.json();
                const growId = body.data?.growId;
                const password = body.data?.password;
                if (!growId || !password)
                    throw new Error("Unauthorized");
                const user = await this.base.database.players.get(growId.toLowerCase());
                if (!user)
                    throw new Error("User not found");
                const isValid = await bcryptjs_1.default.compare(password, user.password);
                if (!isValid)
                    throw new Error("Password invalid");
                const token = jsonwebtoken_1.default.sign({ growId, password }, process.env.JWT_SECRET);
                return ctx.html(JSON.stringify({
                    status: "success",
                    message: "Account Validated.",
                    token,
                    url: "",
                    accountType: "growtopia"
                }));
            }
            catch (e) {
                return ctx.body(`Unauthorized: ${e}`, 401);
            }
        });
        this.app.post("/growid/checktoken", async (ctx) => {
            try {
                const formData = await ctx.req.formData();
                const refreshToken = formData.get("refreshToken");
                if (!refreshToken)
                    throw new Error("Unauthorized");
                jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
                return ctx.html(JSON.stringify({
                    status: "success",
                    message: "Account Validated.",
                    token: refreshToken,
                    url: "",
                    accountType: "growtopia"
                }));
            }
            catch (e) {
                consola_1.default.error("Error checking token:", e);
                return ctx.body("Unauthorized", 401);
            }
        });
        this.app.post("/signup", async (ctx) => {
            try {
                const body = await ctx.req.json();
                const growId = body.data?.growId;
                const password = body.data?.password;
                const confirmPassword = body.data?.confirmPassword;
                if (!growId || !password || !confirmPassword)
                    throw new Error("Unauthorized");
                // Check if user already exists
                const user = await this.base.database.players.get(growId.toLowerCase());
                if (user)
                    throw new Error("User already exists");
                // Check if password and confirm password match
                if (password !== confirmPassword)
                    throw new Error("Password and Confirm Password does not match");
                // Save player to database
                await this.base.database.players.set(growId, password);
                // Login user:
                const token = jsonwebtoken_1.default.sign({ growId, password }, process.env.JWT_SECRET);
                if (!token)
                    throw new Error("Unauthorized");
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                return ctx.html(JSON.stringify({
                    status: "success",
                    message: "Account Validated.",
                    token,
                    url: "",
                    accountType: "growtopia"
                }));
            }
            catch (e) {
                consola_1.default.error("Error signing up:", e);
                return ctx.body("Unauthorized", 401);
            }
        });
        this.app.post("/login/dashboard", (ctx) => {
            const html = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, ".cache", "website", "index.html"), "utf-8");
            return ctx.html(html);
        });
        return this.app;
    }
}
exports.PlayerRoute = PlayerRoute;
