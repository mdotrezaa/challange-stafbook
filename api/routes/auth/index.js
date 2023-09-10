const app = require("../../app");
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(bodyParser.json());
const secretKey = "your-secret-key";

const users = [
  { id: 1, username: "johndoe", password: "john" },
  { id: 2, username: "user2", password: "password2" },
];

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Simulate user authentication (replace with your own logic)
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h", // Token expiration time (adjust as needed)
    });

    res.json({ token: `Bearer ${token}` }); // Include "Bearer" prefix in the token response
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});
// User endpoint
app.get("/api/user", (req, res) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const tokenValue = token.split("Bearer ")[1];

  jwt.verify(tokenValue, secretKey, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.userId;
    const user = users.find((u) => u.id === userId);
    console.log(userId);
    if (user) {
      // Return user data without the password
      const { password, ...userWithoutPassword } = user;
      console.log(userWithoutPassword);
      res.json({ user: userWithoutPassword });
    } else {
      res.status(404).json({ message: decoded });
    }
  });
});

module.exports = app;
