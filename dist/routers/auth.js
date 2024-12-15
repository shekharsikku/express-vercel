"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const schema_1 = require("../utils/schema");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post("/sign-up", (0, schema_1.validateSchema)(schema_1.signUpSchema), auth_1.signUpUser);
router.post("/sign-in", (0, schema_1.validateSchema)(schema_1.signInSchema), auth_1.signInUser);
router.delete("/sign-out", middlewares_1.authAccess, auth_1.signOutUser);
router.get("/auth-refresh", middlewares_1.authRefresh, auth_1.refreshAuth);
exports.default = router;