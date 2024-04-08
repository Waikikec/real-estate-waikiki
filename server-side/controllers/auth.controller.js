import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create New User

  // Save to Database
  console.log("register");
};

export const login = (req, res) => {
  // db operations
  console.log("login");
};

export const logout = (req, res) => {
  // db operations
  console.log("logout");
};
