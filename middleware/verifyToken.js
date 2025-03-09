const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: false, message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ status: false, message: "You are not authenticated" });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  //"Client", "Admin", "Vendor", "Driver"
  verifyToken(req, res, () => {
    if (
      req.user.userType === "Client" ||
      req.user.userType === "Admin" ||
      req.user.userType === "Vendor" ||
      req.user.userType === "Driver"
    ) {
      return next();
    } else {
      return res.status(403).json({
        status: false,
        message: "You are not allowed access the routes",
      });
    }
  });
};

const verifyTokenVendor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin" || req.user.userType === "Vendor") {
      return next();
    } else {
      return res.status(403).json({
        status: false,
        message: "You are not allowed access the routes",
      });
    }
  });
};
const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Admin") {
      return next();
    } else {
      return res.status(403).json({
        status: false,
        message: "You are not allowed access the routes",
      });
    }
  });
};
const verifyTokenDriver = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userType === "Driver") {
      return next();
    } else {
      return res.status(403).json({
        status: false,
        message: "You are not allowed access the routes",
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenVendor,
  verifyTokenAdmin,
  verifyTokenDriver,
};
