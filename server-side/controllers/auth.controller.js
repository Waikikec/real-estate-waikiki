import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const age = 1000 * 60 * 60 * 24 * 1;

    // Encrypt User Token
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      },
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age, // session expires after 1 day
        secure: false, // in production mode should be true
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful!" });
};