"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/', user_1.getUsers);
router.get('/:id', user_1.getUser);
router.get('/', user_1.postUser);
router.get('/:id', user_1.putUser);
router.get('/:id', user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map