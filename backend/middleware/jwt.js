import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export async function authenticate(req, res, next) {
  try {
    const token = req.cookies?.jwt;

    console.log({ token });
    if (!token) return res.status(401).json({ msg: "No token found!" });

    const decoded = verifyToken(token);
    console.log({ decoded });

    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ msg: "User not found!" });

    req.user = user;
    next();
  } catch (err) {
    console.log("JWT Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}
