const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const _ = require("lodash");

const prisma = new PrismaClient();

const isAuthenticated = async (req, res, next) => {
    token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({
            message: "No token provided!",
            code: 401,
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });

        req.user = _.omit(user, ["password"]);
        next();
    } catch (e) {
        return res.status(401).json({
            message: "Invalid Token",
            code: 401,
        });
    }
};

const isAdmin = async (req, res, next) => {
    if (!req.user.is_admin) {
        return res.status(403).json({
            message: "Accress Denied",
            code: 403,
        });
    }
    next();
};

module.exports = {
    isAuthenticated,
    isAdmin,
};
