import user from "../models/man.js";
import jwt from "jsonwebtoken";
export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      msg: "You must be logged in",
    });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_KEY);
    req.user = await user.findById(_id).select("_id");
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, statusCode: 401, msg: "Request not authorized" });
  }
};
