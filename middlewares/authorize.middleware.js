const authorizeMiddleware = (permittedRoles) => {
    return (req, res, next) => {
        let role = req.body.role;
        if (!permittedRoles.includes(role)) {
            return res.status(401).send({ message: "Unauthorized! Only Admin Can Add, Delete And Update Book" });
        }
        next();
    };
};


// export module---->
module.exports={
    authorizeMiddleware
}