import { User } from "../models/User.js";
import { generateToken } from "../middleware/jwt.js";

export async function registeration(req, res) {
  try {
    const { name, customerId, email, password } = req.body;

    if (!name || !customerId || !email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    const newUser = await User.create({ name, customerId, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error!" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    // Validatation
    if (!email || !password)
      return res.status(400).json({ msg: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Invalid credentials" });

    const ok = await user.authenticate(password);
    if (!ok) return res.status(401).json({ msg: "Invalid credentials" });

    const token = generateToken({ id: user._id });

    return res
      .status(200)
      .cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
      .json({ msg: "You have been successfully logged in." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function getCurrentUser(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    res.status(200).json({
      balance: req.user.balance || 0,
      transactions: [], //empty array as per the frontend
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export const balance = async (req, res) => {
  try {
    const response = await User.findByIdAndUpdate(
      req.user._id,
      { balance: +req.body.balance },
      { new: true }
    );
    res.status(200).json({ success: true, balance: response.balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error!" });
  }
};
