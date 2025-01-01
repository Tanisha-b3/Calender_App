const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const SECRET_KEY = "d7e769751d81814a84c22fef53f8f5d5b65cc26eade0921c65e1aec688d9701067590069a2dabaa4fc8795b64338e9bf21453d860944dbbb4a2dbd570f0418b7c2e6e10aafb647432e1e15ac493d9438e797845e51b35253dbf0598c15956d530fab0a89de6688b3dbe9bc11202fadec80664d36b3eec31eabc7b1e9700ec340e966c3e563e5831a5fafd45ba23d984cfdbd6b381680e3ed8349abd2e1b64c3fcf2d3026b6275ca6e92d90be267cdc133e87c286077f4fb0e6d566a6f9be1f7e66679738e8e3e5081944de3eca684447f26c8089719c679f245bdb897e5dcfb6cef9b909c4fef291fef0ab17771fff3e677e2b7bca3b96f8154738e1b5461c85";  // Ensure you keep this secret safe

// Mock database
let users = [
  { email: "test@example.com", password: "$2a$10$D7b0ftCUaVhbAIt7qAHLguhIVuUI9JQ1fB69xDs5ngzzyzTTihfBa" }, // Password: password
];

// Sign-Up Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add user to the "database"
  users.push({ email, password: hashedPassword });

  // Generate JWT Token
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
});

// Sign-In Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare password with hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT Token
  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
