const express = require("express");
const shortid = require("shortid");
const mongoose = require("mongoose");
const useragent = require("useragent");
const geoip = require("geoip-lite");
const requestIp = require("request-ip");
const UAParser = require("ua-parser-js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 5050;
dotenv.config();

const mongoURI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT;
const REFRESH_SECRET = process.env.REFRESH;

mongoose
  .connect(mongoURI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Model's
const Link = require("./model/link.model");
const User = require("./model/user.model");

// Middleware's
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestIp.mw());
app.use(require("cors")());

app.post("/signup", async (req, res) => {
  console.log("Signup Request Body:", req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  console.log("Login Request Body:", req.body);
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    return res.send("Username/email and password are required");
  }

  try {
    const user = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email }],
    });
    if (!user) {
      console.log("User not found");
      return res.send("Invalid credentials");
    }

    console.log("Found User:", user);

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", passwordMatch);

    if (!passwordMatch) {
      return res.send("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET);

    refreshTokens.push(refreshToken);

    res.json({
      message: "Login successful!",
      accessToken,
      refreshToken,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.send("Failed to login");
  }
});

// Refresh token
app.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).send(" Refresh token is invalid");
  }

  jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid refresh token");

    const newAccessToken = jwt.sign({ userId: user.userId }, JWT_SECRET, {
      expiresIn: "15m",
    });
    res.json({ accessToken: newAccessToken });
  });
});

app.post("/shorten", async (req, res) => {
  const originalUrl = req.body.url;

  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    new URL(originalUrl);
  } catch (error) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  let shortId;
  let linkExists;

  do {
    shortId = shortid.generate();
    linkExists = await Link.findOne({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    });
  } while (linkExists);

  const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;

  try {
    const newLink = new Link({
      originalUrl,
      shortUrl,
      urlHitCount: 0,
    });
    await newLink.save();

    res.json({ shortUrl });
  } catch (error) {
    console.error("Error saving to MongoDB:", error);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
});

app.get("/analytics/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const link = await Link.findOne({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    });

    if (!link) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.json({ analytics: link.analyticLogs });
  } catch (error) {
    console.error("Error fetching from MongoDB:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

app.get("/shortId", async (req, res) => {
  do {
    shortId = shortid.generate();
    linkExists = await Link.findOne({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    });
  } while (linkExists);
  res.json({ shortId: shortId });
});

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const url = `${req.protocol}://${req.get("host")}/${shortId}`;
    const link = await Link.findOne({
      shortUrl: url,
    });

    if (!link) {
      return res.status(404).json({ error: "Short URL not found", url: url });
    }

    link.accessCount++;

    const userAgent = useragent.parse(req.headers["user-agent"]);
    const ip = req.clientIp;
    const geo = geoip.lookup(ip);
    const parser = new UAParser(req.headers["user-agent"]);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();
    const engine = parser.getEngine();
    const cpu = parser.getCPU();

    link.analyticLogs.push({
      timezone: geo.timezone,
      ipAddress: ip,
      country: geo ? geo.country : "Unknown",
      referer: req.headers.referer || "Unknown",
      browser: browser.name || "Unknown",
      browserVersion: browser.version || "Unknown",
      os: os.name || userAgent.os.family || "Unknown",
      osVersion: os.version || "Unknown",
      device: device.model || "Unknown",
      deviceType: device.type || "Unknown",
      engine: engine.name || "Unknown",
      architecture: cpu.architecture || "Unknown",
    });

    await link.save();
    res.redirect(link.originalUrl);
  } catch (error) {
    console.error("Error fetching/updating from MongoDB:", error);
    res.status(500).json({ error: "Failed to redirect" });
  }
});

app.delete("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const link = await Link.findOne({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    });

    if (!link) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    if (link.deletedAt) {
      return res.status(400).json({ error: "Short URL already deleted" });
    }

    link.deletedAt = new Date();
    await link.save();

    res.json({ message: "Short URL marked for deletion" });
  } catch (error) {
    console.error("Error marking URL for deletion:", error);
    res.status(500).json({ error: "Failed to delete URL" });
  }
});

app.get("/auth_form", (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Authentication Demo</title>
      </head>
      <body>
          <h1>Sign Up</h1>
          <form method="POST" action="/signup">
              <label for="signupUsername">Username:</label><br>
              <input type="text" id="signupUsername" name="username" required><br><br>

              <label for="signupEmail">Email:</label><br>
              <input type="email" id="signupEmail" name="email" required><br><br>

              <label for="signupPassword">Password:</label><br>
              <input type="password" id="signupPassword" name="password" required><br><br>

              <button type="submit">Sign Up</button>
          </form>

          <h1>Login</h1>
          <form method="POST" action="/login">
              <label for="loginUsername">Username or Email:</label><br>
              <input type="text" id="loginUsername" name="username" required><br><br>

              <label for="loginPassword">Password:</label><br>
              <input type="password" id="loginPassword" name="password" required><br><br>

              <button type="submit">Login</button>
          </form>
      </body>
      </html>
  `);
});

app.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>URL Shortener</title>
        </head>
        <body>
            <h1>URL Shortener</h1>
            <form method="POST" action="/shorten">
                <input type="url" name="url" placeholder="Enter URL" required>
                <button type="submit">Shorten</button>
            </form>
        </body>
        </html>
    `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
