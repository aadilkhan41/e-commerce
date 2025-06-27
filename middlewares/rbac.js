const authorizer = (roles) => {
    return function (req, res, next) {
        const hasAccess = roles.includes(req.user.role);
        if (hasAccess) {
            next();
        } else {
            res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }
    };
};

module.exports = authorizer;
